'use strict';
var db = require('../models/index.js');

var product = require('../models/product/product.js');
var cart = require('../models/cart/cart.js');
var cartItem = require('../models/cart/cartitem.js');

var order = require('../models/order/order.js');
var orderItem = require('../models/order/orderitem.js');

var address = require('../models/location/address.js');

var person = require('../models/user/person.js');
var customer = require('../models/user/customer.js');

var customerAddress = require('../models/user/customeraddress.js');

var cartService = require('./cart.service.js');

var cartModel = cart(db.sequelize, db.Sequelize.DataTypes);
var cartItemModel = cartItem(db.sequelize, db.Sequelize.DataTypes);
var productModel = product(db.sequelize, db.Sequelize.DataTypes);

var orderModel = order(db.sequelize, db.Sequelize.DataTypes);
var orderItemModel = orderItem(db.sequelize, db.Sequelize.DataTypes);
var addressModel = address(db.sequelize, db.Sequelize.DataTypes);
var personModel = person(db.sequelize, db.Sequelize.DataTypes);
var customerModel = customer(db.sequelize, db.Sequelize.DataTypes);
var customerAddressModel = customerAddress(db.sequelize, db.Sequelize.DataTypes);

//Associate The Models
cartModel.associate({ CartItem: cartItemModel });
cartItemModel.associate({ Cart: cartModel, Product: productModel });

customerModel.associate({
    Address: addressModel,
    Person: personModel,
    CustomerAddress: customerAddressModel
});

orderModel.associate({ OrderItem: orderItemModel, Address: addressModel, Customer: customerModel });
orderItemModel.associate({ Order: orderModel, Product: productModel });

/* Process Checkout */
var processCheckout = function (request) {
    return personModel.create({
        firstName: request.body.firstName,
        middleName: request.body.middleName,
        lastName: request.body.lastName,
        emailAddress: request.body.email,
        isDeleted: false
    }).then(person => {
        addressModel.create({
            addressLine1: request.body.addressLine1,
            addressLine2: request.body.addressLine2,
            city: request.body.city,
            state: request.body.state,
            country: request.body.country,
            zipCode: request.body.zipCode,
            isDeleted: false
        }).then(address => {
            customerModel.create({
                personId: person.id,
                isDeleted: false
            }).then(customer => {

                customerAddressModel.create({
                    customerId: customer.id,
                    addressId: address.id
                });

                cartService.getCart(request).then(cart => {
                    if (cart) {
                        cartService.getCartItems(request).then(items => {
                            var cartTotal = cartService.getCartTotal(items);
                            var shippingCharge = 0.00;
                            var orderTotal = cartTotal + shippingCharge;

                            orderModel.create({
                                orderTotal: orderTotal,
                                orderItemTotal: cartTotal,
                                shippingCharge: shippingCharge,
                                deliveryAddressId: address.id,
                                customerId: customer.id
                            }).then(order => {
                                items.forEach(item => {
                                    orderItemModel.create({
                                        quantity: item.quantity,
                                        price: item.Product.price,
                                        orderId: order.id,
                                        productId: item.Product.id
                                    });
                                });
                            }).then(() => {
                                cartModel.destroy({ force: true, where: { id: cart[0].id } });
                            });
                        });
                    }
                });
            });
        });
    });
};


/* Exports all methods */
module.exports = {
    processCheckout: processCheckout
};