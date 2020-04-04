'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Todo extends Model {}

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          messege: 'Title harus diisi'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validation: {
        notEmpty: {
          messege: 'Description harus diisi'
        }
      }
    },
    status:DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY, 
      validation: {
        isDate: {
          args: true,
          messege: 'Due Date harus merupakan tanggal'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize });

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};