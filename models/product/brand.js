'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Brand.belongsToMany(models.Product, { through: models.ProductBrand })
    }
  };
  Brand.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    metaDescription: DataTypes.STRING,
    metaKeywords: DataTypes.STRING,
    brandStatus: { type: DataTypes.ENUM, values: ['active', 'inactive'] },
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};