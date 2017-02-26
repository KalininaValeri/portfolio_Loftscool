(function() {
  'use strict';

  setTimeout(function() {
    document.querySelector('.greating_picture').classList.add('m--show');
  }, 1000);
})();

$(function () {
    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }
});