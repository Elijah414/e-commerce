const Cart = sequelize.define('Cart', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,

    UserId: {
      type: DataTypes.INTEGER,
      field: 'UserId',
    }
    
  });
  