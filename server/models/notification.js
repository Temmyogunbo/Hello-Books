
export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notEmpty: true,
      },
    },
    notificationType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    seen: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unread',
    },
  });
  Notification.associate = (models) => {
    Notification.belongsTo(models.Book, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    Notification.belongsTo(models.User, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Notification;
};
