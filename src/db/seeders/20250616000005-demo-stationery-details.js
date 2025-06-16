'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('stationery_details', [
      {
        product_id: 6,
        brand: 'Thiên Long',
        place_production: 'Việt Nam',
        color: 'Xanh',
        material: 'Nhựa ABS',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 7,
        brand: 'Hồng Hà',
        place_production: 'Việt Nam',
        color: 'Trắng',
        material: 'Giấy',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 8,
        brand: 'Compass',
        place_production: 'Trung Quốc',
        color: 'Bạc',
        material: 'Kim loại',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 9,
        brand: 'Ruler Pro',
        place_production: 'Việt Nam',
        color: 'Trong suốt',
        material: 'Nhựa',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('stationery_details', null, {})
  }
}
