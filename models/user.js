'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // define association here
            this.hasMany(Post, { foreignKey: 'user_id' })
        }
    }
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });


    // const attributes = {
    //     email: { type: DataTypes.STRING, allowNull: false },
    //     passwordHash: { type: DataTypes.STRING, allowNull: false },
    //     title: { type: DataTypes.STRING, allowNull: false },
    //     firstName: { type: DataTypes.STRING, allowNull: false },
    //     lastName: { type: DataTypes.STRING, allowNull: false },
    //     role: { type: DataTypes.STRING, allowNull: false }
    // };

    // const options = {
    //     defaultScope: {
    //         // exclude password hash by default
    //         attributes: { exclude: ['passwordHash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };



    return User;
    // return sequelize.define('User', attributes, options);
};