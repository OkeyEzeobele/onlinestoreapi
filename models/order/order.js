'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Order.hasMany(models.OrderItem);
        Order.belongsTo(models.Address);
        Order.belongsTo(models.Customer);
    }
  };
  Order.init({
    orderTotal: DataTypes.DECIMAL,
    orderItemTotal: DataTypes.DECIMAL,
    shippingCharge: DataTypes.DECIMAL,
    orderStatus: { type: DataTypes.ENUM, values: ['Canceled', 'Submitted', 'Completed', 'Processing'] },
    deliveryAddressId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};