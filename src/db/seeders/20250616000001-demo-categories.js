'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Sách',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Văn phòng phẩm',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Dụng cụ học tập',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {})
  }
}
