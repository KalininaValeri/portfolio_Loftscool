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
