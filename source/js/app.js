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

var App = (function () {
    return{
        init: function () {
            Preload.init();


            if (!!(document.querySelector('.c-hamburger_nav'))) {
                navigation.init();
            }

            if (!!(document.querySelector('.l-slider'))) {
                Slider.init();
            }

            if (!!(document.querySelector('.flip-container'))) {
                Flip.init();
            }

            if (!!(document.querySelector('.l-page-nav_aside'))) {
                Asside.init();
            }

            if (!!(document.querySelector('.c-form-avtor'))) {
                validationAvtor.init();
            }

            if (!!(document.querySelector('.c-form_contact-me'))) {
                validationContactMe.init();
            }

            if (!!document.getElementById('paralax')) {
                parallaxMouse.init();
            }

            if (!!document.querySelector('.l-skills-group')) {
                skillsAnimate.init();
            }

            if (!!(document.querySelector('.l-hero__bg'))) {
                window.onscroll = function () {
                    var wScroll = window.pageYOffset;
                    parallax.init(wScroll);
                };
            }

            if (document.querySelector('.c-form-container') !==null) {
                blur.set();
                $(window).resize(function () {
                    blur.set();
                })
            }

            if (document.querySelector('.l-hero') !==null) {
                $('.l-hero').height($(window).height());
            }
        }
    }
})();

$(function () {
    if (!!(document.getElementById('map'))) {
        ymaps.ready(init);
        var myMap;

        function init(){
            myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });
        }
    }

    App.init();

    var formUpload = document.querySelector('#upload');

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

        resultContainer.innerHTML = 'Uploading...';
        fileUpload('/upload', formData, function (data) {
            resultContainer.innerHTML = data;
        });
    }

    if (formUpload) {
        formUpload.addEventListener('submit', prepareSendFile);
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

    //block skills

    const formSkills = document.querySelector('#skills');

    if (formSkills) {
        formSkills.addEventListener('submit', prepareSendSkills);
    }

    function prepareSendSkills(e) {
        e.preventDefault();
        var resultContainer = document.querySelector('.status');
        var data = {
            html: formSkills.html.value,
            css: formSkills.css.value,
            js: formSkills.js.value,
            php: formSkills.php.value,
            sql: formSkills.sql.value,
            node: formSkills.node.value,
            mongo: formSkills.mongo.value,
            git: formSkills.git.value,
            gulp: formSkills.gulp.value,
            bower: formSkills.bower.value
        };

        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/admin', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }
});