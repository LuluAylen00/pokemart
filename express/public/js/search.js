window.addEventListener('load', async function(){
    let data = {}
    try {
        let prod = await fetch("http://localhost:3151/api/products");
        let prodJson = await prod.json();
        data.products = prodJson.data;

        let cat = await fetch("http://localhost:3151/api/subcategories");
        let catJson = await cat.json();
        data.categories = catJson.data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }

    let searchInput = document.getElementById("search");
    let searchDiv = document.getElementById("search-div");
    
    let searchCatSect = document.getElementById("search-cat-sect");
    let searchProdSect = document.getElementById("search-prod-sect");
    let searchRelatedSect = document.getElementById("search-related-sect");

    searchInput.addEventListener('input', function(e){
        function compare(a, b) {
            return String(a).toLocaleLowerCase().trim().includes(String(b).toLocaleLowerCase().trim());
        }

        if(e.target.value.length > 1){
            searchDiv.classList.add("display");
            let searchCatDiv = document.getElementById("search-cat-div");
            searchCatSect.innerHTML = "";

            let searchProdDiv = document.getElementById("search-prod-div");
            searchProdSect.innerHTML = "";

            let searchRelatedDiv = document.getElementById("search-related-div");
            searchRelatedSect.innerHTML = "";

            function createCategory(category) {
                let element = document.createElement("a");
                element.setAttribute("href", `/product/detail/${category.name}`);
                let image = document.createElement("img");
                image.setAttribute("src", `/img/items/${category.icon}`);
                let text = document.createElement("p");
                text.innerText = category.name;
                element.appendChild(image)
                element.appendChild(text)
                return element
            }

            function doesSomeone(data){
                let acc = 0
                data.forEach(el => {
                    if (compare(el.name, e.target.value)) {
                        acc++
                    }
                })
                return acc > 0
            }

            if (doesSomeone(data.categories)) {
                let title = document.createElement("h3")
                title.setAttribute("id", "search-cat-title")
                title.innerText = "Categorías"
                searchCatSect.appendChild(title)
    
                let div = document.createElement("div")
                div.setAttribute("id", "search-cat-div")
                searchCatSect.appendChild(div)
                searchCatDiv = document.getElementById("search-cat-div");
            } else {
                searchCatSect.innerText = ""
            }

            data.categories.forEach((cat) => {
                if (compare(cat.name, e.target.value)){
                    searchCatDiv.appendChild(createCategory(cat))
                }
            })

            if (doesSomeone(data.products)) {
                let title = document.createElement("h3")
                title.innerText = "Productos"
                searchProdSect.appendChild(title)
    
                let div = document.createElement("div")
                div.setAttribute("id", "search-prod-div")
                searchProdSect.appendChild(div)
                searchProdDiv = document.getElementById("search-prod-div");
            } else {
                searchProdSect.innerText = ""
            }

            function createProduct(product) {
                let element = document.createElement("a");
                element.setAttribute("href", `/product/detail/${product.id}`);
                let image = document.createElement("img");
                image.setAttribute("src", `/img/items/${product.picture}`);
                let text = document.createElement("p");
                text.innerText = product.name;
                let price = document.createElement("h4");
                price.innerText = `$${product.price} c/u`
                element.appendChild(image)
                element.appendChild(text)
                element.appendChild(price)
                return element
            }

            let products = []
            data.products.forEach(function(product){
                if (compare(product.name, e.target.value)){
                    products.push(product)
                    searchProdDiv.appendChild(createProduct(product));
                }
            })

            

            

            function isNotAdded(originalList, thatOne){
                let data = originalList.find(p => p.id == thatOne.id)
                if (data) {
                    return false
                } else {
                    return true
                }
            }

            function doesSomeoneRel(data){
                let acc = 0
                data.forEach(el => {
                    if (compare(el.description, e.target.value) && isNotAdded(products, el)) {
                        acc++
                    }
                })
                console.log("acc > 0", acc>0);
                return acc > 0
            }

            if (doesSomeoneRel(data.products)) {
                let title = document.createElement("h3")
                title.setAttribute("id", "search-related-title")
                title.innerText = "Relacionados"
                searchRelatedSect.appendChild(title)
    
                let div = document.createElement("div")
                div.setAttribute("id", "search-related-div")
                searchRelatedSect.appendChild(div)
                searchRelatedDiv = document.getElementById("search-related-div");
            } else {
                searchRelatedSect.innerText = ""
            }

            data.products.forEach(function(product){
                if (compare(product.description, e.target.value) && isNotAdded(products, product)){
                    searchRelatedDiv.appendChild(createProduct(product));
                }
            })

        } else {
            searchDiv.classList.remove("display");
        }
    })

})