const CART = {
  KEY: "basket",
  contents: [],
  init() {
    //_contents is a temporary string
    let _contents = localStorage.getItem(CART.KEY);
    if (_contents.length != 0) {
      CART.contents = JSON.parse(_contents);
      console.log("We found the cart. Wuhuuuu!!!!");
    } else {
      CART.contents = [];
      console.log("Fuck. this shit sucks, man!!!!");
    }
    CART.sync();
  },
  sync() {
    let _cart = JSON.stringify(CART.contents);
    localStorage.setItem(CART.KEY, _cart);
    CART.updateDOM();
  },
  updateDOM() {
    const cartcontentEl = document.querySelector(".cart-content");
    cartcontentEl.innerHTML = "";

    //If we have an empty array / an array with the length of 0
    if (CART.contents.length === 0) {
      cartcontentEl.innerHTML = "<h2>Your shopping cart is empty! :(</h2>";
    } else {
      var price_sum = 0;
      CART.contents.forEach((element) => {
        price_sum += element.price * element.qty;
        // console.log(element);

        const tempItem = document.querySelector("#cart-item-template").content;
        const itemcopy = tempItem.cloneNode(true);

        const id = element._id;
        // const labelEl = itemcopy.querySelector("label");
        // labelEl.textContent = element.name;
        // labelEl.setAttribute("for", "fid-" + id);

        itemcopy.querySelector(".productwrapper img").src = element.images[1];
        itemcopy.querySelector(".productcolor").textContent = edit_color_name(
          element.colors[0].name
        );
        itemcopy.querySelector("h3").textContent = element.name;
        const minusBtn = itemcopy.querySelector(".minus");
        minusBtn.addEventListener("click", () => {
          CART.minusOne(id);
        });

        const inputEl = itemcopy.querySelector("input");
        inputEl.id += id;
        inputEl.name += id;
        inputEl.value = element.qty;

        inputEl.addEventListener("input", () => {
          const itemQty = inputEl.valueAsNumber;
          element.qty = itemQty;
          /*  console.log("element");
          console.log(element); */
          CART.update(element);
        });

        inputEl.addEventListener("focus", (e) => {
          e.target.select();
        });

        const plusBtn = itemcopy.querySelector(".plus");
        plusBtn.addEventListener("click", () => {
          CART.plusOne(id);
        });

        const priceEl = itemcopy.querySelector(".price span");
        priceEl.textContent = element.price;

        cartcontentEl.appendChild(itemcopy);
      });

      // Updating total price

      document.querySelector("#totalprice").textContent = price_sum;
    }
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
    if (CART.contents.length == 0) {
      document.querySelector("#total").remove();
      document.querySelector(".thinline").remove();
      document.querySelector(".thinline").remove();
    }

    CART.sync();
  },
  minusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty--;
    console.log(indexObj);
    CART.update(indexObj);
  },
  plusOne(id) {
    const indexObj = CART.contents.find((element) => element._id == id);
    indexObj.qty++;
    console.log(indexObj);
    CART.update(indexObj);
  },
};

CART.init();

function edit_color_name(str) {
  var arr = str.split("-");
  var result = "";
  arr.forEach(function (substr) {
    result += substr[0].toUpperCase() + substr.slice(1, substr.length) + " ";
  });
  return result;
}
