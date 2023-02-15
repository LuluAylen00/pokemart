let cart = JSON.parse(sessionStorage.getItem('cart'))
if (!cart) {
    sessionStorage.setItem('cart', JSON.stringify([])) 
    cart = JSON.parse(sessionStorage.getItem('cart'))
}

let q = 1;
let input = document.getElementById("qInput");
let status = document.getElementById("quantityStatus");

function check(){
    let carro = JSON.parse(sessionStorage.getItem('cart'));
    let id = document.getElementById("idInput").value;
    let element = carro.find(p => p.id == id)
    if (element) {
        q = element.quantity;
        input.setAttribute("value", q)
        status.innerHTML = q
    }
}

function addItem(itemId, quantity){
    if (cart.find(p => p.id == itemId)) {
        let nuevoCart = []
        cart.forEach(pCarrito => {
            if (pCarrito.id == itemId) {
                pCarrito = {
                    id: pCarrito.id,
                    quantity: quantity
                }
            }
            nuevoCart.push(pCarrito)
        })
        sessionStorage.setItem('cart', JSON.stringify(nuevoCart))
    } else {
        let objetoAAgregar = {
            id: itemId,
            quantity: quantity
        };
        cart.push(objetoAAgregar);
        console.log(cart);
        sessionStorage.setItem('cart', JSON.stringify(cart))
    }
    console.log(JSON.parse(sessionStorage.getItem('cart')));
}

function removeItem(itemId){
    let newData = cart.filter(product => product.id != itemId)
    q = 1
    input.setAttribute("value", q)
    status.innerHTML = q
    sessionStorage.setItem('cart', JSON.stringify(newData))
}

function sumar(){
    q++
    input.setAttribute("value", q)
    status.innerHTML = q
}

function restar(){
    q--
    input.setAttribute("value", q)
    status.innerHTML = q
}

window.addEventListener('load',(e) => {
    document.getElementById("addToCart").addEventListener("click",() => {
        window.location.reload();
    })
})