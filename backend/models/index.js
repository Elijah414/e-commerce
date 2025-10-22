const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

// Import model definition functions
const defineUser = require('./user');
const defineProduct = require('./product');
const defineCategory = require('./category');
const defineCartItem = require('./CartItem');

// Initialize models
const User = defineUser(sequelize, DataTypes);
const Product = defineProduct(sequelize, DataTypes);
const Category = defineCategory(sequelize, DataTypes);
const CartItem = defineCartItem(sequelize, DataTypes);

// Define cart model here
const Cart = sequelize.define('Cart', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Setup associations
User.hasMany(Cart, { onDelete: 'CASCADE' });
Cart.belongsTo(User, { onDelete: 'CASCADE' });

Category.hasMany(Product, { onDelete: 'CASCADE' });
Product.belongsTo(Category, { onDelete: 'CASCADE' });

const defineOrder = require('./order');
const defineOrderItem = require('./orderItem');

// Initialize new models
const Order = defineOrder(sequelize, DataTypes);
const OrderItem = defineOrderItem(sequelize, DataTypes);

// Define associations
Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

User.hasMany(Order, { foreignKey: 'UserId', as :'user' });
Order.belongsTo(User, { foreignKey: 'UserId', as :'user'});

// Updated Cart and CartItem associations
Cart.hasMany(CartItem, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

Product.hasMany(CartItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

// Product and Cart many-to-many relation
Product.belongsToMany(Cart, {
  through: 'Product_cart',
  foreignKey: {
    name: 'ProductID',
    allowNull: false,
  },
});

Cart.belongsToMany(Product, {
  through: 'Product_cart',
  foreignKey: {
    name: 'CartID',
    allowNull: false,
  },
});

module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
