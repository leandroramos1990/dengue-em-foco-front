angular.module('dengue.locais').factory('locais', function($http){

  function locations(){
    var url = "https://dengue-em-foco.herokuapp.com/api/locations/listar";
    return $http.get(url)
  }

  function locationMarker(loc , map){
      var map = map;
          var latLng = new google.maps.LatLng(loc[0],loc[1]);
          var marker = new google.maps.Marker({
                position: latLng,
                //icon: 'http://127.0.0.1:8080/img/ic_city_location.png',
                icon: 'https://s3.amazonaws.com/dengue-em-foco-web/img/ic_city_location.png',
                title: 'Região',
                map: map
          });
          map.setCenter(latLng);
          map.setZoom(12);
  }

  function nearestMarkers(loc){
      var url = "https://dengue-em-foco.herokuapp.com/api/markers/localizarProximo/"+loc[0]+"/"+loc[1];
      return $http.get(url)
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

  var setMarkers = function(markersJSON, loc){
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
          var content = "<h3 class='iw-title'>" + foco.title +  "</h3>" + '<div id="descricao"> <h6>'  + foco.description + "</h6> </div>" +  '<br><IMG  class="alinhar-imagem thumbnail" SRC='+siteUrl+foco.photoUrl+'>'
          markers.push(marker);
          google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){
              return function() {
                  infowindow.setContent(content);
                  infowindow.open(map,marker);
              };
          })(marker,content,infowindow));
          map.setZoom(12);
        }
        mcOptions = {
          styles:
          [{
              height: 53,
              url: "https://s3.amazonaws.com/dengue-em-foco-web/img/clustermarkers/m1.png",
              width: 53
              },
              {
              height: 56,
              url: "https://s3.amazonaws.com/dengue-em-foco-web/img/clustermarkers/m2.png",
              width: 56
              },
              {
              height: 66,
              url: "https://s3.amazonaws.com/dengue-em-foco-web/img/clustermarkers/m3.png",
              width: 66
              },
              {
              height: 78,
              url: "https://s3.amazonaws.com/dengue-em-foco-web/img/clustermarkers/m4.png",
              width: 78
              },
              {
              height: 90,
              url: "https://s3.amazonaws.com/dengue-em-foco-web/img/clustermarkers/m5.png",
              width: 90
          }]
        }

        var markerCluster = new MarkerClusterer(map, markers,mcOptions);
        if(loc[0] == 0 && loc[1] == 0)
        {
            setCurrentPosition(map);
        }else {
            locationMarker(loc, map);
        }

  }

  var infowindow = new google.maps.InfoWindow({
  });

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
                //icon: 'http://127.0.0.1:8080/' + 'img/ic_user_location.png',
                icon: 'https://s3.amazonaws.com/dengue-em-foco-web/img/ic_user_location.png',
                title:'Você está aqui!    ',
                map: map
          });
          marker.addListener('click', function() {
              infowindow.setContent(marker.title);
              infowindow.open(map, marker);
          });
          map.panTo(pos);
          map.setZoom(6);
        });
      }
  }

  return {
    locations:locations,
    nearestMarkers:nearestMarkers,
    setMarkers:setMarkers
  }
});
