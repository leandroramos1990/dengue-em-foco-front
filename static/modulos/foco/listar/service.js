
angular.module('dengue.focos').factory('focos', function($http){

  function carregar(){
    var url = "https://dengue-em-foco.herokuapp.com/api/markers/listar";
    return $http.get(url)
  };

function contar(){
    var url = "https://dengue-em-foco.herokuapp.com/api/markers/contar";
    return $http.get(url)
  };

  function setCurrentPosition(map){
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var latLng = new google.maps.LatLng(pos.lat, pos.lng);
          var marker = new google.maps.Marker({
                position: latLng,
                //icon: 'http://127.0.0.1:8080/' + '/img/ic_user_location.png',
                icon: 'https://s3.amazonaws.com/dengue-em-foco-web/img/ic_user_location.png',
                title:'Você está aqui!    ',
                map: map
          });
          marker.addListener('click', function() {
              infowindow.setContent(marker.title);
              infowindow.open(map, marker);
          });
          map.setCenter(pos);
        });
      }
  }

  var getMap = function()  {
      var center = new google.maps.LatLng(37.4419, -122.1419);
      var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    return map;
  }

  var setMarkers = function(markersJSON){
    var map = getMap();
    var markers = [];
    for (var i = 0; i < markersJSON.length; i++) {
        var foco = markersJSON[i];
        var latLng = new google.maps.LatLng(foco.loc[0], foco.loc[1]);
        var marker = new google.maps.Marker({
            position: latLng,
            title:foco._id,
            map:map,
            name:i
        });
        var siteUrl= 	"https://s3.amazonaws.com/dengueemfoco/";
        var content = "<h3 class='iw-title'>" + foco.title + "</h3>"+  '<div id="descricao"> <h6>'  + foco.description + "</h6> </div>" + '<br><IMG  class="alinhar-imagem thumbnail" SRC='+siteUrl+foco.photoUrl+'>'
        markers.push(marker);
        google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
            return function() {
                infowindow.setContent(content);
                infowindow.open(map,marker);
            };
        })(marker,content,infowindow));
        map.panTo(marker.position);
        map.setZoom(12);
    }
    var markerCluster = new MarkerClusterer(map, markers);
    setCurrentPosition(map);
  }

  var infowindow = new google.maps.InfoWindow({
  });

  return {
    carregar:carregar,
    setMarkers:setMarkers,
    contar:contar
  }
});
