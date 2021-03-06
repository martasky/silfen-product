const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("color");
const q = urlParams.get("q");


//kea21-4d62.restdb.io/rest/silfenproducts??q={"colors": {"name" : {"$in": ["green"]}}}

// kea21-4d62.restdb.io/rest/silfenproducts?q={"category": "bags"}
fetch("https://kea21-4d62.restdb.io/rest/silfenproducts?q={}&filter=" + q, {
  method: "GET",
  headers: {
    "x-apikey": "602e36c15ad3610fb5bb62b8",
  },
})
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
    showProducts(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showProducts(data) {
  document.querySelector("#catalogue-title h2").textContent = q;
  document.querySelector("a.cataloguepage").textContent = q;

  data.forEach((product) => {
    console.log(product);

    showProduct(product);
  });
}
function showProduct(product) {
  const tempProd = document.querySelector("template").content;
  const clone = tempProd.cloneNode(true);

  clone.querySelector(".product-name").textContent = product.name;
  clone.querySelector(".product-image").src = product.images[1];

  // clone.querySelector(".colors").textContent = product.colors[0].name;

  clone.querySelector(".product-price").textContent = `${product.price} DKK`;

  clone.querySelector(
    ".product-card a"
  ).href = `product-page.html?_id=${product._id}`;

  // if (product.colors.length > 1) {
  //     clone.querySelector(".color2").textContent = product.colors[1].name;
  //     clone.querySelector(".color")
  //   }

  var color_list = clone.querySelector(".product-colors");
  var ul = document.createElement("ul");
  product.colors.forEach(function (color) {
    var li = document.createElement("li");
    // li.textContent = color.name;
    li.style.backgroundColor = color.value;
    ul.appendChild(li);
  });
  color_list.appendChild(ul);

  //   btnEl = clone.querySelector("button");
  //   // btnEl.dataset.id += product._id;

  //   btnEl.addEventListener("click", () => {
  //     cart.add(product);
  //   });

  const prod = document.querySelector("#catalogue-products");
  prod.appendChild(clone);
}

// document.querySelector("#loadMore").addEventListener("click", showMore());

// function showMore() {

// }

// var currentindex = 0;
// var items = Object.values(data);
// function loadmore() {
//   var maxresult = 2;

//   for (var i = 0; i < maxresult.length; i++) {
//     if (currentindex >= items.length) {
//       $("#lmbutton").hide();
//       return;
//     }
//     $("#catalogue-products").append(
//       "<section>" + items[i + currentindex] + "</section"
//     );
//   }

//   currentindex += maxresult;
// }
