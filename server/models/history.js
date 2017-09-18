export default (sequelize, DataTypes) => {
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
    },
  });
  History.associate = function (models) {
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
