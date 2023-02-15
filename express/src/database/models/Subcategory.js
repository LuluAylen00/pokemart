module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: dataTypes.STRING
        },
        icon: {
            type: dataTypes.STRING
        },
        categoryId: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'subcategories',
        timestamps: false,
    }
    const Subcategory = sequelize.define(alias, cols, config);

    Subcategory.associate = function(models){
        Subcategory.hasMany(models.Item, {
            as: "items",
            foreignKey:"subcategoryId",
            timestamps:false
        });
        Subcategory.belongsTo(models.Category, {
            as: "category",
            foreignKey:"categoryId",
            timestamps:false
        });
    }

    return Subcategory;
}