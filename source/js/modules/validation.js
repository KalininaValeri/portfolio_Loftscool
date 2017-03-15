// var ValidationAvtor = (function () {
//     if (!($('.c-form-avtor'))) return false;
//
//     var valid = function () {
//
//         var
//             $form = $('.c-form-avtor'),
//             $input = $form.find('.c-form-avtor__input'),
//             $checkBox = $form.find('input[type="checkbox"]'),
//             $radio = $form.find('input[type="radio"]'),
//             numberEmptyInput = 0,
//             numberChecekd = 0;
//
//         $form.find('.error').remove();
//
//         $input.each(function () {
//             var $this = $(this);
//
//             if ($this.val() === '') {
//
//                 $this.parents('.c-form-avtor__input-wrapper ')
//                     .css({'border': '2px solid red'});
//             } else {
//                 numberEmptyInput++;
//             }
//         });
//
//         $checkBox.each(function () {
//             var $this = $(this);
//
//             if (!!$this.prop('checked')) {
//                 numberChecekd++;
//             }
//         });
//
//         $radio.each(function () {
//             var $this = $(this);
//
//             if (!!$this.prop('checked')) {
//                 numberChecekd++;
//             }
//         });
//
//         if (numberEmptyInput <= 1) {
//             $('.c-form-avtor__content').append('<span class="error" style="color: red">Заполните все поля формы</span>');
//             return false;
//         }
//
//         if (numberChecekd <= 2 || $('#hz').prop('checked')) {
//             $('.c-form-avtor__content').append('<span class="error" style="color: red">Роботам тут не место</span>');
//             return false;
//         }
//     };
//
//     return {
//         init: function () {
//             $('.c-form-avtor').submit(function (e) {
//                 e.preventDefault();
//                 valid();
//             });
//         }
//     }
// })();

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