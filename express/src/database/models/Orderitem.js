module.exports = (sequelize, dataTypes) => {
    let alias = 'Orderitem';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        orderId: {
            type: dataTypes.INTEGER
        },
        itemId: {
            type: dataTypes.INTEGER
        },
        quantity: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'orderitems',
        timestamps: false,
    }
    const Orderitem = sequelize.define(alias, cols, config);

    Orderitem.associate = function(models){
        Orderitem.belongsTo(models.Order, {
            as: "order",
            foreignKey:"orderId",
        })
        
        Orderitem.belongsTo(models.Item, {
            as: "product",
            foreignKey:"itemId",
        })
    
        
        
    }

    return Orderitem;
}