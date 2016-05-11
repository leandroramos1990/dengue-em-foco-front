angular.module('dengue.focos').controller('ListarFocoController', function($scope, focos){
  
  focos.carregar()
  .then(function(response){
      focos.setMarkers(response.data.markers)
  })
  .catch(function(error){
    console.log(error);
  });

  focos.contar()
  .then(function(response){
    console.log(response.data);
    //$scope.contar = response.data;  
    var span = document.getElementById('qtdFocos');

    while( span.firstChild ) {
        span.removeChild( span.firstChild );
    }
    span.appendChild( document.createTextNode(response.data) );  
      
  })
  .catch(function(error){
      
  });

});

