var map = L.map('map', {
    center: [0.0, 0.0],
    zoom: 1
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('./ids.json').then((response) => response.json()).then((json) => {
    json.forEach(element => {
        fetch('./data/'+element).then((response) => response.json())
            .then((json) => L.geoJSON(json, {
                    style: function (feature) {
                        return {color: feature.properties.fill, stroke: feature.properties.stroke};
                    }
                }).bindPopup(function (layer) {
                    return layer.feature.properties.name;
                }).addTo(map));
    });
});

