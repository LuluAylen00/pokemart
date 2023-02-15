let cart = JSON.parse(sessionStorage.getItem('cart'))
if (!cart) {
    sessionStorage.setItem('cart', JSON.stringify([])) 
    cart = JSON.parse(sessionStorage.getItem('cart'))
}


function removeAll(){
    sessionStorage.setItem('cart', JSON.stringify([]))
}

window.addEventListener("load", async () => {
    let listadoDeProductos
    let ulMainList = document.getElementById("main-list");
    let ulCheckout = document.getElementById("checkout-list");
    let carrito = JSON.parse(sessionStorage.getItem('cart'));
    let nuevoListado = []
    let total = 0
    document.getElementById("cart-count").innerHTML = `${carrito.length} Productos`
    if (carrito.length > 0) {
        let form = document.createElement('form')
        form.setAttribute('action', '/products/buy')
        form.setAttribute('method', 'POST')
        form.setAttribute('id', 'formularioMalo')
        form.style.display = 'none'

        document.getElementById("separador").appendChild(form);

        let inputHidden = document.createElement('input');
        inputHidden.setAttribute("name", "order")
        inputHidden.type = 'hidden';
        inputHidden.value = JSON.stringify(carrito);
        form.appendChild(inputHidden);
        
        

        try {
            listadoDeProductos = await fetch(`http://localhost:3151/api/products`)
            listadoDeProductos = await listadoDeProductos.json()
            carrito.forEach(productoEnElCarrito => {
                let esteProducto = listadoDeProductos.data.find(producto => producto.id == productoEnElCarrito.id)

                // Sector 0
                let li = document.createElement('li');
                li.classList.add('each-prod');

                

                // Sector 1
                let picture = document.createElement('picture');
                let image = document.createElement('img');
                image.setAttribute('src', "/img/items/"+ esteProducto.picture);
                picture.appendChild(image);
                li.appendChild(picture);


                

                // Sector 2
                let section = document.createElement('section');
                let h2 = document.createElement('h2');
                h2.innerHTML = esteProducto.name
                section.appendChild(h2);
                let tagI = document.createElement('tagI'); 
                tagI.innerHTML = `Categoría: ${esteProducto.category.name}`
                section.appendChild(tagI);
                let span = document.createElement('span');
                section.appendChild(span);
                li.appendChild(section);

                // Sector 3
                let input = document.createElement('input')
                input.setAttribute('type', "number");
                input.setAttribute("id", "st-quantity")
                input.setAttribute("name", "st-quantity")
                input.setAttribute("min", 1)
                input.setAttribute("value", productoEnElCarrito.quantity);
                li.appendChild(input);

                // Sector 4
                let priceH2 = document.createElement('h2');
                priceH2.innerHTML = `$${esteProducto.price * productoEnElCarrito.quantity}`;
                li.appendChild(priceH2)

                // Ultimo paso
                ulMainList.appendChild(li)

                total += esteProducto.price * productoEnElCarrito.quantity

                let checkoutLi = document.createElement("li");
                let checkoutName = document.createElement("h4")
                checkoutName.innerHTML = `${esteProducto.name} x${productoEnElCarrito.quantity}`
                checkoutLi.appendChild(checkoutName);

                let checkoutPrice = document.createElement("h3")
                checkoutPrice.innerHTML = `$${esteProducto.price * productoEnElCarrito.quantity}`;
                checkoutLi.appendChild(checkoutPrice);
                ulCheckout.appendChild(checkoutLi)
            })

            let preFinalCheck = document.getElementById("pre-final-check");
            preFinalCheck.innerHTML = `$${total}`
            let preFinalTax = document.getElementById("pre-final-tax");
            preFinalTax.innerHTML = `$${total*0.1}`
            let finalCheck = document.getElementById("final-check");
            finalCheck.innerHTML = `$${total + (total*0.1)}`



        } catch (error) {
            console.log(error);
        }
    } else {
        ulMainList.innerHTML = "<h2>No hay productos</h2>"
    }
    
    
        
    
})
    


// ----------------------------------------------------------------

