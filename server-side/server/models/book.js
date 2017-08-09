module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // will add historyId to Book, will delete and update dependencies
        // if book is deleted and updated respectively
        Book.hasMany(models.History, {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });
  return Book;
};
