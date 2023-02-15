module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        trainerId: {
            type: dataTypes.INTEGER
        },
        status: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'orders',
        timestamps: false,
    }
    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models){
        Order.belongsTo(models.User, {
            as: "user",
            foreignKey:"trainerId",
            timestamps:false
        });

        Order.hasMany(models.Orderitem, {
            as: "products",
            foreignKey:"orderId",
        })
    }

    return Order;
}