var Navigation = (function () {
    var navigation = $('.c-nav_site-list'),
        hamburger = $('#hamburger');

    var listener = function () {
        hamburger[0].addEventListener('click',function () {
            hamburger.toggleClass('c-hamburger_active');
            navigation.toggleClass('c-nav_site_active');
        });
    };

    return {
        init: function () {
            listener();

        }
    }
}());
