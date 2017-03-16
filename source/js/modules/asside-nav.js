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
                    var
                        $protractor = $('.l-page-nav_aside__protractor'),
                        $smallNavPage = $('.l-page-nav_aside');

                    $(document).mouseup(function (e) {
                        if ($smallNavPage.has(e.target).length === 0){
                            $smallNavPage.removeClass('l-page-nav_active');
                        }
                    });

                    $protractor.click(function () {
                        $smallNavPage.toggleClass('l-page-nav_active');
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
