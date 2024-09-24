const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      quantity: 0
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      quantity: 0
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      quantity: 0
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      quantity: 0
    },
    {
      id: "007-bell-pepper",
      name: "bellpepper",
      price: 0.35,
      quantity: 0
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      quantity: 0
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      quantity: 0
    }
  ],
  cart: []
};

let body = document.querySelector('body')
let cartListHTML = document.getElementsByClassName('item-list cart--item-list')[0]
let addToCartButtons = document.getElementsByClassName('addCartBtn')
let totalSpan = document.getElementsByClassName('total-number')[0]
let filters = document.getElementsByClassName('filterOption')
let filterChosen = 'All'

function addEventListeners(){
  let idCounter = 0
  for(i of addToCartButtons) {
    i.addEventListener('click', addItemToCart)
    i.setAttribute('id', state.items[idCounter].id)
    idCounter++
  }
  for(i of filters) {
    i.addEventListener('click', filterItem)
  }
}

function addDataToCart(){
  cartListHTML.innerHTML = ''
  if(state.cart.length !== 0) {
    for(product of state.cart){
      if(filterChosen === 'All' || filterChosen === product.name){
        let newProduct = document.createElement('li')
        newProduct.innerHTML = `
        <img class="cart--item-icon" src="assets/icons/${product.id}.svg" alt="${product.name}"/>
        <p>${product.name}</p>
        <button class="quantity-btn remove-btn center" id=${product.name}-remove onClick='decreaseItem(event)'>-</button>
        <span class="quantity-text center">${product.quantity}</span>
        <button class="quantity-btn add-btn center" id=${product.name}-add onClick='increaseItem(event)'>+</button>`
        cartListHTML.appendChild(newProduct)
      }
    };
  }
  setTotalCost()
}

function decreaseItem(event){
  console.log(event.target.id)
  const productName = event.target.id.split('-')[0]
  const product = state.items.find((product) => product.name === productName)
  if(product.quantity <= 1){
    const index = state.cart.indexOf(product)
    state.cart.splice(index, 1)
  } 
  product.quantity--  
  addDataToCart()
}

function increaseItem(event){
  console.log(event.target.id)
  const productName = event.target.id.split('-')[0]
  const product = state.items.find((product) => product.name === productName)
  product.quantity++
  addDataToCart()
}

function addItemToCart(event) {
  console.log(event.target.id)
  const newProduct = state.items.find((product) => product.id === event.target.id)
  console.log("beep", newProduct)
  if(state.cart.includes(newProduct)) {
    state.items.find((product) => product.id === event.target.id).quantity++
  }
  else{
    newProduct.quantity++
    state.cart.push(newProduct)
  }
  addDataToCart()
}

function setTotalCost(){
  let sum = 0
  for(product of state.cart) {
    sum += (product.price * product.quantity)
  }
  totalSpan.textContent = sum.toFixed(2).toString()
}

function filterItem(event){
  filterChosen = event.target.textContent
  addDataToCart()
}

addEventListeners()