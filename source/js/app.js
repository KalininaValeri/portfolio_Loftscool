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

            console.log('imgWidth', imgWidth);
            console.log('imgHeight', imgHeight);
            console.log('posTop', posTop);
            console.log('posLeft', posLeft);


        }
    }
}());

$(function () {
    blur.set();
    $(window).resize(function () {
        blur.set();
    })

});