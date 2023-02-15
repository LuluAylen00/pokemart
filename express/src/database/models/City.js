module.exports = (sequelize, dataTypes) => {
    let alias = 'City';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name: {
            type: dataTypes.STRING
        },
        regionId: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'cities',
        timestamps: false,
    }
    const City = sequelize.define(alias, cols, config);

    City.associate = function(models){
        City.belongsTo(models.Region, {
            as: "region",
            foreignKey:"regionId",
            timestamps:false
        });
    }

    return City;
}