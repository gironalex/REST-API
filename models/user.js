'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required'
        },
        notEmpty: {
          msg: 'Please provide a last name'
        },
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: 'Email Address Already exists, please provide a unique address'
      },
      validate:{
        isEmail: {
          msg: 'Valid Email Address must be provided'
        },
        notNull:{
          msg: 'An email address is required'
        },
        notEmpty: {
          msg: 'Please provide a valid email address '
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'A password is required'
        },
        notEmpty:{
          msg: 'Please provide a valid password'
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'User',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  
  return User;
};