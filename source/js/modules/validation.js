var validationAvtor = (function () {
    if (!($('.c-form-avtor'))) return false;

    const formLogin = document.querySelector('#login');
    var numberChecekd = 0;
    var resultContainer = document.querySelector('.c-form-avtor__status');

    var valid = function () {

        var
            $form = $('.c-form-avtor'),
            $input = $form.find('.c-form-avtor__input'),
            $checkBox = $form.find('input[type="checkbox"]'),
            $radio = $form.find('input[type="radio"]'),
            numberEmptyInput = 0;

        $form.find('.error').remove();

        $input.each(function () {
            var $this = $(this);

            $this.parents('.c-form-avtor__input-wrapper ')
                .removeAttr('style');

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
            resultContainer.innerHTML = 'Заполните все поля формы';
            return false
        }

        if (numberChecekd <= 2 || $('#hz').prop('checked')) {
            resultContainer.innerHTML = 'Роботам тут не место';
        }
    };

    var prepareAuth = function(e) {
        e.preventDefault();

        valid();

        if (numberChecekd <= 2 || $('#hz').prop('checked')) {
            return false;
        }

        var data = {
            login: formLogin.login.value,
            password: formLogin.password.value
        };
        resultContainer.style.color = 'white';
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/', data, function (data) {
            resultContainer.innerHTML = data;

            if (data == 'Авторизация успешна!') {
                window.location.href = '/admin';
            }
        });
    }

    return {
        init: function () {


            formLogin.addEventListener('submit', prepareAuth);
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