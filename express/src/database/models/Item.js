module.exports = (sequelize, dataTypes) => {
    let alias = 'Item';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: dataTypes.STRING
        },
        subcategoryId: {
            type: dataTypes.INTEGER
        },
        picture: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING
        },
        genId: {
            type: dataTypes.INTEGER
        },
    };
    let config = {
        tableName: 'items',
        timestamps: false,
    }
    const Item = sequelize.define(alias, cols, config);

    Item.associate = function(models){
        Item.belongsTo(models.Gen, {
            as: "generation",
            foreignKey:"genId",
            timestamps:false
        });
        Item.belongsTo(models.Subcategory, {
            as: "category",
            foreignKey:"subcategoryId",
            timestamps:false
        });

        Item.hasMany(models.Orderitem, {
            as: "orders",
            foreignKey:"itemId"
        })
    }

    return Item;
}