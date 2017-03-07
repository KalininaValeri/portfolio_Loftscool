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
                   .css({'border' : '2px solid red'});
            } else {
                numberEmptyInput++;
            }
        });

        $checkBox.each(function () {
            var $this = $(this);

            if (!!$this.prop('checked')){
               numberChecekd++;
            }
        });

        $radio.each(function () {
            var $this = $(this);

            if (!!$this.prop('checked')){
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