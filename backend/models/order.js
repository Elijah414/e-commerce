module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customer_name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' },
    payment_method: { type: DataTypes.STRING, defaultValue: 'Cash on Delivery' },

    // Foreign keys for drivers and packers
    driverId: { type: DataTypes.INTEGER, allowNull: true },
    packerId: { type: DataTypes.INTEGER, allowNull: true },

    // Timestamp for delivered orders
    deliveredAt: { type: DataTypes.DATE, allowNull: true },
  });

  Order.associate = (models) => {
    // Order has many OrderItems
    Order.hasMany(models.OrderItem, { foreignKey: 'OrderId', as: 'OrderItems' });

    // Order belongs to a User (customer)
    Order.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });

    // Order belongs to a Driver
    Order.belongsTo(models.Driver, { foreignKey: 'driverId', as: 'driver' });

    // Order belongs to a Packer
    Order.belongsTo(models.Packer, { foreignKey: 'packerId', as: 'packer' });
  };

  return Order;
};
