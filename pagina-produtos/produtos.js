"use strict";

const getSearchBar = document.getElementById("searchBar");
const allCards = document.querySelectorAll(".cardProd");
const getCategory = document.getElementById("categorias");
const getBtnSearch = document.getElementById("btnSearch");
const getQuantityInput = document.querySelectorAll(".quantity");

getCategory.addEventListener("change", selectCategory);
getSearchBar.addEventListener("change", searchProd);
getBtnSearch.addEventListener("click", searchProd);

const produtos = [
  {
    nome: "alface",
    valor: 10,
    categoria: "hortalica",
  },
  {
    nome: "batata",
    valor: 2,
    categoria: "legume",
  },
  {
    nome: "abobora",
    valor: 0.5,
    categoria: "legume",
  },
  {
    nome: "maca",
    valor: 2,
    categoria: "fruta",
  },
  {
    nome: "arroz",
    valor: 3,
    categoria: "grao",
  },
];

function searchProd() {
  let searchBar = getSearchBar.value
    .toLowerCase()
    .replace("ó", "o")
    .replace("ã", "a")
    .replace("ç", "c");
  let idProduct = document.getElementById("prod-" + searchBar);

  allCards.forEach((item) => {
    item.classList.remove("displayNone");
  });

  if (searchBar == "") {
    return;
  }

  produtos.forEach((item) => {
    if (item.nome != searchBar) {
      idProduct = document.getElementById("prod-" + item.nome);
      idProduct.classList.add("displayNone");
    }
  });
}

function selectCategory() {
  allCards.forEach((item) => {
    item.classList.remove("displayNone");
  });

  allCards.forEach((item) => {
    let dataCategory = item.getAttribute("data-category");

    if (dataCategory != getCategory.value) {
      item.classList.add("displayNone");
    }
    if (getCategory.value == "") {
      item.classList.remove("displayNone");
    }
  });
}

getQuantityInput.forEach((item) => {
  item.addEventListener("change", function () {
    let divParent = this.parentElement.parentElement;
    let pElement = this.parentElement.parentElement.lastElementChild;
    let valueInputQtty = this.value;

    produtos.forEach((item) => {
      let dataItem = divParent.getAttribute("data-item");
      if (dataItem == item.nome) {
        let result = valueInputQtty * item.valor;
        pElement.innerHTML = "Total: R$" + result;
      }
    });
  });
});
