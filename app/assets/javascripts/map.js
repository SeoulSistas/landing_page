// var map;

//Kept in case we decide we want location
// function initialize() {
//   var mapOptions = {
//     zoom: 10
//   };
//   map = new google.maps.Map(document.getElementById('map'),
//       mapOptions);

//   // Try HTML5 geolocation
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = new google.maps.LatLng(position.coords.latitude,
//                                        position.coords.longitude);

//       var infowindow = new google.maps.InfoWindow({
//         map: map,
//         position: pos,
//         content: 'You\'re here  &nbsp  &nbsp'
//       });

//       map.setCenter(pos);
//     }, function() {
//       handleNoGeolocation(true);
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleNoGeolocation(false);
//   }
// }

// function handleNoGeolocation(errorFlag) {
//   if (errorFlag) {
//     var content = 'Error: The Geolocation service failed.';
//   } else {
//     var content = 'Error: Your browser doesn\'t support geolocation.';
//   }

//   var options = {
//     map: map,
//     position: new google.maps.LatLng(60, 105),
//   };

//   var infowindow = new google.maps.InfoWindow(options);
//   map.setCenter(options.position);
// }

// google.maps.event.addDomListener(window, 'load', initialize);