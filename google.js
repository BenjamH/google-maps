$(document).ready(function(){

//calling on ready

  initMap();

// functions don't have to exist, but variables do when document on ready.


});

// var DBC = new google.maps.LatLng(37.784585, -122.397386)


//initiates map function

function initMap() {

  var map = new google.maps.Map(document.getElementById("map_div"), {
  center: generateRandomSFCoords(),
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

//creates marker. need to put in here to keep map in the scope.

var markerA = createMarker({
  position: generateRandomSFCoords(),
  map: map,
  icon: "http://cdn.bulbagarden.net/upload/7/72/Spr_4h_054.png"
});

// markerA.addListener('mouseover', toggleBounce);

// var markerB = createMarker({
//   position: generateRandomSFCoords(),
//   map: map,
//   icon: "https://33.media.tumblr.com/0900e3780e0da99a9aaaf1e56a7cda93/tumblr_ntlmxvw5yO1spo445o1_500.gif",
//   optimized: false
// }, "<h1>A</h1>");


var markers = [];

for (var i = 0; i < 50; i++) {
  markers[i] = createMarker({
    position: generateRandomSFCoords(),
    map: map,
    title: 'ice cream',
    icon: "http://31.media.tumblr.com/tumblr_ls9k18YAcI1qg66hv.gif",
    optimized: false
    });
  markers[i].addListener('click', toggleBounce);
  markers[i].addListener('mouseover', openInfoWindow);
  markers[i].addListener('mouseout', closeInfoWindow);
};

function toggleBounce() {
  if (this.getAnimation()) {
    this.setAnimation(null);
  } else {
    this.setAnimation(google.maps.Animation.BOUNCE);
  }
}


  // var contentString = '<div id="content">'+
  //     '<div id="siteNotice">'+
  //     '</div>'+
  //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
  //     '<div id="bodyContent">'+
  //     '<p><b>Bi-Rite Creamery</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
  //     'sandstone rock formation in the southern part of the '+
  //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
  //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
  //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
  //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
  //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
  //     'Aboriginal people of the area. It has many springs, waterholes, '+
  //     'rock caves and ancient paintings. Uluru is listed as a World '+
  //     'Heritage Site.</p>'+
  //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
  //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
  //     '(last visited June 22, 2009).</p>'+
  //     '</div>'+
  //     '</div>';

    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Bi-Rite Creamery</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Bi-Rite Creamery</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

function openInfoWindow() {
  infoWindow.open(map, this);
}

function closeInfoWindow() {
  infoWindow.close(map, this);
}

var drive1Path = [ generateRandomSFCoords(),generateRandomSFCoords() ];

//info window




// var drive1 = new google.maps.Polyline({
//   path: drive1Path,
//   geodesic: false,
//   strokeColor: '#FF0000',
//   strokeOpacity: 1.0,
//   strokeWeight: 2
// });

 var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#393'
  };

var drive1 = new google.maps.Polyline({
  path: drive1Path,
  geodesic: false,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2,
  icons: [{
      icon: lineSymbol,
      offset: '100%'
    }]
});

// calling animate circle on the drive

 animateCircle(drive1);

// line gets set on map

drive1.setMap(map);

// animates the circle on line

function animateCircle(line) {
    var count = 0;
    window.setInterval(function() {
      count = (count + 1) % 200;

      var icons = line.get('icons');
      icons[0].offset = (count / 2) + '%';
      line.set('icons', icons);
  }, 20);
}

// setting driving directions on map

directionsDisplay.setMap(map);

// generates the route. possible errors with functions being hoisted to the top.

generateRouteBetween2Points(directionsDisplay);

}

// an object constructor with factory design.

function createMarker(options, html) {
  var marker = new google.maps.Marker(options);
    if (html) {
      google.maps.event.addListener(marker, "click", function() {
        infoWindow.setContent(html);
        infoWindow.open(options.map, this);
      });
    }
    return marker;
}



// create random google.maps area with coords

function generateRandomSFCoords(){
  var deltaLat = 0.02*(Math.random()-0.5);
  var deltaLong = 0.02*(Math.random()-0.5);
  return new google.maps.LatLng(37.7833 + deltaLat, -122.4167 + deltaLong);
}

// grabs directions

var directionsService = new google.maps.DirectionsService();


// renders directions

var directionsDisplay = new google.maps.DirectionsRenderer();

// var drive1Path = [new google.maps.LatLng(listCoords[0][0],listCoords[0][1]),(generateRandomSFCoords(),generateRandomSFCoords()) ];




// generates a route between two points

function generateRouteBetween2Points(directionsDisplay){
  var request1 = {
    origin: generateRandomSFCoords(),
    destination: generateRandomSFCoords(),
    travelMode: google.maps.TravelMode.DRIVING
  };

// similar to end of AJAX request. JS was made for asynchronous programming.
// object we are using to communicate with google server is the request object directionsservice, and a callback function when you get the request, use the response.

directionsService.route(request1,function(response,status){
  directionsDisplay.setDirections(response);
  });

};
