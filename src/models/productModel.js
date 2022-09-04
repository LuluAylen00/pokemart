const path = require('path');
const fs = require('fs');
let json = path.resolve(__dirname, '..', "data", "products.json");

const model = {
    read: () => {
        let data = fs.readFileSync(json);
        return JSON.parse(data);
    },
    all: () => {
        return model.read();
    },
    one: (id) => {
        let data = model.all();
        return data.find(p => p.id == id);
    },
    random: (q) => {
        let data = model.all();
        let currentIndex = data.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [data[currentIndex], data[randomIndex]] = [
                data[randomIndex],
                data[currentIndex],
            ];
        };
        return data.filter((p, index)=> index < q);
    },
    generate: (data,file) => {
        let oldData = model.read();
        let newObj = {
            id: oldData.length > 0 ? (model.read().pop().id + 1) : 1,
            name: data.name,
            description: data.description,
            category: data.category,
            price: parseInt(data.price),
            image: file.filename,
            gen: parseInt(data.gen)
        };
        oldData.push(newObj);
        return oldData;
    },
    update: (data,file) => {
        let products = model.all();
        let product = data;
        let productsModified = products.map(p =>{ 
            if(p.id == product.id){
                p.id = data.id;
                p.name = data.name;
                p.description = data.description;
                p.price = parseInt(data.price);
                p.category = data.category;
                p.image = file && file.filename ? file.filename : p.image;
                p.gen = parseInt(data.gen);
            }
            return p 
        });
        return productsModified;
    },
    erase: (id) => {
        let data = model.all();
        return data.filter(p => p.id != id);
    },
    write: (data) => {
        let newJson = JSON.stringify(data, null, 2);
        return fs.writeFileSync(json, newJson, "utf8");
    },
}

module.exports = model