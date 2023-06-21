var map = L.map('map', {
    center: [0.0, 0.0],
    zoom: 1
});

fetch('./ids.json').then((response) => response.json()).then((json) => {
    json.forEach(element => {
        fetch('./data/'+element).then((response) => response.json()).then((json) => console.log(json));
    });
});

