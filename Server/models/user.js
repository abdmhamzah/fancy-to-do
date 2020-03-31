'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    } 
  });

  User.associate = function(models) {
    User.hasMany(models.Todo)
  };
  return User;
};