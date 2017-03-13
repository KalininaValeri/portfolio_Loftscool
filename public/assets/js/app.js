/**
 * Created by lera on 3/7/17.
 */

var Asside = (
    function () {


        if (!($('.l-page-nav_aside').length)) return false;

        var showSection = function (article, isAnimate) {
            var
                direction = article.replace('#', ''),
                reqArticle = $('.data-section').filter('[data-section="' + direction + '"]'),
                reqArticlePos = reqArticle.offset().top;

            if (isAnimate) {
                $('body, html').animate({scrollTop: reqArticlePos}, 500);
            } else {
                $('body, html').scrollTop(reqArticlePos);
            }
        };

        var checkSection = function () {

            $('.data-section').each(function () {
                var
                    $this = $(this),
                    topEdge = $this.offset().top - 300,
                    bottomEdge = topEdge + $this.height(),
                    wScroll = $(window).scrollTop();

                if (topEdge < wScroll && bottomEdge > wScroll) {
                    var
                        currentId = $this.data('section'),
                        activeLink = $('.l-page-nav__link').filter('[href="#' + currentId + '"]');

                    $('.l-page-nav__link').each(function () {
                       $(this).removeClass('l-page-nav__link_active');
                    });
                    activeLink.addClass('l-page-nav__link_active');
                    location.hash = '#' + currentId;
                }
            })
        };

        return {
            init: function () {

                if ($(window).width() <= 1200) {

                    $('.l-page-nav_aside__protractor').click(function () {

                        $('.l-page-nav_aside').toggleClass('l-page-nav_active');

                    });

                    $(window).scroll(function (e) {
                        checkSection();
                    });
                }

                if ($(window).width() > 1200) {
                    console.log($(window).width());

                    $(window).scroll(function (e) {
                        var
                            blockMain = $('.l-block-main'),
                            navTop = $(window).scrollTop() - blockMain.position().top + 40,
                            navTopBottom = $('.l-page-nav_aside').height() - $('.l-page-nav__list').height();


                        checkSection();

                        if (navTop < 0) navTop = 0;

                        if (navTop >= navTopBottom ) navTop = navTopBottom;

                        $('.l-page-nav__list').css('top', navTop);
                    });
                }



                $('.l-page-nav__link').on('click', function (e) {
                    e.preventDefault();
                    showSection($(this).attr('href'), true);

                });

                if (!!(location.hash)){
                    showSection(window.location.hash, false);
                }

            }
        }
    }
)();

var Flip = (function () {
    var flipContainer = document.querySelector('.flip-container');

    if (!(document.querySelector('.flip-container'))){
        return false;
    }
    
    return {
        init: function () {
            document.querySelector('.c-block-link_to-avtor').addEventListener('click' ,function () {
                flipContainer.classList.add('flip-container_back');
            });

            document.querySelector('#go-home').addEventListener('click', function (e) {
                e.preventDefault();
                flipContainer.classList.remove('flip-container_back');
            });
        }
    }
})();

var Navigation = (function () {
    var navigation = $('.c-nav_site-list'),
        parentNav = $('.content'),
        hamburger = $('#hamburger'),
        items = $('.c-nav_site__item'),
        timer;
    var counter = 0;
    var navActive = $('.c-nav_site_active');

    var ascentItems = function () {
        items[counter].classList.add('c-nav_site__hidden');
        counter++;

        timer = setTimeout(ascentItems, 100);

        if (counter >= items.length) {
            clearTimeout(timer);
        }

    };

    var listener = function () {
        hamburger[0].addEventListener('click', function () {

            hamburger.toggleClass('c-hamburger_active');
            navigation.toggleClass('c-nav_site_active');

            if (!!(parentNav.find('.c-nav_site_active').length)) {
                var newTimer;
                counter = 0;
                newTimer = setTimeout(ascentItems, 600);
                return false;
            }

            if (!(parentNav.find('.c-nav_site_active').length)) {
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('c-nav_site__hidden');
                }
            }

        });
    };

    return {
        init: function () {
            listener();
        }
    }
}());

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
            dashoffset = animatePercent / 100 * 150.79644737231007;

        circlePercentages.style.strokeDasharray = dashoffset +' 150.79644737231007';
    };

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

    if (document.querySelector('.l-slider') === null) {
        return false;
    }

    var doc = document;
    var arrowNext = doc.querySelector('#arrow-up'),
        arrowPrev = doc.querySelector('#arrow-down'),
        $slideActiveCaption = $('#slide-active-caption'),
        $slideActiveCaptionTitle = $slideActiveCaption.find('.c-block-title'),
        $slideActiveCaptionTechnology = $slideActiveCaption.find('.c-block-text_blue'),
        $slideActiveCaptionLink = $slideActiveCaption.find('.c-block-link_blue'),
        $sliderActivePicWrapper = $('#slide-active-pic'),
        $slideActivePicSpan = $sliderActivePicWrapper.find('span'),
        $slideActivePic = $('.l-slider__pic'),
        $sliderItems = $('#slide-items'),
        $fonDark = $('.l-slider__arrow-dark'),
        currentSlide = 0,
        size = sliderContent.length,
        inProcessNext = false,
        inProcessPrev = false,
        animationEnd;

    var Listener = function () {
        arrowNext.addEventListener('click', function (e) {
            e.preventDefault();
            currentSlide = limiter(currentSlide + 1);

            if (animationEnd >= 3) inProcessNext = false;

            if (!inProcessNext) {
                inProcessNext = true;
                deterActiveSlide();
                animationEnd = 0;
            }
        });

        arrowPrev.addEventListener('click', function (e) {
            e.preventDefault();
            currentSlide = limiter(currentSlide - 1);

            if (animationEnd >= 3) inProcessPrev = false;

            if (!inProcessPrev) {
                inProcessPrev = true;
                deterActiveSlide();
                animationEnd = 0;
            }
        });
    };

    var createElement = function (classPosition, classVisible) {
        var element = document.createElement('div');

        element.classList.add('l-slider__arrows-item');
        element.classList.add(classPosition);
        element.classList.add(classVisible);

        return element;
    };

    var nextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next-next'),
        prevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev');


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

    var textAnimate = function () {
        var
            strTitle = sliderContent[currentSlide].title,
            strTechnology = sliderContent[currentSlide].technology,
            charsTitle = strTitle.split(''),
            charsTechnology = strTechnology.split(''),
            counterTitle = 0,
            counterTech = 0,
            timer;

        $slideActiveCaptionTitle[0].innerHTML = '';
        $slideActiveCaptionTechnology[0].innerHTML = '';

        var eachCharTitle = function () {
            var char = doc.createTextNode(charsTitle[counterTitle]);

            $slideActiveCaptionTitle[0].appendChild(char);

            counterTitle++;
            timer = setTimeout(eachCharTitle, 50);

            if (counterTitle === charsTitle.length) {
                clearInterval(timer);
                animationEnd++;
            }
        };

        var eachCharTech = function () {
            var char = doc.createTextNode(charsTechnology[counterTech]);

            $slideActiveCaptionTechnology[0].appendChild(char);

            counterTech++;
            timer = setTimeout(eachCharTech, 50);

            if (counterTech === charsTechnology.length) {
                clearInterval(timer);
                animationEnd++;
            }
        };

        eachCharTitle();
        eachCharTech();
    };


    var buildSlider = function () {

        for (var i = 0; i < sliderContent.length; i++) {
            var
                prevSlideElement = createElement('l-slider__arrows-down', 'l-slider__arrows-prev');

            prevSlideElement.setAttribute('id', 'prev' + i);
            prevSlideElement.appendChild(createImgElement(sliderContent[i].imgSrc));
            prevSlideElement.appendChild(createDivElement(sliderContent[i].number));
            $sliderItems[0].insertBefore(prevSlideElement, $fonDark[0]);
        }

        for (var j = 0; j < sliderContent.length; j++) {
            var
                nextSlideElement = createElement('l-slider__arrows-up', 'l-slider__arrows-next');

            nextSlideElement.setAttribute('id', 'next' + j);
            nextSlideElement.appendChild(createImgElement(sliderContent[j].imgSrc));
            nextSlideElement.appendChild(createDivElement(sliderContent[j].number));
            $sliderItems[0].insertBefore(nextSlideElement, $fonDark[0]);
        }
    };

    var deterActiveSlide = function () {
        var
            mainSlide = sliderContent[limiter(currentSlide)],
            itemsPrev = $sliderItems.children('.l-slider__arrows-prev'),
            itemsNext = $sliderItems.children('.l-slider__arrows-next');

        textAnimate();

        $sliderActivePicWrapper[0].classList.add('l-slider__pic-wrapper_transform');

        setTimeout(function () {
            $sliderActivePicWrapper[0].classList.remove('l-slider__pic-wrapper_transform');
            $slideActivePic[0].setAttribute('src', mainSlide.imgSrc);
            $slideActivePicSpan[0].innerText = mainSlide.number;
            $slideActiveCaptionLink[0].setAttribute('href', mainSlide.siteUrl);
            animationEnd++;
        }, 500);

        $('.l-slider__arrows-next.l-slider__arrows-item_active').animate({top: '-100%'}, 500);
        $('#next' + [limiter(currentSlide + 1)]).animate({top: '0'}, 500);
        $('.l-slider__arrows-prev.l-slider__arrows-item_active').animate({top: '100%'}, 500);
        $('#prev' + [limiter(currentSlide - 1)]).animate({top: '0'}, 500);

        for (var i = 0; i < itemsPrev.length; i++) {
            itemsPrev[i].classList.remove('l-slider__arrows-item_active');
            itemsNext[i].classList.remove('l-slider__arrows-item_active');

            if (itemsPrev[i].hasAttribute('style')) {
                itemsPrev[i].removeAttribute('style');
            }

            if (itemsNext[i].hasAttribute('style')) {
                itemsNext[i].removeAttribute('style');
            }
        }

        itemsPrev[limiter(currentSlide - 1)].classList.add('l-slider__arrows-item_active');
        itemsNext[limiter(currentSlide + 1)].classList.add('l-slider__arrows-item_active');
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
            deterActiveSlide();
            Listener();
        }
    }
}());

var ValidationAvtor = (function () {
    if (!($('.c-form-avtor'))) return false;

    var valid = function () {

        var
            $form = $('.c-form-avtor'),
            $input = $form.find('.c-form-avtor__input'),
            $checkBox = $form.find('input[type="checkbox"]'),
            $radio = $form.find('input[type="radio"]'),
            numberEmptyInput = 0,
            numberChecekd = 0;

        $form.find('.error').remove();

        $input.each(function () {
            var $this = $(this);

            if ($this.val() === '') {

                $this.parents('.c-form-avtor__input-wrapper ')
                    .css({'border': '2px solid red'});
            } else {
                numberEmptyInput++;
            }
        });

        $checkBox.each(function () {
            var $this = $(this);

            if (!!$this.prop('checked')) {
                numberChecekd++;
            }
        });

        $radio.each(function () {
            var $this = $(this);

            if (!!$this.prop('checked')) {
                numberChecekd++;
            }
        });

        if (numberEmptyInput <= 1) {
            $('.c-form-avtor__content').append('<span class="error" style="color: red">Заполните все поля формы</span>');
            return false;
        }

        if (numberChecekd <= 2 || $('#hz').prop('checked')) {
            $('.c-form-avtor__content').append('<span class="error" style="color: red">Роботам тут не место</span>');
            return false;
        }
    };

    return {
        init: function () {
            $('.c-form-avtor').submit(function (e) {
                e.preventDefault();
                valid();
            });
        }
    }
})();

var ValidationContactMe = (function () {
        if (!$('.c-form_contact-me').length) return false;

        var $formContactMe = $('.c-form_contact-me'),
            $inputs = $formContactMe.find('.c-form__input');

        var reset = function () {
            $formContactMe.find('.error').remove();
            $inputs.each(function () {
                $(this).css({'boreder': 'none'});
            });
        };

        var valid = function () {


            var
                counter = 0;

            $inputs.each(function () {
                var $this = $(this);

                if (!!$this.val()) {
                    counter++;
                }

                if (!$this.val()) {
                    $this.css({'border': '1px solid red'});
                }
            });

            if (counter < 3) {
                $formContactMe.find('.c-form__button-container')
                    .before('<span class="error" style="color: red">Заполните все поля формы</span>');
            }
        };

        return {
            init: function () {
                $formContactMe.find('.c-form').submit(function (e) {
                    e.preventDefault();
                    reset();
                    valid();
                });

                $formContactMe.find('.c-form__buttom').click(function () {
                    reset();
                    $inputs.each(function () {
                        var $this = $(this);
                        $this.val('');
                    })
                });
            }
        }
    })();
(function () {
    'use strict';

    setTimeout(function () {
        // document.querySelector('.greating_picture').classList.add('m--show');
    }, 1000);
})();

var blur = (function () {
    var container = $('.c-form-container'),
        form = $('.c-form-wrapper');

    if (container.length === 0) return false;

    return {
        set: function () {
            var img = $('.c-block-bg_pic'),
                imgWidth = img.width(),
                imgHeight = img.height(),
                blurCss = form[0].style,
                posLeft = -container.offset().left,
                posTop = -container.position().top;

            blurCss.backgroundSize = imgWidth + 'px' + ' ' + imgHeight + 'px';
            blurCss.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
            form.css({
                'background-size': imgWidth + 'px' + ' ' + imgHeight + 'px',
                'background-position': posLeft + 'px' + ' ' + posTop + 'px'
            });
        }
    }
}());

var parallax = (function () {
    var bg = document.querySelector('.l-hero__bg');
    var user = document.querySelector('.c-user');
    var fon = document.querySelector('.c-user__bg');

    return {
        move: function (block, windowScroll, strafeAmound) {
            var strafe = windowScroll / -strafeAmound + '%';
            var transformString = 'translate3d(0,' + strafe + ', 0)';
            var style = block.style;

            style.transform = transformString;
            style.webkitTransform = transformString;

        },
        init: function (wScroll) {
            this.move(bg, wScroll, 50);
            this.move(fon, wScroll, 20);
        }
    }

}());

var parallaxMouse = function (e) {
    if (document.getElementById('paralax') === null) return false;

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

var App = (function () {
    return{
        init: function () {
            Preload.init();
            Navigation.init();

            if (!!(document.querySelector('.l-slider'))) {
                Slider.init();
                console.info('slider')
            }

            if (!!(document.querySelector('.flip-container'))) {
                Flip.init();
                console.info('flip');
            }

            if (!!(document.querySelector('.l-page-nav_aside'))) {
                console.info('asside');
                Asside.init();
            }

            if (!!(document.querySelector('.c-form-avtor'))) {
                console.info('form avtorisation');
                ValidationAvtor.init();
            }

            if (!!(document.querySelector('.c-form_contact-me'))) {
                console.log('form contacts-me');
                ValidationContactMe.init();
            }
        }
    }
})();


$(function () {
    var formUpload = document.querySelector('#upload');

    $('.l-hero').height($(window).height());

    App.init();

    // window.onscroll = function () {
    //     var wScroll = window.pageYOffset;
    //     parallax.init(wScroll);
    // };
    //
    // window.addEventListener('mousemove', function (e) {
    //     parallaxMouse(e);
    // });

    var fileUpload = function(url, data, cb){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        xhr.onload = function (e) {
            var result = JSON.parse(xhr.responseText);
            cb(result.status);
        };

        xhr.send(data);
    };

    function prepareSendFile(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var formData = new FormData();
        var file = document
            .querySelector('#file-select')
            .files[0];
        var name = document
            .querySelector('#file-desc')
            .value;

        formData.append('photo', file, file.name);
        formData.append('name', name);

        resultContainer.innerHTML = 'Uploading...';
        fileUpload('/upload', formData, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    if (formUpload) {
        formUpload.addEventListener('submit', prepareSendFile);
    }

    // mail

    //------------ block mail
    const formMail = document.querySelector('#mail');

    if (formMail) {
        formMail.addEventListener('submit', prepareSendMail);
    }

    function prepareSendMail(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            name: formMail.name.value,
            email: formMail.email.value,
            text: formMail.text.value
        };
        console.log(data);
        resultContainer.innerHTML = 'Sending...';
        sendMailData('/work', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    function sendMailData(url, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function (e) {
            var result = JSON.parse(xhr.responseText);
            cb(result.status);
        };
        xhr.send(JSON.stringify(data));
    }

    function sendAjaxJson(url, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function (e) {
            var result = JSON.parse(xhr.responseText);
            cb(result.status);
        };
        xhr.send(JSON.stringify(data));
    }

    //block blog

    const formBlog = document.querySelector('#blog');

    if (formBlog) {
        formBlog.addEventListener('submit', prepareSendPost);
    }

    function prepareSendPost(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            title: formBlog.title.value,
            date: formBlog.date.value,
            text: formBlog.text.value
        };
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/addpost', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    //---- block Login

    const formLogin = document.querySelector('#login');

    if (formLogin) {
        formLogin.addEventListener('submit', prepareAuth);
    }

    function prepareAuth(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            login: formLogin.login.value,
            password: formLogin.password.value
        };
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/login', data, function (data) {
            resultContainer.innerHTML = data;

            if (data == 'Авторизация успешна!') {
                window.location.href = '/admin';
            }
        });
    }

//blur
    if (document.querySelector('.c-form-container') ===null) {
        return false
    } else {
        blur.set();
        $(window).resize(function () {
            blur.set();
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2lkZS1uYXYuanMiLCJmbGlwLmpzIiwibmF2LmpzIiwicHJlbG9hZC5qcyIsInNsaWRlci5qcyIsInZhbGlkYXRpb24uanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbGVyYSBvbiAzLzcvMTcuXG4gKi9cblxudmFyIEFzc2lkZSA9IChcbiAgICBmdW5jdGlvbiAoKSB7XG5cblxuICAgICAgICBpZiAoISgkKCcubC1wYWdlLW5hdl9hc2lkZScpLmxlbmd0aCkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgc2hvd1NlY3Rpb24gPSBmdW5jdGlvbiAoYXJ0aWNsZSwgaXNBbmltYXRlKSB7XG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBhcnRpY2xlLnJlcGxhY2UoJyMnLCAnJyksXG4gICAgICAgICAgICAgICAgcmVxQXJ0aWNsZSA9ICQoJy5kYXRhLXNlY3Rpb24nKS5maWx0ZXIoJ1tkYXRhLXNlY3Rpb249XCInICsgZGlyZWN0aW9uICsgJ1wiXScpLFxuICAgICAgICAgICAgICAgIHJlcUFydGljbGVQb3MgPSByZXFBcnRpY2xlLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgICAgaWYgKGlzQW5pbWF0ZSkge1xuICAgICAgICAgICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHJlcUFydGljbGVQb3N9LCA1MDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCdib2R5LCBodG1sJykuc2Nyb2xsVG9wKHJlcUFydGljbGVQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjaGVja1NlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICQoJy5kYXRhLXNlY3Rpb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICB0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMzAwLFxuICAgICAgICAgICAgICAgICAgICBib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpLFxuICAgICAgICAgICAgICAgICAgICB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRvcEVkZ2UgPCB3U2Nyb2xsICYmIGJvdHRvbUVkZ2UgPiB3U2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudElkID0gJHRoaXMuZGF0YSgnc2VjdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTGluayA9ICQoJy5sLXBhZ2UtbmF2X19saW5rJykuZmlsdGVyKCdbaHJlZj1cIiMnICsgY3VycmVudElkICsgJ1wiXScpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X19saW5rJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2wtcGFnZS1uYXZfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVMaW5rLmFkZENsYXNzKCdsLXBhZ2UtbmF2X19saW5rX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gJyMnICsgY3VycmVudElkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSAxMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLmwtcGFnZS1uYXZfYXNpZGVfX3Byb3RyYWN0b3InKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X2FzaWRlJykudG9nZ2xlQ2xhc3MoJ2wtcGFnZS1uYXZfYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCh3aW5kb3cpLndpZHRoKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrTWFpbiA9ICQoJy5sLWJsb2NrLW1haW4nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgLSBibG9ja01haW4ucG9zaXRpb24oKS50b3AgKyA0MCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZUb3BCb3R0b20gPSAkKCcubC1wYWdlLW5hdl9hc2lkZScpLmhlaWdodCgpIC0gJCgnLmwtcGFnZS1uYXZfX2xpc3QnKS5oZWlnaHQoKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NlY3Rpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hdlRvcCA8IDApIG5hdlRvcCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYXZUb3AgPj0gbmF2VG9wQm90dG9tICkgbmF2VG9wID0gbmF2VG9wQm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubC1wYWdlLW5hdl9fbGlzdCcpLmNzcygndG9wJywgbmF2VG9wKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgICQoJy5sLXBhZ2UtbmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzaG93U2VjdGlvbigkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghIShsb2NhdGlvbi5oYXNoKSl7XG4gICAgICAgICAgICAgICAgICAgIHNob3dTZWN0aW9uKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4pKCk7XG4iLCJ2YXIgRmxpcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZsaXBDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKTtcblxuICAgIGlmICghKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwLWNvbnRhaW5lcicpKSl7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtYmxvY2stbGlua190by1hdnRvcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyAsZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZsaXBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZmxpcC1jb250YWluZXJfYmFjaycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnby1ob21lJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBmbGlwQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaXAtY29udGFpbmVyX2JhY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSkoKTtcbiIsInZhciBOYXZpZ2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmF2aWdhdGlvbiA9ICQoJy5jLW5hdl9zaXRlLWxpc3QnKSxcbiAgICAgICAgcGFyZW50TmF2ID0gJCgnLmNvbnRlbnQnKSxcbiAgICAgICAgaGFtYnVyZ2VyID0gJCgnI2hhbWJ1cmdlcicpLFxuICAgICAgICBpdGVtcyA9ICQoJy5jLW5hdl9zaXRlX19pdGVtJyksXG4gICAgICAgIHRpbWVyO1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgbmF2QWN0aXZlID0gJCgnLmMtbmF2X3NpdGVfYWN0aXZlJyk7XG5cbiAgICB2YXIgYXNjZW50SXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0ZW1zW2NvdW50ZXJdLmNsYXNzTGlzdC5hZGQoJ2MtbmF2X3NpdGVfX2hpZGRlbicpO1xuICAgICAgICBjb3VudGVyKys7XG5cbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGFzY2VudEl0ZW1zLCAxMDApO1xuXG4gICAgICAgIGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaGFtYnVyZ2VyWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBoYW1idXJnZXIudG9nZ2xlQ2xhc3MoJ2MtaGFtYnVyZ2VyX2FjdGl2ZScpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi50b2dnbGVDbGFzcygnYy1uYXZfc2l0ZV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKCEhKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1RpbWVyO1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIG5ld1RpbWVyID0gc2V0VGltZW91dChhc2NlbnRJdGVtcywgNjAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghKHBhcmVudE5hdi5maW5kKCcuYy1uYXZfc2l0ZV9hY3RpdmUnKS5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdjLW5hdl9zaXRlX19oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59KCkpO1xuIiwidmFyIFByZWxvYWQgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwLFxuICAgICAgICBwcmVsb2RlciA9ICQoJy5wcmVsb2FkZXInKTtcblxuXG4gICAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxuICAgICAgICAgICAgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKSxcbiAgICAgICAgICAgIGlzVmlkZW8gPSAkKGVsZW1lbnQpLmlzKCd2aWRlbycpLFxuICAgICAgICAgICAgcGF0aCA9ICcnO1xuXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJyl7XG4gICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSW1nIHx8IGlzVmlkZW8pIHtcbiAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgYW5pbWF0ZVBlcmNlbnRzID0gZnVuY3Rpb24gKGFuaW1hdGVQZXJjZW50KSB7XG4gICAgICAgIHZhciBjaXJjbGVQZXJjZW50YWdlcyA9ICQoJy5wcmVsb2FkZXJfX2NlcmNsZS1wZXJjZW50YWdlcycpWzBdLFxuICAgICAgICAgICAgZGFzaG9mZnNldCA9IGFuaW1hdGVQZXJjZW50IC8gMTAwICogMTUwLjc5NjQ0NzM3MjMxMDA3O1xuXG4gICAgICAgIGNpcmNsZVBlcmNlbnRhZ2VzLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGRhc2hvZmZzZXQgKycgMTUwLjc5NjQ0NzM3MjMxMDA3JztcbiAgICB9O1xuXG4gICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcblxuICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XG5cbiAgICAgICQoJy5wcmVsb2Rlcl9fcGVyY2VudGFnZXMnKS50ZXh0KHBlcmNlbnRzKTtcblxuICAgICAgICBhbmltYXRlUGVyY2VudHMocGVyY2VudHMpO1xuXG4gICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSB7XG4gICAgICAgICAgcHJlbG9kZXIuZmFkZU91dCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcblxuICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvZGVyLmZhZGVPdXQoKTtcblxuICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaSwgaW1hZ2VzKSB7XG4gICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+JyB8fCAnPHZpZGVvPicsIHtcbiAgICAgICAgICAgICAgYXR0cjoge1xuICAgICAgICAgICAgICAgICAgc3JjOiBpbWdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XG4gICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGltZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0oKSk7XG4iLCJ2YXIgc2xpZGVyQ29udGVudCA9IFtcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgiDRiNC60L7Qu9GLINC+0L3Qu9Cw0LnQvSDQvtCx0YDQsNC30L7QstCw0L3QuNGPXCIsXG4gICAgICAgIFwidGVjaG5vbG9neVwiOiBcIkhUTUwgLCBDU1MsIEpBVkFTQ1JJUFRcIixcbiAgICAgICAgXCJzaXRlVXJsXCI6IFwiaHR0cHM6Ly9sb2Z0c2Nob29sLmNvbS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCIvYXNzZXRzL2ltZy9jb250ZW50L3NpdGUucG5nXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiMVwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgjFHb29nbGVcIixcbiAgICAgICAgXCJ0ZWNobm9sb2d5XCI6IFwiSFRNTCAsIENTUywgSkFWQVNDUklQVFwiLFxuICAgICAgICBcInNpdGVVcmxcIjogXCJodHRwczovL3d3dy5nb29nbGUucnVcIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vd21hcmVhLm5ldC93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wNS8yd2ViX2hvc3Rpbmdfc2VvX3NpdGUuanBnXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiMlwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIFwidGl0bGVcIjogXCLQodCw0LnRgjJ5YVwiLFxuICAgICAgICBcInRlY2hub2xvZ3lcIjogXCJIVE1MICwgQ1NTLCBKQVZBU0NSSVBUXCIsXG4gICAgICAgIFwic2l0ZVVybFwiOiBcImh0dHBzOi8vd3d3LnlhbmRleC5ydS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vYnVtYmxlYmVlLmFydGRlcG8uY29tLnVhL3VwbG9hZC9pYmxvY2svZGI5L2RiOTM3YmQ0ODc3ZWZlMDMxNTM5NmQ4YTM0MDlhZmVmLmpwZ1wiLFxuICAgICAgICBcIm51bWJlclwiOiBcIjNcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBcInRpdGxlXCI6IFwi0KHQsNC50YIzbWFpbFwiLFxuICAgICAgICBcInRlY2hub2xvZ3lcIjogXCJIVE1MICwgQ1NTLCBKQVZBU0NSSVBUXCIsXG4gICAgICAgIFwic2l0ZVVybFwiOiBcImh0dHBzOi8vbWFpbC5ydS9cIixcbiAgICAgICAgXCJpbWdTcmNcIjogXCJodHRwOi8vY3MwMS5zZXJ2aWNlcy5teWE1LnJ1Ly0vdVJ1Ukh3V1Y5Y2t3a0V2LXNvOVZHdy9zdi90aGVtZXMvY2VudHJhbC8wLzIyMi0wLzIyMi0wLnBuZz8xNDUyMTc1MjAyXCIsXG4gICAgICAgIFwibnVtYmVyXCI6IFwiNFwiXG4gICAgfVxuXTtcblxudmFyIFNsaWRlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2xpZGVyJykgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgICB2YXIgYXJyb3dOZXh0ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJyNhcnJvdy11cCcpLFxuICAgICAgICBhcnJvd1ByZXYgPSBkb2MucXVlcnlTZWxlY3RvcignI2Fycm93LWRvd24nKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbiA9ICQoJyNzbGlkZS1hY3RpdmUtY2FwdGlvbicpLFxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGl0bGUgPSAkc2xpZGVBY3RpdmVDYXB0aW9uLmZpbmQoJy5jLWJsb2NrLXRpdGxlJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5ID0gJHNsaWRlQWN0aXZlQ2FwdGlvbi5maW5kKCcuYy1ibG9jay10ZXh0X2JsdWUnKSxcbiAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvbkxpbmsgPSAkc2xpZGVBY3RpdmVDYXB0aW9uLmZpbmQoJy5jLWJsb2NrLWxpbmtfYmx1ZScpLFxuICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlciA9ICQoJyNzbGlkZS1hY3RpdmUtcGljJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZVBpY1NwYW4gPSAkc2xpZGVyQWN0aXZlUGljV3JhcHBlci5maW5kKCdzcGFuJyksXG4gICAgICAgICRzbGlkZUFjdGl2ZVBpYyA9ICQoJy5sLXNsaWRlcl9fcGljJyksXG4gICAgICAgICRzbGlkZXJJdGVtcyA9ICQoJyNzbGlkZS1pdGVtcycpLFxuICAgICAgICAkZm9uRGFyayA9ICQoJy5sLXNsaWRlcl9fYXJyb3ctZGFyaycpLFxuICAgICAgICBjdXJyZW50U2xpZGUgPSAwLFxuICAgICAgICBzaXplID0gc2xpZGVyQ29udGVudC5sZW5ndGgsXG4gICAgICAgIGluUHJvY2Vzc05leHQgPSBmYWxzZSxcbiAgICAgICAgaW5Qcm9jZXNzUHJldiA9IGZhbHNlLFxuICAgICAgICBhbmltYXRpb25FbmQ7XG5cbiAgICB2YXIgTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFycm93TmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSBsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpO1xuXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uRW5kID49IDMpIGluUHJvY2Vzc05leHQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCFpblByb2Nlc3NOZXh0KSB7XG4gICAgICAgICAgICAgICAgaW5Qcm9jZXNzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFycm93UHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSBsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpO1xuXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uRW5kID49IDMpIGluUHJvY2Vzc1ByZXYgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCFpblByb2Nlc3NQcmV2KSB7XG4gICAgICAgICAgICAgICAgaW5Qcm9jZXNzUHJldiA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkVuZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChjbGFzc1Bvc2l0aW9uLCBjbGFzc1Zpc2libGUpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2wtc2xpZGVyX19hcnJvd3MtaXRlbScpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NQb3NpdGlvbik7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc1Zpc2libGUpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH07XG5cbiAgICB2YXIgbmV4dFNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtdXAnLCAnbC1zbGlkZXJfX2Fycm93cy1uZXh0LW5leHQnKSxcbiAgICAgICAgcHJldlNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtZG93bicsICdsLXNsaWRlcl9fYXJyb3dzLXByZXYnKTtcblxuXG4gICAgdmFyIGNyZWF0ZUltZ0VsZW1lbnQgPSBmdW5jdGlvbiAoc3JjKSB7XG4gICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ2wtc2xpZGVyX19hcnJvdy1waWMnKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcblxuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH07XG5cbiAgICB2YXIgY3JlYXRlRGl2RWxlbWVudCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGRpdi5pbm5lclRleHQgPSB0ZXh0O1xuXG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfTtcblxuICAgIHZhciB0ZXh0QW5pbWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAgICBzdHJUaXRsZSA9IHNsaWRlckNvbnRlbnRbY3VycmVudFNsaWRlXS50aXRsZSxcbiAgICAgICAgICAgIHN0clRlY2hub2xvZ3kgPSBzbGlkZXJDb250ZW50W2N1cnJlbnRTbGlkZV0udGVjaG5vbG9neSxcbiAgICAgICAgICAgIGNoYXJzVGl0bGUgPSBzdHJUaXRsZS5zcGxpdCgnJyksXG4gICAgICAgICAgICBjaGFyc1RlY2hub2xvZ3kgPSBzdHJUZWNobm9sb2d5LnNwbGl0KCcnKSxcbiAgICAgICAgICAgIGNvdW50ZXJUaXRsZSA9IDAsXG4gICAgICAgICAgICBjb3VudGVyVGVjaCA9IDAsXG4gICAgICAgICAgICB0aW1lcjtcblxuICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGl0bGVbMF0uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25UZWNobm9sb2d5WzBdLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIHZhciBlYWNoQ2hhclRpdGxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNoYXIgPSBkb2MuY3JlYXRlVGV4dE5vZGUoY2hhcnNUaXRsZVtjb3VudGVyVGl0bGVdKTtcblxuICAgICAgICAgICAgJHNsaWRlQWN0aXZlQ2FwdGlvblRpdGxlWzBdLmFwcGVuZENoaWxkKGNoYXIpO1xuXG4gICAgICAgICAgICBjb3VudGVyVGl0bGUrKztcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlYWNoQ2hhclRpdGxlLCA1MCk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyVGl0bGUgPT09IGNoYXJzVGl0bGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGVhY2hDaGFyVGVjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjaGFyID0gZG9jLmNyZWF0ZVRleHROb2RlKGNoYXJzVGVjaG5vbG9neVtjb3VudGVyVGVjaF0pO1xuXG4gICAgICAgICAgICAkc2xpZGVBY3RpdmVDYXB0aW9uVGVjaG5vbG9neVswXS5hcHBlbmRDaGlsZChjaGFyKTtcblxuICAgICAgICAgICAgY291bnRlclRlY2grKztcbiAgICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dChlYWNoQ2hhclRlY2gsIDUwKTtcblxuICAgICAgICAgICAgaWYgKGNvdW50ZXJUZWNoID09PSBjaGFyc1RlY2hub2xvZ3kubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZWFjaENoYXJUaXRsZSgpO1xuICAgICAgICBlYWNoQ2hhclRlY2goKTtcbiAgICB9O1xuXG5cbiAgICB2YXIgYnVpbGRTbGlkZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXJDb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnbC1zbGlkZXJfX2Fycm93cy1kb3duJywgJ2wtc2xpZGVyX19hcnJvd3MtcHJldicpO1xuXG4gICAgICAgICAgICBwcmV2U2xpZGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAncHJldicgKyBpKTtcbiAgICAgICAgICAgIHByZXZTbGlkZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3JlYXRlSW1nRWxlbWVudChzbGlkZXJDb250ZW50W2ldLmltZ1NyYykpO1xuICAgICAgICAgICAgcHJldlNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVEaXZFbGVtZW50KHNsaWRlckNvbnRlbnRbaV0ubnVtYmVyKSk7XG4gICAgICAgICAgICAkc2xpZGVySXRlbXNbMF0uaW5zZXJ0QmVmb3JlKHByZXZTbGlkZUVsZW1lbnQsICRmb25EYXJrWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2xpZGVyQ29udGVudC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2wtc2xpZGVyX19hcnJvd3MtdXAnLCAnbC1zbGlkZXJfX2Fycm93cy1uZXh0Jyk7XG5cbiAgICAgICAgICAgIG5leHRTbGlkZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICduZXh0JyArIGopO1xuICAgICAgICAgICAgbmV4dFNsaWRlRWxlbWVudC5hcHBlbmRDaGlsZChjcmVhdGVJbWdFbGVtZW50KHNsaWRlckNvbnRlbnRbal0uaW1nU3JjKSk7XG4gICAgICAgICAgICBuZXh0U2xpZGVFbGVtZW50LmFwcGVuZENoaWxkKGNyZWF0ZURpdkVsZW1lbnQoc2xpZGVyQ29udGVudFtqXS5udW1iZXIpKTtcbiAgICAgICAgICAgICRzbGlkZXJJdGVtc1swXS5pbnNlcnRCZWZvcmUobmV4dFNsaWRlRWxlbWVudCwgJGZvbkRhcmtbMF0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkZXRlckFjdGl2ZVNsaWRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgIG1haW5TbGlkZSA9IHNsaWRlckNvbnRlbnRbbGltaXRlcihjdXJyZW50U2xpZGUpXSxcbiAgICAgICAgICAgIGl0ZW1zUHJldiA9ICRzbGlkZXJJdGVtcy5jaGlsZHJlbignLmwtc2xpZGVyX19hcnJvd3MtcHJldicpLFxuICAgICAgICAgICAgaXRlbXNOZXh0ID0gJHNsaWRlckl0ZW1zLmNoaWxkcmVuKCcubC1zbGlkZXJfX2Fycm93cy1uZXh0Jyk7XG5cbiAgICAgICAgdGV4dEFuaW1hdGUoKTtcblxuICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlclswXS5jbGFzc0xpc3QuYWRkKCdsLXNsaWRlcl9fcGljLXdyYXBwZXJfdHJhbnNmb3JtJyk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkc2xpZGVyQWN0aXZlUGljV3JhcHBlclswXS5jbGFzc0xpc3QucmVtb3ZlKCdsLXNsaWRlcl9fcGljLXdyYXBwZXJfdHJhbnNmb3JtJyk7XG4gICAgICAgICAgICAkc2xpZGVBY3RpdmVQaWNbMF0uc2V0QXR0cmlidXRlKCdzcmMnLCBtYWluU2xpZGUuaW1nU3JjKTtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZVBpY1NwYW5bMF0uaW5uZXJUZXh0ID0gbWFpblNsaWRlLm51bWJlcjtcbiAgICAgICAgICAgICRzbGlkZUFjdGl2ZUNhcHRpb25MaW5rWzBdLnNldEF0dHJpYnV0ZSgnaHJlZicsIG1haW5TbGlkZS5zaXRlVXJsKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbkVuZCsrO1xuICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICQoJy5sLXNsaWRlcl9fYXJyb3dzLW5leHQubC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpLmFuaW1hdGUoe3RvcDogJy0xMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNuZXh0JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSArIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuICAgICAgICAkKCcubC1zbGlkZXJfX2Fycm93cy1wcmV2Lmwtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKS5hbmltYXRlKHt0b3A6ICcxMDAlJ30sIDUwMCk7XG4gICAgICAgICQoJyNwcmV2JyArIFtsaW1pdGVyKGN1cnJlbnRTbGlkZSAtIDEpXSkuYW5pbWF0ZSh7dG9wOiAnMCd9LCA1MDApO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXNQcmV2Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1ByZXZbaV0uY2xhc3NMaXN0LnJlbW92ZSgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICAgICAgaXRlbXNOZXh0W2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2wtc2xpZGVyX19hcnJvd3MtaXRlbV9hY3RpdmUnKTtcblxuICAgICAgICAgICAgaWYgKGl0ZW1zUHJldltpXS5oYXNBdHRyaWJ1dGUoJ3N0eWxlJykpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1ByZXZbaV0ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaXRlbXNOZXh0W2ldLmhhc0F0dHJpYnV0ZSgnc3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zTmV4dFtpXS5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtc1ByZXZbbGltaXRlcihjdXJyZW50U2xpZGUgLSAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICBpdGVtc05leHRbbGltaXRlcihjdXJyZW50U2xpZGUgKyAxKV0uY2xhc3NMaXN0LmFkZCgnbC1zbGlkZXJfX2Fycm93cy1pdGVtX2FjdGl2ZScpO1xuICAgIH07XG5cbiAgICB2YXIgbGltaXRlciA9IGZ1bmN0aW9uICh2YWwpIHtcblxuICAgICAgICBpZiAodmFsID49IHNpemUpIHtcbiAgICAgICAgICAgIHZhbCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsIDwgMCkge1xuICAgICAgICAgICAgdmFsID0gc2l6ZSAtIDE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidWlsZFNsaWRlcigpO1xuICAgICAgICAgICAgZGV0ZXJBY3RpdmVTbGlkZSgpO1xuICAgICAgICAgICAgTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG4iLCJ2YXIgVmFsaWRhdGlvbkF2dG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoISgkKCcuYy1mb3JtLWF2dG9yJykpKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgdmFsaWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyXG4gICAgICAgICAgICAkZm9ybSA9ICQoJy5jLWZvcm0tYXZ0b3InKSxcbiAgICAgICAgICAgICRpbnB1dCA9ICRmb3JtLmZpbmQoJy5jLWZvcm0tYXZ0b3JfX2lucHV0JyksXG4gICAgICAgICAgICAkY2hlY2tCb3ggPSAkZm9ybS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSxcbiAgICAgICAgICAgICRyYWRpbyA9ICRmb3JtLmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXScpLFxuICAgICAgICAgICAgbnVtYmVyRW1wdHlJbnB1dCA9IDAsXG4gICAgICAgICAgICBudW1iZXJDaGVjZWtkID0gMDtcblxuICAgICAgICAkZm9ybS5maW5kKCcuZXJyb3InKS5yZW1vdmUoKTtcblxuICAgICAgICAkaW5wdXQuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoJHRoaXMudmFsKCkgPT09ICcnKSB7XG5cbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnRzKCcuYy1mb3JtLWF2dG9yX19pbnB1dC13cmFwcGVyICcpXG4gICAgICAgICAgICAgICAgICAgIC5jc3Moeydib3JkZXInOiAnMnB4IHNvbGlkIHJlZCd9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbnVtYmVyRW1wdHlJbnB1dCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkY2hlY2tCb3guZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoISEkdGhpcy5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICBudW1iZXJDaGVjZWtkKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyYWRpby5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghISR0aGlzLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIG51bWJlckNoZWNla2QrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG51bWJlckVtcHR5SW5wdXQgPD0gMSkge1xuICAgICAgICAgICAgJCgnLmMtZm9ybS1hdnRvcl9fY29udGVudCcpLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJlcnJvclwiIHN0eWxlPVwiY29sb3I6IHJlZFwiPtCX0LDQv9C+0LvQvdC40YLQtSDQstGB0LUg0L/QvtC70Y8g0YTQvtGA0LzRizwvc3Bhbj4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW1iZXJDaGVjZWtkIDw9IDIgfHwgJCgnI2h6JykucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKCcuYy1mb3JtLWF2dG9yX19jb250ZW50JykuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImVycm9yXCIgc3R5bGU9XCJjb2xvcjogcmVkXCI+0KDQvtCx0L7RgtCw0Lwg0YLRg9GCINC90LUg0LzQtdGB0YLQvjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuYy1mb3JtLWF2dG9yJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHZhbGlkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbnZhciBWYWxpZGF0aW9uQ29udGFjdE1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCEkKCcuYy1mb3JtX2NvbnRhY3QtbWUnKS5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgJGZvcm1Db250YWN0TWUgPSAkKCcuYy1mb3JtX2NvbnRhY3QtbWUnKSxcbiAgICAgICAgICAgICRpbnB1dHMgPSAkZm9ybUNvbnRhY3RNZS5maW5kKCcuYy1mb3JtX19pbnB1dCcpO1xuXG4gICAgICAgIHZhciByZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICRmb3JtQ29udGFjdE1lLmZpbmQoJy5lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7J2JvcmVkZXInOiAnbm9uZSd9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB2YWxpZCA9IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgICAgICAgICB2YXJcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcblxuICAgICAgICAgICAgJGlucHV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEhJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghJHRoaXMudmFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRoaXMuY3NzKHsnYm9yZGVyJzogJzFweCBzb2xpZCByZWQnfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudGVyIDwgMykge1xuICAgICAgICAgICAgICAgICRmb3JtQ29udGFjdE1lLmZpbmQoJy5jLWZvcm1fX2J1dHRvbi1jb250YWluZXInKVxuICAgICAgICAgICAgICAgICAgICAuYmVmb3JlKCc8c3BhbiBjbGFzcz1cImVycm9yXCIgc3R5bGU9XCJjb2xvcjogcmVkXCI+0JfQsNC/0L7Qu9C90LjRgtC1INCy0YHQtSDQv9C+0LvRjyDRhNC+0YDQvNGLPC9zcGFuPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGZvcm1Db250YWN0TWUuZmluZCgnLmMtZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAkZm9ybUNvbnRhY3RNZS5maW5kKCcuYy1mb3JtX19idXR0b20nKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICRpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWF0aW5nX3BpY3R1cmUnKS5jbGFzc0xpc3QuYWRkKCdtLS1zaG93Jyk7XG4gICAgfSwgMTAwMCk7XG59KSgpO1xuXG52YXIgYmx1ciA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9ICQoJy5jLWZvcm0tY29udGFpbmVyJyksXG4gICAgICAgIGZvcm0gPSAkKCcuYy1mb3JtLXdyYXBwZXInKTtcblxuICAgIGlmIChjb250YWluZXIubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSAkKCcuYy1ibG9jay1iZ19waWMnKSxcbiAgICAgICAgICAgICAgICBpbWdXaWR0aCA9IGltZy53aWR0aCgpLFxuICAgICAgICAgICAgICAgIGltZ0hlaWdodCA9IGltZy5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICBibHVyQ3NzID0gZm9ybVswXS5zdHlsZSxcbiAgICAgICAgICAgICAgICBwb3NMZWZ0ID0gLWNvbnRhaW5lci5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICAgICAgICAgIHBvc1RvcCA9IC1jb250YWluZXIucG9zaXRpb24oKS50b3A7XG5cbiAgICAgICAgICAgIGJsdXJDc3MuYmFja2dyb3VuZFNpemUgPSBpbWdXaWR0aCArICdweCcgKyAnICcgKyBpbWdIZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgYmx1ckNzcy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCc7XG4gICAgICAgICAgICBmb3JtLmNzcyh7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6IGltZ1dpZHRoICsgJ3B4JyArICcgJyArIGltZ0hlaWdodCArICdweCcsXG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtcG9zaXRpb24nOiBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSgpKTtcblxudmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubC1oZXJvX19iZycpO1xuICAgIHZhciB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtdXNlcicpO1xuICAgIHZhciBmb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYy11c2VyX19iZycpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VuZCkge1xuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bmQgKyAnJSc7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsJyArIHN0cmFmZSArICcsIDApJztcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xuXG4gICAgICAgICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XG5cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNTApO1xuICAgICAgICAgICAgdGhpcy5tb3ZlKGZvbiwgd1Njcm9sbCwgMjApO1xuICAgICAgICB9XG4gICAgfVxuXG59KCkpO1xuXG52YXIgcGFyYWxsYXhNb3VzZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJhbGF4JykgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBwYXJhbGxheENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJhbGF4JyksXG4gICAgICAgIGxheWVycyA9IHBhcmFsbGF4Q29udGFpbmVyLmNoaWxkcmVuLFxuICAgICAgICBwYWdlWCA9IGUucGFnZVgsXG4gICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcbiAgICAgICAgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxuICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xuXG4gICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XG4gICAgICAgIHZhciBkaXZpZGVyID0gKGkgKyAyKSAvIDUwLFxuICAgICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxuICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxuICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuICAgICAgICAgICAgbGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxuICAgICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsICcgKyBwb3NpdGlvblkgKyAncHgsIDBweCknO1xuICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcbiAgICB9KVxufTtcblxudmFyIEFwcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJue1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBQcmVsb2FkLmluaXQoKTtcbiAgICAgICAgICAgIE5hdmlnYXRpb24uaW5pdCgpO1xuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmwtc2xpZGVyJykpKSB7XG4gICAgICAgICAgICAgICAgU2xpZGVyLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ3NsaWRlcicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcC1jb250YWluZXInKSkpIHtcbiAgICAgICAgICAgICAgICBGbGlwLmluaXQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ2ZsaXAnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEhKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sLXBhZ2UtbmF2X2FzaWRlJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdhc3NpZGUnKTtcbiAgICAgICAgICAgICAgICBBc3NpZGUuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybS1hdnRvcicpKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnZm9ybSBhdnRvcmlzYXRpb24nKTtcbiAgICAgICAgICAgICAgICBWYWxpZGF0aW9uQXZ0b3IuaW5pdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISEoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtZm9ybV9jb250YWN0LW1lJykpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm0gY29udGFjdHMtbWUnKTtcbiAgICAgICAgICAgICAgICBWYWxpZGF0aW9uQ29udGFjdE1lLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZvcm1VcGxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkJyk7XG5cbiAgICAkKCcubC1oZXJvJykuaGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSk7XG5cbiAgICBBcHAuaW5pdCgpO1xuXG4gICAgLy8gd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAvLyAgICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcbiAgICAvLyB9O1xuICAgIC8vXG4gICAgLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgLy8gICAgIHBhcmFsbGF4TW91c2UoZSk7XG4gICAgLy8gfSk7XG5cbiAgICB2YXIgZmlsZVVwbG9hZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY2Ipe1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcblxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kRmlsZShlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIHZhciBmaWxlID0gZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjZmlsZS1zZWxlY3QnKVxuICAgICAgICAgICAgLmZpbGVzWzBdO1xuICAgICAgICB2YXIgbmFtZSA9IGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI2ZpbGUtZGVzYycpXG4gICAgICAgICAgICAudmFsdWU7XG5cbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpO1xuXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4uJztcbiAgICAgICAgZmlsZVVwbG9hZCgnL3VwbG9hZCcsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmb3JtVXBsb2FkKSB7XG4gICAgICAgIGZvcm1VcGxvYWQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRGaWxlKTtcbiAgICB9XG5cbiAgICAvLyBtYWlsXG5cbiAgICAvLy0tLS0tLS0tLS0tLSBibG9jayBtYWlsXG4gICAgY29uc3QgZm9ybU1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbCcpO1xuXG4gICAgaWYgKGZvcm1NYWlsKSB7XG4gICAgICAgIGZvcm1NYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVTZW5kTWFpbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIG5hbWU6IGZvcm1NYWlsLm5hbWUudmFsdWUsXG4gICAgICAgICAgICBlbWFpbDogZm9ybU1haWwuZW1haWwudmFsdWUsXG4gICAgICAgICAgICB0ZXh0OiBmb3JtTWFpbC50ZXh0LnZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICAgICAgICBzZW5kTWFpbERhdGEoJy93b3JrJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kTWFpbERhdGEodXJsLCBkYXRhLCBjYikge1xuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYihyZXN1bHQuc3RhdHVzKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xuICAgICAgICB9O1xuICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgLy9ibG9jayBibG9nXG5cbiAgICBjb25zdCBmb3JtQmxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibG9nJyk7XG5cbiAgICBpZiAoZm9ybUJsb2cpIHtcbiAgICAgICAgZm9ybUJsb2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgcHJlcGFyZVNlbmRQb3N0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZFBvc3QoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgdGl0bGU6IGZvcm1CbG9nLnRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgZGF0ZTogZm9ybUJsb2cuZGF0ZS52YWx1ZSxcbiAgICAgICAgICAgIHRleHQ6IGZvcm1CbG9nLnRleHQudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdTZW5kaW5nLi4uJztcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvYWRkcG9zdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8tLS0tIGJsb2NrIExvZ2luXG5cbiAgICBjb25zdCBmb3JtTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW4nKTtcblxuICAgIGlmIChmb3JtTG9naW4pIHtcbiAgICAgICAgZm9ybUxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHByZXBhcmVBdXRoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVwYXJlQXV0aChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBsb2dpbjogZm9ybUxvZ2luLmxvZ2luLnZhbHVlLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IGZvcm1Mb2dpbi5wYXNzd29yZC52YWx1ZVxuICAgICAgICB9O1xuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ1NlbmRpbmcuLi4nO1xuICAgICAgICBzZW5kQWpheEpzb24oJy9sb2dpbicsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcblxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gJ9CQ0LLRgtC+0YDQuNC30LDRhtC40Y8g0YPRgdC/0LXRiNC90LAhJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9hZG1pbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy9ibHVyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jLWZvcm0tY29udGFpbmVyJykgPT09bnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgICBibHVyLnNldCgpO1xuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJsdXIuc2V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyJdfQ==
