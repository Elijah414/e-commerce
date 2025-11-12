module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, 
    phone: { type: DataTypes.STRING },
  });

  Driver.associate = (models) => {
    Driver.hasMany(models.Order, { foreignKey: 'driverId', as: 'orders' });
  };

  return Driver;
};
