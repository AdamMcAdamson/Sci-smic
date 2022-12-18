const { globalAgent } = require("http");
const { WebGLColorBuffer } = require("three");

window.onload = function() {
    apiQuery();
  };

function apiQuery() {
    const base_url = "https://earthquake.usgs.gov/fdsnws/event/1/"
    const method = "query";
    var query = "?format=geojson&starttime=2022-12-17&orderby=magnitude"
    fetch(base_url+method+query)
    .then((res) => res.json())
    .then((data) => {
        var count = data.metadata.count > 10 ? 10: data.metadata.count;
        console.log("count: " + count);
        for(let i = 0; i < count; i++){
            globe.addPin(data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0], data.features[i].properties.title);
        }
    });
}