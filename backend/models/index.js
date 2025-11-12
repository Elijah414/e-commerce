const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

// Import model definitions
const defineUser = require('./user');
const defineProduct = require('./product');
const defineCategory = require('./category');
const defineCartItem = require('./CartItem');
const defineOrder = require('./order');
const defineOrderItem = require('./orderItem');
const defineDriver = require('./driver');
const definePacker = require('./packer');

// Initialize models
const User = defineUser(sequelize, DataTypes);
const Product = defineProduct(sequelize, DataTypes);
const Category = defineCategory(sequelize, DataTypes);
const CartItem = defineCartItem(sequelize, DataTypes);
const Order = defineOrder(sequelize, DataTypes);
const OrderItem = defineOrderItem(sequelize, DataTypes);
const Driver = defineDriver(sequelize, DataTypes);
const Packer = definePacker(sequelize, DataTypes);

// Cart model
const Cart = sequelize.define('Cart', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true, paranoid: true });

// ------------------
// Associations
// ------------------

// User ↔ Cart
User.hasMany(Cart, { onDelete: 'CASCADE' });
Cart.belongsTo(User, { onDelete: 'CASCADE' });

// Category ↔ Product
Category.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(Category, { onDelete: 'CASCADE' });

// Order ↔ OrderItem
Order.hasMany(OrderItem, { foreignKey: 'OrderId', as: 'OrderItems', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'OrderId', as: 'Order' });

// User ↔ Order
User.hasMany(Order, { foreignKey: 'UserId', as: 'Orders' });
Order.belongsTo(User, { foreignKey: 'UserId', as: 'user' });

// OrderItem ↔ Product
Product.hasMany(OrderItem, { foreignKey: 'ProductId', as: 'OrderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'ProductId', as: 'Product' });

// Cart ↔ CartItem
Cart.hasMany(CartItem, { foreignKey: 'CartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'CartId' });

// Product ↔ CartItem
Product.hasMany(CartItem, { foreignKey: 'ProductId', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'ProductId' });

// Product ↔ Cart many-to-many
Product.belongsToMany(Cart, { through: 'Product_cart', foreignKey: 'ProductId' });
Cart.belongsToMany(Product, { through: 'Product_cart', foreignKey: 'CartId' });

// Driver ↔ Order
Driver.hasMany(Order, { foreignKey: 'driverId', as: 'Orders' });
Order.belongsTo(Driver, { foreignKey: 'driverId', as: 'driver' });

// Packer ↔ Order
Packer.hasMany(Order, { foreignKey: 'packerId', as: 'Orders' });
Order.belongsTo(Packer, { foreignKey: 'packerId', as: 'packer' });

module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Driver,
  Packer,
};
