/**
 * Created by lera on 3/3/17.
 */
// var preload = {
//
//     percentageLoad: function(){
//         var percentage;
//         percentage = 10;
//         return percentage;
//     },
//
//     strokeDasharray: function () {
//         var cerclePercentages = document.querySelector('.preloader__cercle-percentages'),
//             styleCerclePercentages = cerclePercentages.style.strokeDasharray;
//
//         styleCerclePercentages = '(' + percentageLoad + ' 150.79644737231007)';
//
//     }
// };

var Preload = (function () {
    var percentsTotal = 0,
        preloder = $('.preloader');

    var imgPath = $('*').map(function (ndx, element) {
        var background = $(element).css('background-image'),
            isImg = $(element).is('img'),
            isVideo = $(element).is('video'),
            path = '';

        if (background != 'none'){
            path = background.replace('url("', '').replace('")', '');
        }

        if (isImg || isVideo) {
            path = $(element).attr('src');
        }

        if (path) {
            return path;
        }
    });

    var animatePercents = function (animatePercent) {
        var circlePercentages = $('.preloader__cercle-percentages')[0],
            dashoffset = animatePercent / 100 * 150.79644737231007,
            circleRunner = $('.preloader__cercle-runner'),
            degTransformRotate = (animatePercent + 1) * 360 / 100;

        circlePercentages.style.strokeDasharray = dashoffset +' 150.79644737231007';
        console.log(circlePercentages.style.strokeDasharray);
        circleRunner.attr('transform', 'rotate(' + degTransformRotate + ' 31 31)');
    };
    
    var animateRunner = function () {
        
    }

    var setPercents = function(total, current) {
      var percents = Math.ceil(current / total * 100);

      $('.preloder__percentages').text(percents);

        animatePercents(percents);

      if (percents >= 100) {
          preloder.fadeOut();
      }
    };

    var loadImages = function (images) {
      if (!images.length) preloder.fadeOut();

      images.forEach(function (img, i, images) {
          var fakeImage = $('<img>' || '<video>', {
              attr: {
                  src: img
              }
          });

          fakeImage.on('load error', function () {
              percentsTotal++;
              setPercents(images.length, percentsTotal)
          })
      })
    };
    
    return {
        init: function () {
            var imgs = imgPath.toArray();

            loadImages(imgs);

        }
    }


}());

$(function () {
    Preload.init();
});