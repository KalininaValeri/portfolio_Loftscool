var parallaxMouse = (function () {
    if (document.getElementById('paralax') === null) return false;

    var calculateParallax = function(e){
        var parallaxContainer = document.getElementById('paralax'),
            layers = parallaxContainer.children,
            pageX = e.pageX,
            pageY = e.pageY,
            initialX = (window.innerWidth / 2) - pageX,
            initialY = (window.innerHeight / 2) - pageY;

        [].slice.call(layers).forEach(function (layer, i) {
            var divider = (i + 2) / 50,
                bottomPosition = (window.innerHeight / 2) * divider,
                positionX = initialX * divider,
                positionY = initialY * divider,
                layerStyle = layer.style,
                transformString = 'translate3d(' + positionX + 'px, ' + positionY + 'px, 0px)';
            layerStyle.transform = transformString;
        })
    };

    return {
        init: function () {
            window.addEventListener('mousemove', function (e) {
                calculateParallax(e);
            });
        }
    }
})();

