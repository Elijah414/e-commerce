module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order_status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },
    payment_method: {
      type: DataTypes.STRING,
      defaultValue: 'Cash on Delivery',
    }
    
  });

  return Order;
};
