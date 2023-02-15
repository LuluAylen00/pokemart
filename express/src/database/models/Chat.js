module.exports = (sequelize, dataTypes) => {
    let alias = 'Chat';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        message: {
            type: dataTypes.STRING
        },
        date: {
            type: dataTypes.DATE
        },
        trainerId: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'chats',
        timestamps: false,
    }
    const Chat = sequelize.define(alias, cols, config);

    Chat.associate = function(models){
        Chat.belongsTo(models.User, {
            as: "trainer",
            foreignKey:"trainerId",
            timestamps:false
        });
    }

    return Chat;
}