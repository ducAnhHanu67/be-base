'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('book_details', [
      {
        product_id: 1,
        book_genre_id: 6,
        author: 'J.K. Rowling',
        translator: 'Lý Lan',
        language: 'Tiếng Việt',
        publisher: 'NXB Trẻ',
        publish_year: '2020',
        page_count: 320,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 2,
        book_genre_id: 12,
        author: 'Dale Carnegie',
        translator: 'Nguyên Phong',
        language: 'Tiếng Việt',
        publisher: 'NXB Tổng hợp TP.HCM',
        publish_year: '2019',
        page_count: 320,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 3,
        book_genre_id: 10,
        author: 'Yuval Noah Harari',
        translator: 'Nguyễn Hoài Nam',
        language: 'Tiếng Việt',
        publisher: 'NXB Thế Giới',
        publish_year: '2018',
        page_count: 512,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 4,
        book_genre_id: 1,
        author: 'Nguyễn Nhật Ánh',
        translator: '',
        language: 'Tiếng Việt',
        publisher: 'NXB Trẻ',
        publish_year: '2021',
        page_count: 268,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_id: 5,
        book_genre_id: 12,
        author: 'James Clear',
        translator: 'Đỗ Minh Châu',
        language: 'Tiếng Việt',
        publisher: 'NXB Thế Giới',
        publish_year: '2022',
        page_count: 350,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('book_details', null, {})
  }
}
