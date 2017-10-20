export default (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        min: 2
      }
    }
  });
  return Categories;
};
