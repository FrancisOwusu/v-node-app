'use strict';
const {
    Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' })
        }
    }
    Post.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        title: DataTypes.STRING,
        //user_id: DataTypes.INTEGER,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'users',
                    schema: 'schema'
                },
                key: 'id'
            },
            allowNull: false
        },
        content: {
            allowNull: false,
            type: DataTypes.TEXT
        },

        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};