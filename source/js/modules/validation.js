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

    var prepareAuth = function (e) {
        e.preventDefault();

        numberChecekd = 0;

        valid();

        if (numberChecekd < 2 || $('#hz').prop('checked')) {
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
    };

    return {
        init: function () {


            formLogin.addEventListener('submit', prepareAuth);
        }
    }
})();

var validationContactMe = (function () {
    if (!$('.c-form_contact-me').length) return false;

    var $formContactMe = $('.c-form_contact-me'),
        $inputs = $formContactMe.find('.c-form__input'),
        resultContainer = document.querySelector('.c-form-avtor__status');
    const formMail = document.querySelector('#mail');

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

            $this.removeAttr('style');

            if (!!$this.val()) {
                counter++;
            }

            if (!$this.val()) {
                $this.css({'border': '1px solid red'});
            }
        });
    };

    function prepareSendMail(e) {
        e.preventDefault();

        valid();

        var data = {
            name: formMail.name.value,
            email: formMail.email.value,
            text: formMail.text.value
        };
        resultContainer.innerHTML = 'Sending...';
        sendAjaxJson('/work', data, function (data) {
            resultContainer.innerHTML = data;
        });
    }


    return {
        init: function () {


            formMail.addEventListener('submit', prepareSendMail);


            // $formContactMe.find('.c-form').submit(function (e) {
            //     e.preventDefault();
            //     reset();
            //     valid();
            //
            // });

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