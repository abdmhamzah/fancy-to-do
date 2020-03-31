'use strict';
module.exports = (sequelize, DataTypes) => {

  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATEONLY,
    UserId: DataTypes.INTEGER
  }, {});

  Todo.associate = function(models) {
    Todo.belongsTo(models.User)
  };
  return Todo;
};