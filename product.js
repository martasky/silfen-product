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

  btnEl = document.querySelector("#addtocart");
  // btnEl.dataset.id += product._id;

  btnEl.addEventListener("click", () => {
    CART.add(product);
    console.log(CART);
  });
}
const CART = {
  KEY: "basket",
  contents: [],
  init() {
    //_contents is a temporary string
    let _contents = localStorage.getItem(CART.KEY);

    if (_contents.length == 0) {
      //if there's anything there, turn it into JS objects, that we can access with the dot . notation
      CART.contents = JSON.parse(_contents);
      console.log("We found the cart. Wuhuuuu!!!!");
    } else {
      CART.contents = [];
      console.log("Where are you?");
    }
    //I want to update the
    //this.updateDOM(); //lacj!!! use this when we're not hardcoding the contents, and the content is read from localStorage
    CART.sync();
  },
  sync() {
    //turn CART contents array of objects into a string that we can write in localStorage
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
  },
  add(obj) {
    const index = CART.contents.findIndex((element) => element._id == obj._id);
    if (index == -1) {
      console.log(obj);
      obj.qty = 1;
      console.log(CART.contents);
      CART.contents.push(obj);
    } else {
      CART.contents[index].qty += 1;
    }
    console.log(CART.contents);
    this.sync();
  },
  update(obj) {
    //find the index of the object
    const index = CART.contents.findIndex((element) => element._id == obj._id);

    //If the qty is 0 we'll remove from the CART.contens array of objects, so that it's nol onger show in the cart
    if (obj.qty === 0) {
      //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      //1. parameter start (index in the array), 2. paramter: how many? - here 1
      CART.contents.splice(index, 1);
    } else {
      //we'll have to read the data from the input field
      /* const inputEl = document.querySelector("#fid-" + obj._id);
    CART.contents[index].qty = inputEl.valueAsNumber; */
      CART.contents[index].qty = obj.qty;
    }

    CART.sync();
  },
  // minusOne(id) {
  //   const indexObj = CART.contents.find((element) => element._id == id);
  //   indexObj.qty--;
  //   console.log(indexObj);
  //   CART.update(indexObj);
  // },
  // plusOne(id) {
  //   const indexObj = CART.contents.find((element) => element._id == id);
  //   indexObj.qty++;
  //   console.log(indexObj);
  //   CART.update(indexObj);
  // },
};

CART.init();
