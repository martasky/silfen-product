const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

//kea21-4d62.restdb.io/rest/silfenproducts??q={"colors": {"name" : {"$in": ["green"]}}}
fetch("https://kea21-4d62.restdb.io/rest/silfenproducts/" + id, {
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
  console.log(data);

  data.forEach((product) => {
    console.log(product);

    showProduct(product);
  });
}
function showProduct(product) {
  const tempProd = document.querySelector("template").content;
  const clone = tempProd.cloneNode(true);

  clone.querySelector(".product-name").textContent = product.name;
  clone.querySelector(".product-name").textContent = product.name;
  clone.querySelector(".product-image").src = product.images[1];

  // clone.querySelector(".colors").textContent = product.colors[0].name;

  clone.querySelector(".product-price").textContent = `${product.price} DKK`;

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
