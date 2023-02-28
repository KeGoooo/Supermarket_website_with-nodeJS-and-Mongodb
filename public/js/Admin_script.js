let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
  cart.classList.toggle('active');
  login.classList.remove('active');
  navbar.classList.remove('active');
}

let login = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () => {
  login.classList.toggle('active');
  cart.classList.remove('active');
  navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  cart.classList.remove('active');
  login.classList.remove('active');
}

window.onscroll = () => {
  login.classList.remove('active');
  navbar.classList.remove('active');
  cart.classList.remove('active');
}

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});



const product = [
  {
    id: 0,
    image: 'Background.jpeg',
    title: 'test1 product',
    price: 120,
  },

  {
    id: 1,
    image: 'witcher.jpeg',
    title: 'tes2 product',
    price: 200,

  },
  {
    id: 2,
    image: 'witcher.jpeg',
    title: 'test3 product',
    price: 150,

  }];

const categories = [...new Set(product.map((item) => { return item }))]
let i = 0;
document.getElementById('root').innerHTML = categories.map((item) => {
  var { image, title, price } = item;
  return (
    `<div class ='box'>
                <div class= 'img-box'>
                    <img class='images' src= ${image}></img>
                    </div>
                <div class = 'bottom'>
                <p>${title}</p>
                <h2>$ ${price}.00</h2>` +                                                           //Here the delete button for the admin
    "<p><button class='btn btn-success' onclick = 'addtocart(" + (i++) + ")'>Add to cart</button></p>" +
    `</div>
                </div>`

  )
}).join('')

var carts = [];

function addtocart(a) {
  carts.push({ ...categories[a] });
  displaycart();
}

function delElement(a) {
  carts.splice(a, 1)
  displaycart();
}

function displaycart(a) {
  let j = 0, total = 0;
  // here we will creat a counter
  document.getElementById("count").innerHTML = carts.length;

  if (carts.length == 0) {
    document.getElementById('cartitem').innerHTML = "your cart is empty"
    document.getElementById("total").innerHTML = "$ " + 0 + ".00"
  } else {
    document.getElementById('cartitem').innerHTML = carts.map((items) => {
      var { image, title, price } = items;
      total = total + price;
      document.getElementById("total").innerHTML = "$ " + total + ".00"
      return (
        `<div class ='box'>
              <div class ='row-img'>
              <img class ='rowimg' src=${image}>
              </div>
              <p class ='productname'>- ${title}</p>
              <h2 style='font-size: 15px;'>${price}.00</h2>` +
        "<i class ='fas fa-times' onclick='delElement(" + (j++) + ")'></i></div>"
      );
    }).join('')
  }
}

