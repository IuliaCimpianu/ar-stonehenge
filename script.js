

AFRAME.registerComponent('info-popups', {
    schema: {
        coord: {
            type: 'array',
            default: [
                {'x': -3.24, 'y': 4, 'z': 3},
                {'x': 1, 'y': 4, 'z': 3},
                {'x':  0, 'y': 4, 'z':  0},
                {'x':  3, 'y': 4, 'z': 1}
            ]
        },
        info: {
            type: 'array',
            default: [
                {
                   'title': 'lorem ipsum title 0 \n',
                   'description': 'lorem ipsum description 0'
                },
                {
                    'title': 'lorem ipsum title 1 \n',
                    'description': 'lorem ipsum description 1'
                },
                {
                    'title': 'lorem ipsum title 2 \n',
                    'description': 'lorem ipsum description 2'
                },
                {
                    'title': 'lorem ipsum title 3 \n',
                    'description': 'lorem ipsum description 3'
                },
            ]
        },
        w: {
            type: 'number',
            default: 4
        },
        h: {
            type: 'number',
            default: 3
        }
    },

    init: function() {
        var el = this.el;
        var data = this.data;

        for(var i = 0; i < data.coord.length; i++) {

            let box = document.createElement('a-entity');
 
            box.setAttribute('geometry', {
                primitive: 'plane',
                height:  data.h,
                width: data.w
             });
 
             box.setAttribute('material', {
                 color: '#000000',
                 opacity: '0.8'
            });

            box.setAttribute('text', {
                value: data.info[i].title + data.info[i].description,
                align: 'center'
            });

            box.setAttribute('scale', '0 0 0')
            
            box.classList.add('box');

            box.setAttribute('position', '0 3 4');
            el.appendChild(box)
        }
    }
})

AFRAME.registerComponent('multiple-hotspots', {
    schema: {
        coord: {
            type: 'array',
            default: [
                {'x': -3.24, 'y': 1.75, 'z': 3},
                {'x': 1, 'y': 1.5, 'z': 3},
                {'x':  0, 'y': 2.75, 'z':  0},
                {'x':  3, 'y': 2, 'z': 1}
            ]
        },
        w: {
            type: 'number',
            default: 1
        },
        h: {
            type: 'number',
            default: 1
        }
    },

    init: function() {
        var el = this.el;
        var data = this.data;
        var popups = document.querySelectorAll('.box');
        var camera = document.getElementById('camera')
        var cameraPos = camera.getAttribute('position')

        for(let i = 0; i < data.coord.length; i++) {

           let spot = document.createElement('a-image');

           spot.setAttribute('geometry', {
                height: data.h,
                width: data.w
            });

            spot.setAttribute('material', {
                src: '#spot',
                opacity: '0'
            });

            spot.setAttribute('animation', {
                property: 'material.opacity',
                from: 0,
                to: 1,
                delay: 3200,
                easing: 'easeOutCubic'
            })
            
            spot.setAttribute('position', data.coord[i] );

            popups[i].setAttribute('visible', false)

            spot.addEventListener('click', function() {
                popups.forEach(function(element, i) {
                    element.setAttribute('animation', {
                        property: 'scale',
                        from: '1 1 1',
                        to: '0 0 0',
                        easing: 'easeOutCubic'
                    })
                });
                
                popups[i].setAttribute('visible', true)
                popups[i].setAttribute('animation', {
                    property: 'scale',
                    from: '0 0 0',
                    to: '1 1 1',
                    easing: 'easeOutCubic'
                })

                camera.setAttribute('animation', {
                    property: 'position',
                    from: cameraPos,
                    to: '0 1 0',
                    dur: 700
                })
            });

            el.appendChild(spot)
        }
    }
})
