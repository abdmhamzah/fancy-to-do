'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email harus diisi'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username harus diisi'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty: {
          msg: 'Password harus diisi'
        }
      }
    },
  },
  { 
    hooks: {
      beforeCreate(user, opt){
        user.password = hashPassword(user.password)
      }
    }, sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};