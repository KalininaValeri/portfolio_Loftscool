(function() {
  'use strict';

  setTimeout(function() {
    // document.querySelector('.greating_picture').classList.add('m--show');
  }, 1000);
})();

var blur = (function () {
    var container = $('.c-form-container'),
        form = $('.c-form-wrapper');

    return {
        set: function () {
            var img = $('.c-block-bg_pic'),
                imgWidth = img.width(),
                imgHeight = img.height(),
                posLeft = -container.offset().left,
                posTop = -container.position().top;

            // blurCss.backgroundSize = imgWidth + 'px' + ' ' + imgHeight + 'px';
            // blurCss.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
            form.css({'background-size': imgWidth + 'px' + ' ' + imgHeight + 'px', 'background-position': posLeft + 'px' + ' ' + posTop + 'px'});
        }
    }
}());

var parallax = (function (){
    var bg = document.querySelector('.l-hero__bg-pic');
    var user = document.querySelector('.c-user');
    var fon = document.querySelector('.c-user__bg');

    return {
        move: function(block, windowScroll, strafeAmound){
            var strafe = windowScroll / -strafeAmound + '%';
            var transformString = 'translate3d(0,' + strafe + ', 0)';
            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;

        },
        init: function(wScroll) {
            this.move(bg, wScroll, 80);
            this.move(fon, wScroll, 20);
        }
    }

}());



$(function () {
    $('.l-hero').height($(window).height());

    window.onscroll = function(){
        var wScroll = window.pageYOffset;
        parallax.init(wScroll);
    };

    blur.set();
    $(window).resize(function () {
        blur.set();
    });



});