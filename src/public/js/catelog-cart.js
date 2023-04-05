//Cart

let cartIcon = document.querySelector('#img-buynow');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#cart-close');
//open Cart
cartIcon.onclick = () => {
    cart.classList.add('active');
    document.querySelector("#mini-cart").classList.add("active");
};

//close Cart
closeCart.onclick = () => {
    cart.classList.remove('active');
    document.querySelector("#mini-cart").classList.remove("active");
};

//Cart Working js
if(document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded" , ready); 
}else {
    ready();
}

//Making function

function ready() {
    //remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    
    for(var i =0 ; i < removeCartButtons.length; i++)
    {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
    }
//Quantity Changes
var quantityInputs = document.getElementsByClassName('cart-quantity');
for (var i =0 ; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener('change' ,quantityChanged );
}
//Add to Cart
var addCart = document.getElementsByClassName('img-buynow');
for (var i =0 ; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click" , addCartClicked);
}

//Buy button work

document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}   


//Buy Button
function buyButtonClicked(){
    alert('Your Order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
//remove items from cart
function  removeCartItem(event){

    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//quantity Changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }
    updateTotal();
}

//add to cart
function addCartClicked (event) {
    var button = event.target;
    var shopProducts = button.parentElement;

    //need to fix now innerText
    var title = shopProducts.getElementsByClassName('product-item-name')[0].innerText;
    var price = shopProducts.getElementsByClassName('product-item-price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-avatar')[0].src;
    addProductToCart(title, price,  productImg);
    updateTotal();
}

//function add product to cart

function addProductToCart(title, price,  productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-tilte');
    for ( var i = 0 ; i < cartItemsNames.length; i++) {
        alert("You have already add this item to cart !");
        return;
    }
    
}



//update total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total =0;
    for(var i = 0 ; i < cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElememt = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElememt.value;
        total = total + (price * quantity);
    }
        //if price Contain some cents value
        total = Math.round(total +100)/100;
        document.getElementsByClassName('total-price')[0].innerText = '$' +total;
    
}