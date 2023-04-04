import {menuArray} from "/Data.js"
let clone=JSON.parse(JSON.stringify(menuArray))
const menu = document.getElementById("all")
const cart = document.getElementById("alltems")
const cartscount=[0,0,0]
let total=0
const totalDom = document.getElementById("Amount")
const payDom = document.getElementById("Pay")
let formDom= document.getElementById("FormDiv")

menuArray.forEach(function(menuItem){

    menu.innerHTML += renderString(menuItem)        

})

function renderString(MI)
{
    let menuDom=
        `<div id="row">
            <div id="pic"><img src= '${MI.emoji}' height="70" width = "90"></div>
                <div id="details">
                    <h2>${MI.name}</h2>
                    <p id="ingredients">`+ ingredients(MI.ingredients)+`</p>
                    <h5> `+ cost(MI.price)+`</h5>
                </div>
                <div id="plus"><i class="fa-solid fa-plus" height="50px" data-clk= "${MI.id}"></i></div>
            </div>
        </div>`;

    return menuDom
}
function ingredients(ingr)
{
    let ingrDom= ingr.join(" , ")

   return ingrDom
}
function cost(abc)
{
    let p=''
   
    p= '$'+ abc
    return p
}
function TotalCalculation()
{
   total = cartscount[0]*menuArray[0].price + cartscount[1]*menuArray[1].price + cartscount[2]*menuArray[2].price
   totalDom.textContent = total

}
function cartItems(cartI)
{

    
    const cartStr = `<div id="cart" class = "${cartI.name}">
    <h2 id="cartname">${cartI.name}</h2>
    <div id="minus"><i class="fa-solid fa-minus" height="50px" data-min= "${cartI.name+cartI.id}"></i></div>
    <h4 id="${cartI.name}" class= "Qty">Quantity = 1 </h4>
    <h3 class= "cartprice" id="${cartI.id}">${cartI.price}</h3>
    </div>`
    
    cart.innerHTML += cartStr

    TotalCalculation()

}
function handleClickplus(plus)
{
   
    const targetObj= menuArray.filter(function(menuA){
       
        return String(menuA.id) == String(plus)
    })[0]

    cartscount[Number(plus)]++
    
    if(cartscount[Number(plus)]===1)
    {
        cartItems(targetObj)
    }
    else
    {  

        document.getElementById(`${targetObj.id}`).textContent= cartscount[Number(plus)]*targetObj.price
        document.getElementById(`${targetObj.name}`).textContent =`Quantity= ${cartscount[Number([plus])]}`
        TotalCalculation()
    }
    

}
function handleClickMinus(minus)
{
    let str= minus
    let targetID = str.slice(str.length-1)

    const targetObject = menuArray.filter(function(menu)
    {
        return String(menu.id) === String(targetID)
    })[0]

    cartscount[Number(targetID)]--

    if(cartscount[Number(targetID)] === 0)
    {
        
        let a =targetObject.name
        console.log(a)
        document.getElementsByClassName(`${targetObject.name}`).style.display ="none";
    }
    else if(cartscount[Number(targetID)] >0 )
    {
     
        document.getElementById(`${targetObject.id}`).textContent= cartscount[Number(targetID)]*targetObject.price
        document.getElementById(`${targetObject.name}`).textContent =`Quantity= ${cartscount[Number([targetID])]}`
        TotalCalculation()
    }
    else{
        return
    }
}

document.addEventListener('click', function(e)
{
    if(e.target.dataset.clk)
    {
      
      handleClickplus(e.target.dataset.clk)
      
    }
    if(e.target.dataset.min)
    {
        handleClickMinus(e.target.dataset.min)
    }

})

payDom.addEventListener('click', function()
{

    formDom.innerHTML= `

            <div id ="Formd">
            
                <form id = "details">
                    <label for ="name" id="LabelName">Name</label>
                    <input type ="text" name ="name" id="name">
                    <label for="mail" id="LabelEmail">Enter Email Adress:</label>
                    <input type="email" id= "mail"><br>
                    <label for = "adress" id="LabelAdress">Address</label><br>
                    <textarea id="adress"></textarea>
                    <button id="formsubmit">Submit</button>
                </form>

            </div>`


})



