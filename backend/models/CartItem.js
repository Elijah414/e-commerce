// models/cartItem.js
module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Carts',
          key: 'id',
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        }
      },
      
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }
    }, {
      timestamps: true,
      paranoid: true,
      
    });
  
    return CartItem;
  };
  