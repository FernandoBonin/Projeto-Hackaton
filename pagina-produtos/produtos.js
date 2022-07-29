"use strict";

const getSearchBar = document.getElementById("searchBar");
const allCards = document.querySelectorAll(".cardProd");
const getCategory = document.getElementById("categorias");
const getBtnSearch = document.getElementById("btnSearch");
const getQuantityInput = document.querySelectorAll(".quantity");

getCategory.addEventListener("change", selectCategory);
getSearchBar.addEventListener("change", searchProd);
getBtnSearch.addEventListener("click", searchProd);

let produtos = [];

async function server() {
  const promisse = await fetch("https://api-hakc4ton.herokuapp.com/produtos");
  const data = await promisse.json();
  produtos = data;
  return data;
}
server();

function searchProd() {
  let searchBar = getSearchBar.value
    .toLowerCase()
    .replace("ó", "o")
    .replace("ã", "a")
    .replace("ç", "c")
    .replace("ú", "u");
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

let externResult;

getQuantityInput.forEach((item) => {
  item.addEventListener("change", function () {
    let divParent = this.parentElement.parentElement;
    let pElement = this.parentElement.parentElement.lastElementChild;
    let valueInputQtty = this.value;
    let checkQtty = Number(item.getAttribute("min"));

    produtos.forEach((item) => {
      let dataItem = divParent.getAttribute("data-item");
      if (dataItem == item.nome) {
        pElement.style.color = "black";
        let result = valueInputQtty * item.valor;
        let resultCurrency = result.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
        pElement.innerHTML = "Total: " + resultCurrency;

        if (valueInputQtty < checkQtty) {
          pElement.style.color = "red";
          pElement.innerHTML = "A quantidade miníma é " + checkQtty;
          return;
        }
        externResult = result;
      }
    });
  });
});

let btnSendMap = document.getElementById("btnSendMap");

btnSendMap.addEventListener("click", funcaoDeTeste);

function funcaoDeTeste() {
  const update = {
    body: externResult,
    userId: 1,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(update),
  };

  fetch("https://api-hakc4ton.herokuapp.com/novoproduto", options)
    .then((data) => {
      if (!data.ok) {
        throw Error(data.status);
      }
      return data.json();
    })
    .then((update) => {
      console.log(update);
    })
    .catch((e) => {
      console.log(e);
    });
}
