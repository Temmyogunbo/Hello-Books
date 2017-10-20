module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });
  Role.associate = (models) => {
    Role.hasMany(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Role;
};
