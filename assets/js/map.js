"use strick";

let valueProduct;
let categoryProducer = {};
let lat;
let long;
let map;
let directionsService;
let directionsRenderer;
let placeService;
let addressAutoComplete2;
let kmText;
let kmValue;
async function getValueProduct() {
  const response = await fetch(
    "https://api-hakc4ton.herokuapp.com/novoproduto"
  );
  const a = await response.json();
  valueProduct = a[a.length - 1];
}
async function products() {
  const promisse = await fetch("https://api-hakc4ton.herokuapp.com/produtos");
  const data = await promisse.json();
  produtos = data;
  await getValueProduct();
  // console.log(valueProduct);
  produtos.forEach((item) => {
    if (item.nome == valueProduct.body.getProducerCategory) {
      categoryProducer.latitude = item.latitude;
      categoryProducer.longitude = item.longitude;
    }
  });
  return data;
}
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
  addressAutoComplete2 = new google.maps.places.Autocomplete(adress2);
}

function calcRota() {
  const valueProductNumber = Number(valueProduct.body.externResult);
  const location1 = categoryProducer;
  let location2 = addressAutoComplete2.getPlace().geometry.location;
  let origin = new google.maps.LatLng(location1.latitude, location1.longitude);
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
  products();
  getLocation();
});
