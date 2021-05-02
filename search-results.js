const urlParams = new URLSearchParams(window.location.search);
const q = urlParams.get("query");
console.log(q)

//kea21-4d62.restdb.io/rest/silfenproducts??q={"colors": {"name" : {"$in": ["green"]}}}
fetch("https://kea21-4d62.restdb.io/rest/silfenproducts?q={}&filter=" + q, {
  method: "GET",
  headers: {
    "x-apikey": "602e36c15ad3610fb5bb62b8",
  },
})
  .then((res) => res.json())
  .then((response) => {
    showProducts(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showProducts(data) {
    if (data.length >= 1) {
  console.log(data);
  data.forEach((product) => {
    showProduct(product);
  });
}


else {
    const templateTwo = document.querySelector("#noresults").content;
    const copy = templateTwo.cloneNode(true);
    document.querySelector("#empty-search").appendChild(copy);

}
}
function showProduct(product) {
    console.log(product.length)
    
  const tempProd = document.querySelector("#results").content;
  const clone = tempProd.cloneNode(true);

  clone.querySelector(".product-name").textContent = product.name;
  clone.querySelector(".product-image").src = product.images[1];

  clone.querySelector(".product-price").textContent = `${product.price} DKK`;

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
  prod.appendChild(clone);}