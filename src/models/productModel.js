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
    one: (id) => {},
    generate: (data,file) => {
        let oldData = model.read();
        let newObj = {
            id: oldData.length > 0 ? (model.read().pop().id + 1) : 1,
            name: data.name,
            description: data.description,
            category: data.category,
            image: file.filename,
            gen: parseInt(data.gen)
        };
        oldData.push(newObj);
        return oldData;
    },
    write: (data) => {
        let newJson = JSON.stringify(data, null, 2);
        return fs.writeFileSync(json, newJson, "utf8");
    },
}

module.exports = model