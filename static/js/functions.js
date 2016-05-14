jQuery('document').ready(function($){
     
     $('div#map').click(function(){
          var infoWindow = document.getElementsByClassName("gm-style-iw");

          if(infoWindow.length > 0){
             var title = document.getElementsByClassName("iw-title");  
             if(title.length > 0){
                 jQuery('span.close').remove();
                 jQuery(title).append("<span class='close'></span>");
                 jQuery(title).click(function(){
                     jQuery(infoWindow).parent().hide();  
                 });
             }
          }    
     });
});