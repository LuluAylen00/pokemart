module.exports = (sequelize, dataTypes) => {
    let alias = 'Gen';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        games: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'generations',
        timestamps: false,
    }
    const Gen = sequelize.define(alias, cols, config);

    Gen.associate = function(models){
        Gen.hasMany(models.Item, {
            as: "items",
            foreignKey:"genId",
            timestamps:false
        });
    }

    return Gen;
}