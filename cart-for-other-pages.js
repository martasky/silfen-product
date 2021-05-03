const CART = {
    KEY: "basket",
    contents: [],
    init() {
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
  
      //If we have an empty array / an array with the length of 0
      if (CART.contents.length == 0) {
        document.querySelector(".cart-icon img").src = "assets/cart-icon.png";
   
      } 
      else {
          console.log("there is something")
        document.querySelector(".cart-icon img").src = "assets/cart-full.png"}
    }}