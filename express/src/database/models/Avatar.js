module.exports = (sequelize, dataTypes) => {
    let alias = 'Avatar';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        filename: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'avatars',
        timestamps: false,
    }
    const Avatar = sequelize.define(alias, cols, config);

    Avatar.associate = function(models){
        Avatar.hasMany(models.User, {
            as: "users",
            foreignKey:"avatarId",
            timestamps:false
        });
    }

    return Avatar;
}