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

fetch('./ids.json').then((response) => response.json()).then((ids) => {
    ids.forEach(element => {
        fetch('./data/'+element.id+".geojson").then((response) => response.json())
            .then((geojson) => L.geoJSON(geojson, {
                    style: function (feature) {
                        return {color: feature.properties.stroke, fillColor: feature.properties.fill};
                    },
                    pointToLayer: function(feature, latlng){
                        return L.marker(latlng, {icon: CityIcon});
                    },
                    onEachFeature: function (feature, layer) {
                        if (feature.geometry.type == "Polygon") {
                            layer.bindPopup('<h1>'+feature.properties.name+'</h1>');
                        }
                    }
                }).addTo(map));
    });
});

