var sliderContent = [
    {
        "title": "Сайт школы онлайн образования",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://loftschool.com/",
        "imgSrc": "/assets/img/content/site.png",
        "number": "1"
    },
    {
        "title": "Сайт1Google",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://www.google.ru",
        "imgSrc": "http://wmarea.net/wp-content/uploads/2016/05/2web_hosting_seo_site.jpg",
        "number": "2"
    },
    {
        "title": "Сайт2ya",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://www.yandex.ru/",
        "imgSrc": "http://bumblebee.artdepo.com.ua/upload/iblock/db9/db937bd4877efe0315396d8a3409afef.jpg",
        "number": "3"
    },
    {
        "title": "Сайт3mail",
        "technology": "HTML , CSS, JAVASCRIPT",
        "siteUrl": "https://mail.ru/",
        "imgSrc": "http://cs01.services.mya5.ru/-/uRuRHwWV9ckwkEv-so9VGw/sv/themes/central/0/222-0/222-0.png?1452175202",
        "number": "4"
    }
];

var Slider = (function () {
    var doc = document;
    var arrowNext = doc.querySelector('#arrow-up'),
        arrowPrev = doc.querySelector('#arrow-down'),
        $slideActiveCaption = $('#slide-active-caption'),
        $slideActiveCaptionTitle = $slideActiveCaption.find('.c-block-title'),
        $slideActiveCaptionTechnology = $slideActiveCaption.find('.c-block-text_blue'),
        $slideActiveCaptionLink = $slideActiveCaption.find('.c-block-link_blue'),
        $sliderActivePicWrapper = $('#slide-active-pic'),
        $slideActivePicSpan = $('#slide-active-pic').find('span'),
        $slideActivePic = $('.l-slider__pic'),
        $sliderItems = $('#slide-items'),
        $fonDark= $('.l-slider__arrow-dark'),
        currentSlide = 0,
        size = sliderContent.length;

    var Listener = function () {
        arrowNext.addEventListener('click', function (e) {
            e.preventDefault();
            clearItem();
            currentSlide = limiter(currentSlide + 1);
            buildSlider();
        });

        arrowPrev.addEventListener('click', function (e) {
            e.preventDefault();
            clearItem();
            currentSlide = limiter(currentSlide - 1);
            buildSlider();
        });
    };

    var clearItem = function () {
        nextNextSlideElement.innerHTML = '';
        nextSlideElement.innerHTML = '';
        prevSlideElement.innerHTML = '';
        prevPrevSlideElement.innerHTML = '';
    };

    var createElement = function (classPosition, classVisible) {
        var element = document.createElement('div');

        element.classList.add('l-slider__arrows-item');
        element.classList.add(classPosition);
        element.classList.add(classVisible);

        return element;
    };

    var nextNextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next-next'),
        nextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next'),
        prevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev'),
        prevPrevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev-prev');

    $sliderItems[0].insertBefore(prevPrevSlideElement, $fonDark[0]);
    $sliderItems[0].insertBefore(prevSlideElement, $fonDark[0]);
    $sliderItems[0].insertBefore(nextSlideElement, $fonDark[0]);
    $sliderItems[0].insertBefore(nextNextSlideElement, $fonDark[0]);

    var createImgElement = function (src) {
        var img = document.createElement('img');
        img.classList.add('l-slider__arrow-pic');
        img.setAttribute('src', src);

        return img;
    };

    var createDivElement = function (text) {
        var div = document.createElement('span');
        div.innerText = text;

        return div;
    };


    var buildSlider = function () {
        var mainSlide = sliderContent[currentSlide],
            prevSlide = sliderContent[limiter(currentSlide - 1)],
            nextSlide = sliderContent[limiter(currentSlide + 1)],
            nextNextSlide = sliderContent[limiter(limiter(currentSlide + 1) + 1)];

        $sliderItems.addClass('l-slider__arrows_transform');
        $sliderActivePicWrapper.addClass('l-slider__pic-wrapper_transform');


        setTimeout(function () {
            $sliderActivePicWrapper.removeClass('l-slider__pic-wrapper_transform');
            $sliderItems.removeClass('l-slider__arrows_transform');

            nextNextSlideElement.appendChild(createImgElement(nextNextSlide.imgSrc));
            nextNextSlideElement.appendChild(createDivElement(nextNextSlide.number));

            nextSlideElement.appendChild(createImgElement(nextSlide.imgSrc));
            nextSlideElement.appendChild(createDivElement(nextSlide.number));

            prevSlideElement.appendChild(createImgElement(prevSlide.imgSrc));
            prevSlideElement.appendChild(createDivElement(prevSlide.number));

            prevPrevSlideElement.appendChild(createImgElement(mainSlide.imgSrc));
            prevPrevSlideElement.appendChild(createDivElement(mainSlide.number));

            $slideActivePic[0].setAttribute('src', mainSlide.imgSrc);
            $slideActivePicSpan[0].innerText = mainSlide.number;
            $slideActiveCaptionTitle[0].innerText = mainSlide.title;
            $slideActiveCaptionTechnology[0].innerText = mainSlide.technology;
            $slideActiveCaptionLink[0].setAttribute('href', mainSlide.siteUrl);
        }, 500);
    };

    var limiter = function (val) {

        if (val >= size) {
            val = 0;
        }

        if (val < 0) {
            val = size - 1;
        }

        return val;
    };

    return {
        init: function () {
            buildSlider();
            Listener();
        }
    }
}());
