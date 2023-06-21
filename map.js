var map = L.map('map', {
    center: [0.0, 0.0],
    zoom: 1
});

var ids;
await fetch('./ids.json').then((response) => response.json()).then((json) => ids = json);

ids.forEach(element => {
    fetch('./data/'+element).then((response) => response.json()).then((json) => console.log(json));
});