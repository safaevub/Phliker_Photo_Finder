$(document).ready(function (){
       var flickrKey = "694e67e13fad33bb5b22b7af1d151c23";

        // Go button handler on top navigation bar
            $("#search_1").on("click", function(e){
        //taking input of textfield #searchText_1 and checking if it is empty
                if ($('#searchText_1').val() == "")
                {
                    alert ("Search field is empty !!!");
                    return false;
                } else{
                  var searchText = $('#searchText_1').val();
                }
              
        //my flicker key to to get response
              
        //array below is array of objects which handles id and source of each image       
              var n = 100;
              var arrayOfimages = [];
                  for (var i = 0; i < n; i++){
                      arrayOfimages.push(new Object());
                                             }               
        //data to specify what type of response to ask from flickr 
               var data = {
                tags: searchText,
                nojsoncallback: 1,
                format: "json",
                api_key: flickrKey,
                per_page: 20
              }

        //url to get images from flickr  
              var flickrApiUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key="+flickrKey+"&tags="+searchText;
        // print flickr api url in console for debugging
              console.log(flickrApiUrl);
        //ajax of JQuery for GET 
              $.ajax({
                  url: flickrApiUrl,
                  type: 'GET',
                  data: data,
                  dataType: 'json',
                  success: function (response) {
                    var photoInfo = response.photos;
                    var img ="";
                    var content = "";
                   
                   
                    if(response.stat == "fail"){
                      alert("Error occured ");
                       return false;
                                         }
                   if(response.photos.total == 0){
                    alert("No photos for that search ");
                    return false;
                   }
        //loop to create image for html with injunction of source of img
        //by the way saving id and source of image in array of Objects           
             for (var i=0; i< photoInfo.photo.length; i++){
            img += '<img class="imgs" id="'+ photoInfo.photo[i].id  +'"'+ 'src="http://farm'+photoInfo.photo[i].farm+'.staticflickr.com/'+photoInfo.photo[i].server +'/'+photoInfo.photo[i].id+'_'+photoInfo.photo[i].secret+'_m.jpg'+'"/>';           
             
            arrayOfimages.push({
                    id: photoInfo.photo[i].id,
                    image:"http://farm"+photoInfo.photo[i].farm+".staticflickr.com/"+photoInfo.photo[i].server +"/"+photoInfo.photo[i].id+"_"+photoInfo.photo[i].secret+"_z.jpg"          
                    
                });
             }         
        //Here we are creating content for div with id = srch_images                     
             content += "<div id='srch_images'>"; 
             content += img;
             content += "</div>";       
        //replacing content of #srch_big div by our content            
          $('#srch_big').html(content);
          $('#srch_big').css("background-color","D3D3D3");
        //handler if one of images displayed before will be clicked 
          $('.imgs').on('click',function(){
        // declaring itemIndex variable is to find out which image is clicked in arrayOfObjects    
                      var itemIndex =0;
        //taking id of clicked image
                      var id_s= $(this).attr('id');
        //loop to find at which index in Array, is clicked image               
                      for (var i=0; i < arrayOfimages.length;i++){
                        if(id_s === arrayOfimages[i].id){
                             
                             itemIndex = i;

                        }
                      }

                    
                                 
        //as we know which image is, we are placing it to modal Content with class=imgPreview           
                      $(".imgPreview").attr('src', arrayOfimages[itemIndex].image);
        // calling findImageInfo function to identify Title, Country, Region, Locality              
        //placing all taken info to Modal footer
                      findImageInfo(flickrKey,id_s);
                   
                       
        //after everthing showing modal             
                    $('#myModal').modal('show');
        // when next button in modal is clicked handler
                     $('#next').on('click',function(){
      //checking whether image is in the array range               
                    if(itemIndex === arrayOfimages.length - 1){
                        $('#next').css("clickable","false");
                         window.alert("This is last photo, no next !");
                      }
                       if (itemIndex !== arrayOfimages.length - 1){
        //placing image source to modal-body img source                  
                        $(".imgPreview").attr('src', arrayOfimages[++itemIndex].image);
        // calling findImageInfo function to identify Title, Country, Region, Locality              
        //placing all taken info to Modal footer                  
                           findImageInfo(flickrKey, arrayOfimages[itemIndex].id);                           
                        }
                     
                        
                                        
                    });
        // previous button in modal handler
                    $('#prev').on('click',function(){
        //checking whether image is in the array range             
                     if (itemIndex === 0){
                         $('#prev').css("clickable","false");
                        window.alert("This is  very first photo, no previous !");
                      } 
                       if(itemIndex !== 0){
      //placing image source to modal-body img source                    
                          $(".imgPreview").attr('src', arrayOfimages[--itemIndex].image);
      // calling findImageInfo function to identify Title, Country, Region, Locality              
      //placing all taken info to Modal footer                    
                           findImageInfo(flickrKey, arrayOfimages[itemIndex].id);
                          
                          }

                    });
                                });                                                      
                  
   
                  
                  
                            
              
        },
        // error handler for response
                  error: function( error ){
                
                      
                    
                    console.log('error: ', error);
                  },
        //message on completion of successful response         
                  complete: function( xhr, status){
                    console.log("The request is completed");
                  }    

        });

      });
      // Search button handler on body of main page      
              $("#search_2").on("click", function(e){
      //taking input of textfield #searchText_2 and checking if it is empty
                if ($('#searchText_2').val() == "")
                {
                    alert ("Search field is empty !!!");
                    return (false);
                } else{
                  var searchText = $('#searchText_2').val();
                }
      //my flicker key to to get response
              
      //array below is array of objects which handles id and source of each image              
               var n = 100;
               var arrayOfimages = [];
               for (var i = 0; i < n; i++){
                      arrayOfimages.push(new Object());
                      }

      //data to specify what type of response to ask from flickr         
              var data = {
                tags: searchText,
                nojsoncallback: 1,
                format: "json",
                api_key: flickrKey,
                per_page: 20
              }

      //url to get images from flickr      
             var flickrApiUrl = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key="+flickrKey+"&tags="+searchText;
      // print flickr api url in console for debugging
              console.log(flickrApiUrl);
      //ajax of JQuery for GET
              $.ajax({
                url: flickrApiUrl,
                  type: 'GET',
                  data: data,
                  dataType: 'json',
                  success: function (response) {

                  
      // function to do if response is successful              
          
                    var photoInfo = response.photos;
                    var img ="";
                    var content = "";
                   
                    
                    if(response.stat == "fail"){
                      alert("Error occured ");
                       return false;
                                         }
                    if(response.photos.total == 0){
                    alert("No photos for that search ");
                    return false;
                   }
      //loop to create image for html with injunction of source of img
      //by the way saving id and source of image in array of Objects             
             for (var i=0; i< photoInfo.photo.length; i++){
            img += '<img class="imgs" id="'+ photoInfo.photo[i].id  +'"'+ 'src="http://farm'+photoInfo.photo[i].farm+'.staticflickr.com/'+photoInfo.photo[i].server +'/'+photoInfo.photo[i].id+'_'+photoInfo.photo[i].secret+'_m.jpg'+'"/>';           
             
            arrayOfimages.push({
                    id: photoInfo.photo[i].id,
                    image:"http://farm"+photoInfo.photo[i].farm+".staticflickr.com/"+photoInfo.photo[i].server +"/"+photoInfo.photo[i].id+"_"+photoInfo.photo[i].secret+"_z.jpg"          
                    
                });
             }         
      //Here we are creating content for div with id = srch_images                        
             content += "<div id='srch_images'>"; 
             content += img;
             content += "</div>";       
      //replacing content of #srch_big div by our content              
          $('#srch_big').html(content);
          $('#srch_big').css("background-color","D3D3D3")
      //handler if one of images displayed before will be clicked    
          $('.imgs').on('click',function(){
      // declaring itemIndex variable is to find out which image is clicked in arrayOfObjects
                      var itemIndex =0;
      //taking id of clicked image                
      
                      var id_s= $(this).attr('id');
      //loop to find at which index in Array, is clicked image                
                      for (var i=0; i < arrayOfimages.length;i++){
                        if(id_s === arrayOfimages[i].id){
                             
                             itemIndex = i;

                        }
                      }

                    
                                 
      //as we know which image is, we are placing it to modal Content with class=imgPreview            
                      $(".imgPreview").attr('src', arrayOfimages[itemIndex].image);
      // calling findImageInfo function to identify Title, Country, Region, Locality              
      //placing all taken info to Modal footer  
                      findImageInfo(flickrKey,id_s);
                   
                       
      //after everthing showing modal              
                    $('#myModal').modal('show');
      // when next button in modal is clicked handler  
                    $('#next').on('click',function(){
      //checking whether image is in the array range               
                      if(itemIndex === arrayOfimages.length - 1){
                        $('#next').css("clickable","false");
                         window.alert("This is last photo, no next !");
                      }
                       if (itemIndex !== arrayOfimages.length - 1){
        //placing image source to modal-body img source                  
                        $(".imgPreview").attr('src', arrayOfimages[++itemIndex].image);
        // calling findImageInfo function to identify Title, Country, Region, Locality              
        //placing all taken info to Modal footer                  
                           findImageInfo(flickrKey, arrayOfimages[itemIndex].id);                           
                        }
                         
                        
                                        
                    });
      // when previous button in modal is clicked handler
                    $('#prev').on('click',function(){
      //checking whether image is in the array range                 
                      if (itemIndex === 0){
                         $('#prev').css("clickable","false");
                        window.alert("This is  very first photo, no previous !");
                      } 

                      if(itemIndex !== 0){
      //placing image source to modal-body img source                    
                          $(".imgPreview").attr('src', arrayOfimages[--itemIndex].image);
      // calling findImageInfo function to identify Title, Country, Region, Locality              
      //placing all taken info to Modal footer                    
                           findImageInfo(flickrKey, arrayOfimages[itemIndex].id);
                          
                          }

                    });
                                });                                                      
                  
   
                  
                  
                            
              
        },
        // error handler for response
                  error: function( error ){
                    console.log('error: ', error);
                  },
        //message on completion of successful response          
                  complete: function( xhr, status){
                    console.log("The request is completed");
                  }    

        });

      });
});
      // function to ask for response from flicker about location and title of images
function findImageInfo (key, ids){
      // url to ask for location
            var flickrGeoLocationUrl ="https://api.flickr.com/services/rest/?&method=flickr.photos.getInfo&api_key="+key+"&photo_id="+ids+"&nojsoncallback=1&format=json";
      //declaring variable for listing Country, Region, Locality        
                var clicked="";
      //declaring variable for Title          
                var image_tit ="";
      //getting response about Info of Image 
              $.get(flickrGeoLocationUrl, function(response1){
      //just displaying response to see response in console          
                  console.log(response1);
                 
      // checking existance of property title in response         
                if(response1.photo.title !== undefined ){
      // assigning Title to image_tit variable
                   image_tit += response1.photo.title._content;
      //placing Title text to modal Header
                   $('.modal-title').text(image_tit);
                    }else{
      // assigning Title to image_tit variable in case if undefined
                         image_tit += "Title: undefined";
      //placing Title text to modal Header
                         $('.modal-title').text(image_tit);
                    }
      // checking existance of property location in response                
                if(response1.photo.location !== undefined){
      // checking existance of property country in location in response              
                  if(response1.photo.location.country !== undefined){
      //creating list item for html and assigning it to variable
                     clicked += "<li>Country: "+response1.photo.location.country._content+'</li>';
                  }else{
      //creating list item for html and assigning it to variable in case being undefined              
                       clicked+= "<li>Country: undefined</li>";
                    }
      // checking existance of property region in location in response   
                    if(response1.photo.location.region !== undefined){
      //creating list item for html and assigning it to variable                
                        clicked += "<li>Region: "+response1.photo.location.region._content+"</li>"; 
                    }else{
      //creating list item for html and assigning it to variable in case being undefined                
                          clicked += "<li>Region: undefined</li>";
                    }  
      //checking existance of property locality in location in response                
                     if(response1.photo.location.locality !== undefined){
      //creating list item for html and assigning it to variable                    
                        clicked += "<li>Locality: "+response1.photo.location.locality._content+"</li>"; 
                    } else {
      //creating list item for html and assigning it to variable in case being undefined                
                          clicked += "<li>Locality: undefined</li>";
                    }   
      // as location property containes all Info, If it doesn't exist, declaring them 
      // undefined and creating list items respectively              
                    } else{
                      clicked += "<li>Country: undefined</li>";
                       clicked += "<li>Region: undefined</li>";
                        clicked += "<li>Locality: undefined</li>";
                    }  
      //placing Info of images in form of list items as we assigned them above
                      $('.ul_list').html(clicked);
                      

              });
         

}
