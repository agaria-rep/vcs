var map = L.map('map', {
    center: [0.0, 0.0],
    zoom: 1
});

var CityIcon = L.icon({
    iconUrl: 'city.png',
    iconSize:     [15, 15],
    iconAnchor:   [5, 5],
    popupAnchor:  [0, 0],
    className: 'marker'
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function setIconSize(e) {
    var i;
    var zoomLevel = map.getZoom();
    var x = zoomLevel * 2;
    var y = zoomLevel * 2;
    var iconElements = document.getElementsByClassName('marker'); 
    for (i = 0; i < iconElements.length; i++) {
       iconElements[i].style.width = Math.round(x) + 'px';
       iconElements[i].style.height = Math.round(y) + 'px';
    }
};

map.on('zoomend', setIconSize); 
setIconSize();

fetch('./ids.json').then((response) => response.json()).then((json) => {
    json.forEach(element => {
        fetch('./data/'+element).then((response) => response.json())
            .then((json) => L.geoJSON(json, {
                    style: function (feature) {
                        return {color: feature.properties.stroke, fillColor: feature.properties.fill};
                    },
                    pointToLayer: function(feature, latlng){
                        return L.marker(latlng, {icon: CityIcon});
                    }
                }).bindPopup(function (layer) {
                    return layer.feature.properties.name;
                }).addTo(map));
    });
});

