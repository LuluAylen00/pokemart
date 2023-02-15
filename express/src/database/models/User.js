module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        username: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatarId: {
            type: dataTypes.INTEGER
        },
        cityId: {
            type: dataTypes.INTEGER
        },
        money: {
            type: dataTypes.INTEGER
        },
        usertypeId: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'trainers',
        timestamps: false,
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.belongsTo(models.Avatar, {
            as: "avatar",
            foreignKey:"avatarId",
            timestamps:false
        });

        User.belongsTo(models.City, {
            as: "city",
            foreignKey:"cityId",
            timestamps:false
        });

        User.belongsTo(models.Usertype, {
            as: "role",
            foreignKey:"usertypeId",
            timestamps:false
        });

        User.hasMany(models.Chat, {
            as: "messages",
            foreignKey:"trainerId",
            timestamps:false
        });
        
        User.hasMany(models.Order, {
            as: "orders",
            foreignKey:"trainerId",
            timestamps:false
        });
    }

    return User;
}