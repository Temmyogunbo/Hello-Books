export default (sequelize, DataTypes) => {
  const Book = sequelize.model('Book');
  const History = sequelize.define('History', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true
      }
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    borrowedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  History.beforeCreate((historyCreate) => {
    Book.findById(parseInt(historyCreate.dataValues.BookId, 10))
      .then((book) => {
        Book.update(
          {
            quantity: parseInt(book.quantity, 10) - 1
          },
          {
            fields: ['quantity'],
            where: {
              id: historyCreate.dataValues.BookId
            }
          }
        );
      });
  });
  History.beforeBulkUpdate((historyUpdate) => {
    Book.findById(parseInt(historyUpdate.where.BookId, 10))
      .then((book) => {
        Book.update(
          {
            quantity: parseInt(book.quantity, 10) + 1
          },
          {
            fields: ['quantity'],
            where: {
              id: book.dataValues.id,
            }
          }
        );
      });
  });
  History.associate = (models) => {
    // Will add bookId to History
    History.belongsTo(models.Book, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
    // will add userId to history, will delete and update dependencies
    // if book is deleted and updated respectively
    History.belongsTo(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return History;
};
