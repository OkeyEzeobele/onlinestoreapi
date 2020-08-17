'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      metaDescription: {
        type: Sequelize.STRING
      },
      metaKeywords: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      oldPrice: {
        type: Sequelize.DECIMAL
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      isBestseller: {
        type: Sequelize.BOOLEAN
      },
      isFeatured: {
        type: Sequelize.BOOLEAN
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      productStatus:  {
        type: Sequelize.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'active'
      },
      isDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};