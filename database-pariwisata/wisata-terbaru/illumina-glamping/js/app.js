var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];

$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  sidebarClick(parseInt($(this).attr("id"), 10));
});

if ( !("ontouchstart" in window) ) {
  $(document).on("mouseover", ".feature-row", function(e) {
    highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
  });
}

$(document).on("mouseout", ".feature-row", clearHighlight);



$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

function syncSidebar() {
  /* Empty sidebar features */
  $("#feature-list tbody").empty();
  /* Loop through theaters layer and add only features which are in the map bounds */
  theaters.eachLayer(function (layer) {
    if (map.hasLayer(theaterLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Loop through museums layer and add only features which are in the map bounds */
  museums.eachLayer(function (layer) {
    if (map.hasLayer(museumLayer)) {
      if (map.getBounds().contains(layer.getLatLng())) {
        $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      }
    }
  });
  /* Update list.js featureList */
  featureList = new List("features", {
    valueNames: ["feature-name"]
  });
  featureList.sort("feature-name", {
    order: "asc"
  });
}


/* Feature Search */
const main = function () {
  const searchElement = document.querySelector("#searchElement");
  const buttonSearchElement = document.querySelector("#searchButtonElement");
  const clubListElement = document.querySelector("#clubList");

  const onButtonSearchClicked = function () {
      const dataSource = new DataSource(renderResult, fallbackResult);
      dataSource.searchClub(searchElement.value);
  };

  const renderResult = function (results) {
      clubListElement.innerHTML = "";
      results.forEach(function (club) {
          const name = club.name;
          const fanArt = club.fanArt;
          const description = club.description;

          const clubElement = document.createElement("div");
          clubElement.setAttribute("class", "club");

          clubElement.innerHTML = `
          <img class="fan-art-club" src="${fanArt}" alt="Fan Art">
          <div class="club-info">
              <h2> ${name} </h2>
              <p> ${description} </p>
          </div>`;
       
          clubListElement.appendChild(clubElement);
      })
  };

  const fallbackResult = function (message) {
      clubListElement.innerHTML = "";
      clubListElement.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  };

  buttonSearchElement.addEventListener("click", onButtonSearchClicked);
}; 


/* Feature Search Lokasi */
jQuery(window).resize(function() {
	var h = jQuery('#sidemenu').height(), offsetTop = 120;
	// Calculate the top offset
	jQuery('.point-list-view').css('height', (h - offsetTop));
}).resize();


jQuery(document).ready(function(){
	jQuery('.point-list-view').resize();


});
