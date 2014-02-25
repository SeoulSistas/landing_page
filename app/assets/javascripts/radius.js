var map = null; 
var geocoder = null; 
var cityMarker = null; 
var cityCircle = null; 
var startValue = 5;

function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            cityMarker.setPosition(map.getCenter());
            updateCoordsOnPage(map.getCenter());
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function updateCoordsOnPage(pos) {
    var lat = document.getElementById('question_latitude');
    var lng = document.getElementById('question_longitude');
    lat.innerHTML = Math.round(pos.lat() * 10) / 10;
    lng.innerHTML = Math.round(pos.lng() * 10) / 10;
}

function init() {
    geocoder = new google.maps.Geocoder();
    var mapDiv = document.getElementById('map-canvas');
    map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(37.424105999999, -122.1660756),
        zoom: 10, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    cityMarker = new google.maps.Marker({
        position: map.getCenter(), 
        map: map, 
        visible: true});
    cityCircle = new google.maps.Circle({
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillOpacity: 0.15,
        map: map,
        center: map.getCenter(),
        radius: milesToMeters(startValue),
        visible: true
    });
    cityCircle.bindTo('center', cityMarker, 'position');
    updateCoordsOnPage(map.getCenter());
}

function milesToMeters(miles) {
    return miles * 1609.3;
}

$(function() {
    $( "#slider-range-max" ).slider({
        range: "max",
        min: 1,
        max: 20,
        value: startValue,
        slide: function( event, ui ) {
            $( "#question_radius" ).val( ui.value );
            updateRadius(ui.value);
        }
    });
    $( "#question_radius" ).val( $( "#slider-range-max" ).slider( "value" ) );
});

function updateRadius(rad) {
    cityCircle.setRadius(milesToMeters(rad));
}

google.maps.event.addDomListener(window, 'load', init);
//  function RadiusWidget() {
//   var circle = new google.maps.Circle({
//     strokeWeight: 2
//   });

//   // Set the distance property value, default to 20km.
//   this.set('distance', milesToKm(20));

//   // Bind the RadiusWidget bounds property to the circle bounds property.
//   this.bindTo('bounds', circle);

//   // Bind the circle center to the RadiusWidget center property
//   circle.bindTo('center', this);

//   // Bind the circle map to the RadiusWidget map
//   circle.bindTo('map', this);

//   // Bind the circle radius property to the RadiusWidget radius property
//   circle.bindTo('radius', this);
//   this.addSizer_();
// }
// RadiusWidget.prototype = new google.maps.MVCObject();
// /**
//  * Update the center of the circle and position the sizer back on the line.
//  *
//  * Position is bound to the DistanceWidget so this is expected to change when
//  * the position of the distance widget is changed.
//  */
//  RadiusWidget.prototype.center_changed = function() {
//   var bounds = this.get('bounds');

//   // Bounds might not always be set so check that it exists first.
//   if (bounds) {
//     var lng = bounds.getNorthEast().lng();

//     // Put the sizer at center, right on the circle.
//     var position = new google.maps.LatLng(this.get('center').lat(), lng);
//     this.set('sizer_position', position);
//     updateCoordsOnPage(position);
//   }
// };

// /**
//  * Update the radius when the distance has changed.
//  */
//  RadiusWidget.prototype.distance_changed = function() {
//   this.set('radius', this.get('distance') * 500);
// };

// /**
//  * Calculates the distance between two latlng locations in km.
//  * @see http://www.movable-type.co.uk/scripts/latlong.html
//  *
//  * @param {google.maps.LatLng} p1 The first lat lng point.
//  * @param {google.maps.LatLng} p2 The second lat lng point.
//  * @return {number} The distance between the two points in km.
//  * @private
//  */
//  RadiusWidget.prototype.distanceBetweenPoints_ = function(p1, p2) {
//   if (!p1 || !p2) {
//     return 0;
//   }

//   var R = 6371; // Radius of the Earth in km
//   var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
//   var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
//   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//   Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
//   Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   var d = R * c;
//   return d;
// };


// /**
//  * Set the distance of the circle based on the position of the sizer.
//  */
//  RadiusWidget.prototype.setDistance = function() {
//   // As the sizer is being dragged, its position changes.  Because the
//   // RadiusWidget's sizer_position is bound to the sizer's position, it will
//   // change as well.
//   var pos = this.get('sizer_position');
//   var center = this.get('center');
//   var distance = this.distanceBetweenPoints_(center, pos);

//   // Set the distance property for any objects that are bound to it
//   this.set('distance', distance);
// };

// /**
//  * A distance widget that will display a circle that can be resized and will
//  * provide the radius in km.
//  *
//  * @param {google.maps.Map} map The map on which to attach the distance widget.
//  *
//  * @constructor
//  */
//  function DistanceWidget(map) {
//   this.set('map', map);
//   this.set('position', map.getCenter());
//   var marker = new google.maps.Marker({
//     draggable: true,
//     title: 'Move me!'
//   });

//   // Bind the marker map property to the DistanceWidget map property
//   marker.bindTo('map', this);

//   // Bind the marker position property to the DistanceWidget position
//   // property
//   marker.bindTo('position', this);
//   // Create a new radius widget
//   var radiusWidget = new RadiusWidget();

// // Bind the radiusWidget map to the DistanceWidget map
// radiusWidget.bindTo('map', this);

// // Bind the radiusWidget center to the DistanceWidget position
// radiusWidget.bindTo('center', this, 'position');

// // Bind to the radiusWidgets' distance property
// this.bindTo('distance', radiusWidget);

// // Bind to the radiusWidgets' bounds property
// this.bindTo('bounds', radiusWidget);
// }

// /**
//  * Add the sizer marker to the map.
//  *
//  * @private
//  */
//  RadiusWidget.prototype.addSizer_ = function() {
//  var image = '/assets/double_arrow.gif';
//   var sizer = new google.maps.Marker({
//     draggable: true,
//     title: 'Drag me!',
//     icon: image
//   });

//   sizer.bindTo('map', this);
//   sizer.bindTo('position', this, 'sizer_position');
//   var me = this;
//   google.maps.event.addListener(sizer, 'drag', function() {
//   // Set the circle distance (radius)
//   me.setDistance();
// });
// };

// DistanceWidget.prototype = new google.maps.MVCObject();

// function kmToMiles(km) {
//   return Math.round(0.621371 * km * 10) / 10;
// }

// function milesToKm(miles) {
//   return Math.round(miles * 1.60934 * 10) / 10;
// }

// function displayInfo(widget) {
//   var info = document.getElementById('info');
//   // info.innerHTML = 'Radius: ' +
//     // kmToMiles(widget.get('distance')) + ' mi';
//   var radius = document.getElementById('question_radius');
//   radius.innerHTML = kmToMiles(widget.get('distance'));
// }

// function codeAddress() {
//   var address = document.getElementById('address').value;
//   geocoder.geocode( { 'address': address}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       map.setCenter(results[0].geometry.location);
//      // setupDistanceWidget();
//      distanceWidget.set('position', map.getCenter());
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }

// function setupDistanceWidget() {
//   distanceWidget = new DistanceWidget(map);
//   displayInfo(distanceWidget);
//   google.maps.event.addListener(distanceWidget, 'distance_changed', function() {
//     displayInfo(distanceWidget);
//   });

//   google.maps.event.addListener(distanceWidget, 'position_changed', function() {
//     displayInfo(distanceWidget);
//   });
// }

// function updateCoordsOnPage(pos) {
//   var latVal = Math.round(pos.lat() * 10) / 10;
//   var lngVal = Math.round(pos.lng() * 10) / 10;
//   var latForm = document.getElementById('question_latitude');
//   var lngForm = document.getElementById('question_longitude');
//   latForm.innerHTML = latVal;
//   lngForm.innerHTML = lngVal;
// }

// var geocoder;
// var map;
// var distanceWidget;


// function init() {
//   geocoder = new google.maps.Geocoder();
//   var mapDiv = document.getElementById('map-canvas');
//   map = new google.maps.Map(mapDiv, {
//     center: new google.maps.LatLng(37.424105999999, -122.1660756),
//     zoom: 10,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   });
//   updateCoordsOnPage(map.getCenter());
//   setupDistanceWidget();
// }

// google.maps.event.addDomListener(window, 'load', init);