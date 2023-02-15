module.exports = (sequelize, dataTypes) => {
    let alias = 'Region';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'regions',
        timestamps: false,
    }
    const Region = sequelize.define(alias, cols, config);

    Region.associate = function(models){
        Region.hasMany(models.City, {
            as: "cities",
            foreignKey:"regionId",
            timestamps:false
        });
    }

    return Region;
}