module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    ProductId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER,
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'OrderId', as: 'Order' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'Product' });
  };

  return OrderItem;
};
