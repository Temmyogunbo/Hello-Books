export default (sequelize, DataTypes) => {

  const Book = sequelize.define('Book', {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    imagePublicId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
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
          if (parseInt(value, 10) < 0) {
            throw new Error('Only positive value is allow');
          }
        }
      }
    }
  });
  Book.associate = (models) => {
    Book.belongsTo(models.Categories, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: 'category',
      targetKey: 'category'
    });
  };
  return Book;
};

