// addtocart
const btncart=document.querySelector('.addcart');
const cart1=document.querySelector('.addc');
const btnClose=document.querySelector('#cart-close');

btncart.addEventListener('click',()=>{
    cart1.classList.add('addc-active');

});
btnClose.addEventListener('click',()=>{
    cart1.classList.remove('addc-active');

});
document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}
function loadContent(){
    let btnRemove=document.querySelectorAll('.cart-remove');
    console.log(btnRemove);
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>{
        input.addEventListener('change',changeQty);
    }); 

    let cartBtns=document.querySelectorAll('.addct');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });
    updateTotal();
}
function removeItem(){
    if(confirm('Are you sure to remove')){
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML
        itemlist=itemlist.filter(el=> el.title !=title);
        this.parentElement.remove();
        itemlist.pop(this.parentElement);
        loadContent();
    }
}
function changeQty(){
        if (isNaN (this.value) || this.value < 1){
            this.value = 1;
        }
        loadContent();
    
} 
let itemlist=[];
function addCart(){
    let food =this.parentElement;
    let title=food.querySelector('.foodtitle').innerHTML;
    let price=food.querySelector('.foodprice').innerHTML;
    let imgSrc=this.parentElement.querySelector('#img2').src;
    let newProduct={title,price,imgSrc}
    if (itemlist.find((el)=>el.title == newProduct.title)){
        alert("Product already added in cart");
        return;
    }
    else{
        itemlist.push(newProduct);
    }
    let newProductElement=createCartProduct(title,price,imgSrc);
    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();

}

function createCartProduct(title,price,imgSrc){
    return`
        <div class="cartbox">
            <img src="${imgSrc}" class="cart-img" />
            <div class="detail-box">
                <div class="cart-food-title">${title} </div>
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">${price}</div>
                </div>
                <input type="number" value="1" class="cart-quantity" >
            </div>
            <i class="fa fa-trash cart-remove"></i>
        </div>
    `;
}

function updateTotal(){
    const cartItems=document.querySelectorAll('.cartbox');
    const totalValue=document.querySelector('.total-price');
    let total=0;
    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText= "Rs." + (price*qty);
    });
    totalValue.innerHTML='Rs' + total;


const cartCount=document.querySelector('.cart-count');
let count= itemlist.length;
cartCount.innerHTML=count;
if(count==0){
    cartCount.style.display ="none";
}
else{
    cartCount.style.display ="block";
}
}
