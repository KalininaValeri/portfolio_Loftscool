var skillsAnimate = (function () {
    var $skillsParent = $('.l-skills-group'),
        $skills = $skillsParent.find('.c-skills__circle-above');

    if (!($skillsParent.length)) return false;

    var checkDistnce = function(scrollTop, elem){
        var offset = elem.offset().top;
        var windowMargin = Math.ceil($(window).height()/3);
        var topBorder = offset - scrollTop - windowMargin;
        var bottomEdge = elem.outerHeight(true) + offset;
        var bottomBorder = scrollTop + windowMargin - bottomEdge;

        return topBorder <= 0 && bottomBorder <= 0;
    };

    return {
        init: function () {
            $(window).on('scroll', function(){
                var scrollTop = $(window).scrollTop();

                if (checkDistnce(scrollTop, $skillsParent)) {
                    for (var i = 0; i < $skills.length; i++) {
                        $skills[i].classList.remove('c-skills__circle-above_no');

                    }
                }
            });

        }
    }
})();