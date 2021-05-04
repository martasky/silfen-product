/* var cart = window.localStorage.length
console.log(cart)

if (cart > 0) {
  console.log ("cart full")
  document.querySelector(".cart-icon img").src = "assets/cart-full.png"
} */
const CartIcon = {
  KEY: "basket",
  contents: [],
  init() {
    let _contents = localStorage.getItem(CartIcon.KEY);
    if (_contents.length != 0) {
      CartIcon.contents = JSON.parse(_contents);
    } else {
      CartIcon.contents = [];
    }
    CartIcon.sync();
  },
  sync() {
    let _cart = JSON.stringify(CartIcon.contents);
    localStorage.setItem(CartIcon.KEY, _cart);

    CartIcon.updateDOM();

  },
  updateDOM() {

    if (CartIcon.contents.length === 0) {
      document.querySelector(".cart-icon img").src = "assets/cart-icon.png";
    } else {
      document.querySelector(".cart-icon img").src = "assets/cart-full.png";
    }
  }
}
CartIcon.init();
CartIcon.sync();