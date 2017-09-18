export default (sequelize, DataTypes) => {
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
        notEmpty: true,
        isInt: true,
        isPositive(value) {
          if (parseInt(value) < 0) {
            throw new Error('Only positive value is allow');
          }
        }
      }
    }
  });
  Book.associate = function (models) {
            // will add bookId to History2, will delete and update dependencies
        // if book is deleted and updated respectively
        Book.hasMany(models.History, {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
};
  return Book;
};

