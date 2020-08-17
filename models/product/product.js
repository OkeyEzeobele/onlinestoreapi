'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Product.belongsToMany(models.Category, { through: models.ProductCategory });
        Product.belongsToMany(models.Brand, { through: models.ProductBrand });
    }
  };
  Product.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    metaDescription: DataTypes.STRING,
    metaKeywords: DataTypes.STRING,
    sku: DataTypes.STRING,
    model: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    oldPrice: DataTypes.DECIMAL,
    imageUrl: DataTypes.STRING,
    isBestseller: DataTypes.BOOLEAN,
    isFeatured: DataTypes.BOOLEAN,
    quantity: DataTypes.INTEGER,
    productStatus: { type: DataTypes.ENUM, values: ['active', 'inactive'] },
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};