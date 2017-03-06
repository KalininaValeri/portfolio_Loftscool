var Flip = (function () {
    var flipContainer = document.querySelector('.flip-container');

    if (!(document.querySelector('.flip-container'))){
        return false;
    }
    
    return {
        init: function () {
            document.querySelector('.c-block-link_to-avtor').addEventListener('click' ,function () {
                flipContainer.classList.add('flip-container_back');
            });

            document.querySelector('#go-home').addEventListener('click', function (e) {
                e.preventDefault();
                flipContainer.classList.remove('flip-container_back');
            });
        }
    }
})();
