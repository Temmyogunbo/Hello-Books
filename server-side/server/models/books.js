
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    quantityBorrowed: DataTypes.INTEGER
  },
  {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Books;
};