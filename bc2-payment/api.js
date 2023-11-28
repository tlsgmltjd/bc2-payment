const menu = document.querySelector("#menu");
const count = document.querySelector("#count");
const num = document.querySelector("#num");
const btn = document.querySelector("#btn");

let interval;

let menuData;
let countData;

let path = window.location.pathname;

if (path == "/" || path == "/index.html") {
  startInterval();
}

if (path == "/payment.html") {
  setData();
}

function startInterval() {
  interval = setInterval(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((json) => {
        if (json && json.type == "pay") {
          location.replace("payment.html");
          clearInterval(interval);
        }
      })
      .catch((error) => console.log(error));
  }, 500);
}

function setData() {
  fetch("http://localhost:3000")
    .then((response) => response.json())
    .then((json) => {
      menu.innerText = json.menu;
      count.innerText = json.quantity;
    })
    .catch((error) => console.log(error));
}

function clear() {
  menu.innerText = menuData;
  count.innerText = countData;
  clearInterval(interval);
}

btn.addEventListener("click", function () {
  fetch("http://localhost:3000", { method: "DELETE" });
});
