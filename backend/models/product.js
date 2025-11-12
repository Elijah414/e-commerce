module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER, // foreign key
  });

  Product.associate = (models) => {
    // Link to Category
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'Category',
    });

    // Link to OrderItem
    Product.hasMany(models.OrderItem, {
      foreignKey: 'ProductId',
      as: 'OrderItems',
    });
  };

  return Product;
};
