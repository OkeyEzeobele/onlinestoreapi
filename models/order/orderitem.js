//'use strict';
//const {
//  Model
//} = require('sequelize');
//module.exports = (sequelize, DataTypes) => {
//  class OrderItem extends Model {
//    /**
//     * Helper method for defining associations.
//     * This method is not a part of Sequelize lifecycle.
//     * The `models/index` file will call this method automatically.
//     */
//    static associate(models) {
//      // define association here
//          OrderItem.belongsTo(models.Order);
//          OrderItem.belongsTo(models.Product);

//      };
//    }
//  };
//  OrderItem.init({
//    quantity: DataTypes.INTEGER,
//    price: DataTypes.DECIMAL,
//    orderId: DataTypes.INTEGER,
//    productId: DataTypes.INTEGER
//  }, {
//    sequelize,
//    modelName: 'OrderItem',
//  });
//return OrderItem;};

'use strict';
module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL,
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
    }, {});
    OrderItem.associate = function (models) {
        OrderItem.belongsTo(models.Order);
        OrderItem.belongsTo(models.Product);
    };
    return OrderItem;
};