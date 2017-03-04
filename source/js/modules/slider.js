var sliderContent = [
    {
        "title": "Сайт школы онлайн образования",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://loftschool.com/",
        "imgSrc": "/assets/img/content/site.png",
        "number" : "1"
    },
    {
        "title": "Сайт1Google",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://www.google.ru",
        "imgSrc": "http://wmarea.net/wp-content/uploads/2016/05/2web_hosting_seo_site.jpg",
        "number" : "2"
    },
    {
        "title": "Сайт2ya",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://www.yandex.ru/",
        "imgSrc": "http://bumblebee.artdepo.com.ua/upload/iblock/db9/db937bd4877efe0315396d8a3409afef.jpg",
        "number" : "3"
    },
    {
        "title": "Сайт3mail",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://mail.ru/",
        "imgSrc": "http://cs01.services.mya5.ru/-/uRuRHwWV9ckwkEv-so9VGw/sv/themes/central/0/222-0/222-0.png?1452175202",
        "number" : "4"
    }
];

var Slider= (function () {
    var $arrowUp = $('#arrow-up'),
        $arrowDown = $('#arrow-down'),
        $slideActiveCaption = $('#slide-active-caption'),
        $slideActiveCaptionTitle = $slideActiveCaption.find('.c-block-title'),
        $slideActiveCaptionTechnology = $slideActiveCaption.find('.c-block-text_blue'),
        $slideActiveCaptionLink = $slideActiveCaption.find('.c-block-link_blue'),
        $slideActivePicSpan = $('#slide-active-pic').find('span'),
        $slideActivePic = $('.l-slider__pic'),
        $sliderItems = $('#slide-items');


    var buildSlider = function () {
        var firstSliderContent = sliderContent[1];

        $slideActiveCaptionTitle.text(firstSliderContent.title);
        $slideActiveCaptionTechnology.text(firstSliderContent.technology);
        $slideActiveCaptionLink.attr('href', firstSliderContent.siteUrl);
        $slideActivePic.attr('src', firstSliderContent.imgSrc);
        $slideActivePicSpan.text(firstSliderContent.number);

        for (var i = 0; i < sliderContent.length; i++){
            var node = '<div class="l-slider__arrows-item">' +
                '<div class="l-slider__arrow-dark"></div>' +
                '<img class="l-slider__arrow-pic" src="' + sliderContent[i].imgSrc + '">' +
                '</div>',
                $sliderItem = $sliderItems.find('.l-slider__arrows-item');

            if (i === 0) {
                $sliderItems.append(node);
                $sliderItems.find('.l-slider__arrows-item').addClass('l-slider__arrows-down l-slider__arrows-item_visible')
            }

            if (i === 2) {

                ($sliderItems.append(node)).addClass('l-slider__arrows-up l-slider__arrows-item_visible');
                console.log($sliderItems.find('.l-slider__arrows-item'));
                // $sliderItems.find('.l-slider__arrows-item')[2].addClass('l-slider__arrows-up l-slider__arrows-item_visible');
                // $sliderItem.addClass('l-slider__arrows-up l-slider__arrows-item_visible')
            }

            $sliderItems.append(node);

        }
    };

    return {
        init: function () {
            buildSlider();
            console.log('hi');

        }
    }
}());
