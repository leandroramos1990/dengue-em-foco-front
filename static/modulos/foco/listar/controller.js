angular.module('dengue.focos').controller('ListarFocoController', function($scope, focos){
  
  focos.carregar()
  .then(function(response){
      focos.setMarkers(response.data.markers)
  })
  .catch(function(error){
    console.log(error);
  })

});
