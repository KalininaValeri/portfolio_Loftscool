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
        console.log('kdjfkjfasfjhasgf')

        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var formData = new FormData();
        var file = document
            .querySelector('#file-select')
            .files[0];
        var title = document
            .querySelector('#file-title')
            .value;
        var tech = document
            .querySelector('#file-tech')
            .value;
        var siteUrl = document
            .querySelector('#file-site')
            .value;

        formData.append('photo', file, file.name);
        formData.append('title', title);
        formData.append('technology', tech);
        formData.append('siteUrl', siteUrl);

        console.log('file', file);
        console.log('file.name', file.name);
        console.log('title', title);
        console.log('tech', tech);
        console.log('siteUrl', siteUrl);

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
        sendAjaxJson('/work', data, function (data) {
            resultContainer.innerHTML = data;
        });
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
        console.log(data);
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