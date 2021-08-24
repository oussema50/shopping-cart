let items = [
    {
        id:1,
        name:"t-shirt",
        img:"images/2_1.jpg",
        price:"$110.25",
        quantity:1,
        allPrice:"$110.25"
    },
    {
        id:2,
        name:"three-piece suit",
        img:"images/13_1.jpg",
        price:"$150.40",
        quantity:1,
        allPrice:"$150.40"
    },
    {
        id:3,
        name:"blue shirt",
        img:"images/3_1.jpg",
        price:"$70.70",
        quantity:1,
        allPrice:"$70.70"
    },
    {
        id:4,
        name:"jacket",
        img:"images/10_1.jpg",
        price:"$200.50",
        quantity:1,
        allPrice:"$200.50"
    }
];
//get the shopping cart icon
const shoppingIcon = document.querySelector('.shopping-icon');
//get the shopping cart
const shoppingCart = shoppingIcon.parentElement;
//get the shopping cart list
const shoppingList = shoppingIcon.nextElementSibling.firstElementChild;
//get the total price product
const totalPriceProduct = document.querySelector(".total-product");
//get the product content
const productContent = document.querySelector('.product-content');
//get the couter item
let countItem = shoppingIcon.lastElementChild;
//Product List array
let productList = [];
//Total Price
let totalPrice = 0;
//toggle the shopping cart list

shoppingIcon.addEventListener('click',function(){
    if(shoppingList.childElementCount == 0){
        shoppingCart.classList.remove('active');
    }else
    {if(shoppingCart.classList.contains('active')){
        shoppingCart.classList.remove('active');
    }else{
        shoppingCart.classList.add('active');
    }
        
    }
    

});

//Create Product 
window.addEventListener('DOMContentLoaded',function(){
    createProduct();
   
});
//create the product in the body page 
function createProduct()
{
  const displayProduct =   items.map(function(item){
        return `<div class="product-item">
                    <img src=${item.img} alt=${item.name}>
                    <div class="product-desc">
                        <h4>${item.name}</h4>
                        <span class="product-price">${item.price}</span>
                        <div class="product-icon">
                            <button class="add-btn" onclick="addToCart(${item.id})">add to cart</button>
                            <i class="fa fa-heart-o" aria-hidden="true"></i>
                            <!-- <i class="fa fa-heart" aria-hidden="true"></i> -->
                        </div><!-- ./product-icon -->
                    </div><!-- ./product-desc -->
               </div><!-- ./product-item -->`
    });
    productContent.innerHTML = displayProduct.join('');

   //Get the heart icon
    const heartIcon = document.querySelectorAll('.product-icon i');
    //Like the favorite products
    favoriteProduct(heartIcon);
            

}
//all the products of the shopping cart list 
let allItems = [];
//add the products to the list cart
function addToCart(id)
{
    totalPrice = 0;
    //Don't dublicate the product into the cart list when click many times on the button:"add to cart"
    let chossenItem = items.find(function(ele){
        return ele.id == id;
    });
    let productItem = allItems.find(item => item.id == chossenItem.id)
    if(productItem){
        false;
    }else{
        allItems.push(chossenItem);
    }
    //add the items of the allItems Array to the shoppingList element
    shoppingList.innerHTML = allItems.map(function(item){
        return `<li>
        <img src=${item.img} alt=${item.name}>
        <div class="desc-item">
            <h4>${item.name}</h4>
            <span class="price-item">${item.price}</span>
            <div class="quantity">
                <span class="plus">+</span>
                <span class="quantity-numb">${item.quantity}</span>
                <span class="minus">-</span>
            </div><!-- ./quantity -->
        </div><!-- ./description-item -->
        <div class="remove-item" onclick="removeItem(${item.id})"> 
        <i class="fa fa-times" aria-hidden="true"></i>
        </div>
    </li>`
    }).join('');
    //how many items in the shopping list
    countItem.innerHTML = allItems.length;
    
    //trigger the function totalProduct to calculate and update the total price
    totalProduct(allItems);
    //put the total price in the totalPriceProduct element
    totalPriceProduct.innerHTML = `$${totalPrice}`;
    //get the plusIcon elements
    const plusIcon = Array.from(document.querySelectorAll('.plus'));
    //get the minusIcon elements
    const minusIcon = Array.from(document.querySelectorAll('.minus'));
    //get the quantityNumb elements
    const quantityNumb = Array.from(document.querySelectorAll('.quantity-numb'));
    // increase quantity
    plusIcon.map(function(ele,index){
        ele.addEventListener('click',function(e){
            totalPrice = 0;
            let quantityProduct = ++allItems[index].quantity;
            let priceProduct = parseFloat(allItems[index].price.slice(1)) * quantityProduct;
            //update the allPrice item in the items array and the allItems array
            items[index].allPrice = `$${priceProduct}`
            allItems[index].allPrice = `$${priceProduct}`;
            //trigger the totalProduct to calcul the total price
            totalProduct(allItems);
            //put the quantity Product into the quantityNumb element 
            quantityNumb[index].innerHTML = quantityProduct;
            //put the total price into the totalPriceProduct element 
            totalPriceProduct.innerHTML = `$${totalPrice}`;
           
        });
    });
    //decrease quantity
    minusIcon.map(function(ele,index){
        ele.addEventListener('click',function(e){
            
            if(allItems[index].quantity <= 1){
                return false;
            }else{
                totalPrice = 0;
                let quantityProduct = --allItems[index].quantity;
                let priceProduct = parseFloat(allItems[index].price.slice(1)) * quantityProduct;
                //update the allPrice item in the items array and the allItems array
                items[index].allPrice = `$${priceProduct}`
                allItems[index].allPrice = `$${priceProduct}`;
                //trigger the totalProduct to calcul the total price
                totalProduct(allItems)
                //put the quantity Product into the quantityNumb element 
                quantityNumb[index].innerHTML = quantityProduct;
                //put the total price into the totalPriceProduct element 
                totalPriceProduct.innerHTML = `$${totalPrice}`;
            }
            
        });
    });
}
//function to remove item from the shopping cart list
function removeItem(idRemove){
  allItems =  allItems.filter((item) =>{
        return item.id != idRemove; 
    });
    if(allItems.length == 0){
        shoppingList.innerHTML = "";
        //remove the active class to hidden the shopping cart list when the allItems array is empty
        shoppingCart.classList.remove('active');
        //update the coutItem 
        countItem.innerHTML = allItems.length;
    }else{
        //update the shopping cart list
        allItems.map(item =>{
           addToCart(item.id);
        });
    }
   
}

//function to like your favorite products
function favoriteProduct(likeIcon)
{
    likeIcon.forEach(function(ele){
        ele.addEventListener('click',function(e){
            if(ele.getAttribute('class') == 'fa fa-heart-o'){
                e.currentTarget.setAttribute('class','fa fa-heart');
                e.currentTarget.style.color='red';
            }else
            {
                e.currentTarget.setAttribute('class','fa fa-heart-o');
                e.currentTarget.style.color='black';
            }
        });
    });
}

//function totalPrice
function totalProduct(arr){
    for(let i = 0; i < arr.length; i++){
        totalPrice +=  parseFloat(arr[i].allPrice.slice(1));
    }
}


