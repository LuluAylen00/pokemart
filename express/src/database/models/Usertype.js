module.exports = (sequelize, dataTypes) => {
    let alias = 'Usertype';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        role: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'usertypes',
        timestamps: false,
    }
    const Usertype = sequelize.define(alias, cols, config);

    Usertype.associate = function(models){
        Usertype.hasMany(models.User, {
            as: "users",
            foreignKey:"usertypeId",
            timestamps:false
        });
    }

    return Usertype;
}