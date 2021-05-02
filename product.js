const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("_id");

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
    showProduct(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showProduct(product) {
  document.querySelector(".producttitle").textContent = product.name;
  document.querySelector("#product-title").textContent = product.name;
  document.querySelector(".product-description").textContent =
    product.description;
  document.querySelector(".product-material").textContent = product.material;
  document.querySelector(".product-measurements").textContent =
    product.dimensions;

  document.querySelector(".product-img img").src = product.images[0];

  document.querySelector(".small-product-img img").src = product.images[1];
  document.querySelector(".small-product-img2 img").src = product.images[1];
  document.querySelector(".small-product-img3 img").src = product.images[1];

  // document.querySelector(".colors").textContent = product.colors[0].name;

  document.querySelector(".product-price").textContent = `${product.price} DKK`;

  // if (product.colors.length > 1) {
  //     document.querySelector(".color2").textContent = product.colors[1].name;
  //     document.querySelector(".color")
  //   }

  var color_list = document.querySelector(".product-colors");
  var ul = document.createElement("ul");
  product.colors.forEach(function (color) {
    var li = document.createElement("li");
    // li.textContent = color.name;
    li.style.backgroundColor = color.value;
    ul.appendChild(li);
  });
  color_list.appendChild(ul);

  //   btnEl = document.querySelector("button");
  //   // btnEl.dataset.id += product._id;

  //   btnEl.addEventListener("click", () => {
  //     cart.add(product);
  //   });
}
