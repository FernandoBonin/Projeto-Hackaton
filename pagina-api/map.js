"use strick";

let valueProduct;
async function testeTeste() {
  const response = await fetch(
    "https://api-hakc4ton.herokuapp.com/novoproduto"
  );
  const a = await response.json();
  valueProduct = a[a.length - 1];
}

let lat;
let long;
let map;
let directionsService;
let directionsRenderer;
let placeService;
let addressAutoComplete1;
let addressAutoComplete2;
let kmText;
let kmValue;
const adress1 = document.getElementById("inputAddress1");
const adress2 = document.getElementById("inputAddress2");
const insertKmText = document.getElementById("insertKmText");
const insertKmValue = document.getElementById("insertTotal");

function getLocation() {
  if (!navigator.geolocation) return null;

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    initMap();
  });
}

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  let uluru = { lat: lat, lng: long };
  map = new google.maps.Map(document.getElementById("map"), {
    center: uluru,
    zoom: 15,
  });
  let marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
  directionsRenderer.setMap(map);
  addressAutoComplete1 = new google.maps.places.Autocomplete(adress1);
  addressAutoComplete2 = new google.maps.places.Autocomplete(adress2);
}

function calcRota() {
  const valueProductNumber = Number(valueProduct.body);
  let location1 = addressAutoComplete1.getPlace().geometry.location;
  let location2 = addressAutoComplete2.getPlace().geometry.location;
  let origin = new google.maps.LatLng(location1.lat(), location1.lng());
  let destination = new google.maps.LatLng(location2.lat(), location2.lng());
  let request = {
    origin: origin,
    destination: destination,
    travelMode: "DRIVING",
  };

  directionsService.route(request, (response, status) => {
    if (status == "OK") {
      kmText = response.routes[0].legs[0].distance.text;
      kmValue = response.routes[0].legs[0].distance.value;
      directionsRenderer.setDirections(response);

      let resultKm = (kmValue / 1000) * 5 + valueProductNumber;
      var resultCurrency = resultKm.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      insertKmText.innerHTML = "O percurso tem " + kmText;
      insertKmValue.innerHTML =
        "O valor total somando o frete e o valor do produto é: " +
        resultCurrency;
    }
  });
}
document.addEventListener("DOMContentLoaded", function (e) {
  getLocation();
  testeTeste();
});
