'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Category.belongsToMany(models.Product, { through: models.ProductCategory });
    }
  };
  Category.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    metaDescription: DataTypes.STRING,
    metaKeywords: DataTypes.STRING,
    categoryStatus: { type: DataTypes.ENUM, values: ['active', 'inactive'] },
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};