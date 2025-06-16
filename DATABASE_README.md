# Database Migration cho HeyBook

## Cấu trúc Database

Project sử dụng Sequelize ORM với MySQL database. Cấu trúc bao gồm:

### Tables:
- **categories**: Danh mục sản phẩm (Sách, Văn phòng phẩm, Dụng cụ học tập)
- **book_genres**: Thể loại sách (Tiểu thuyết, Khoa học viễn tưởng, etc.)
- **products**: Sản phẩm chính
- **book_details**: Chi tiết sách (tác giả, nhà xuất bản, etc.)
- **stationery_details**: Chi tiết văn phòng phẩm (thương hiệu, chất liệu, etc.)
- **product_images**: Hình ảnh sản phẩm
- **users**: Người dùng hệ thống

## Setup Database

### Bước 1: Cấu hình môi trường

1. Copy file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

2. Cập nhật thông tin database trong file `.env`:
```env
DATABASE_NAME=heybook_db
DATABASE_PASSWORD=your_mysql_password
DATABASE_PORT=3306
APP_HOST=localhost
```

### Bước 2: Cập nhật cấu hình database

Sửa file `src/config/database.json` với thông tin MySQL của bạn:
```json
{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "heybook_db",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql"
  }
}
```

## Các lệnh Database

### Tạo database
```bash
npm run db:create
```

### Chạy migrations (tạo tables)
```bash
npm run db:migrate
```

### Chạy seeders (thêm dữ liệu mẫu)
```bash
npm run db:seed
```

### Reset database (xóa tất cả và tạo lại)
```bash
npm run db:reset
```

### Rollback migrations
```bash
# Rollback migration cuối cùng
npm run db:migrate:undo

# Rollback tất cả migrations
npm run db:migrate:undo:all
```

### Xóa dữ liệu seed
```bash
npm run db:seed:undo
```

## Quy trình Setup hoàn chỉnh

1. **Cài đặt dependencies**:
```bash
npm install
```

2. **Tạo database**:
```bash
npm run db:create
```

3. **Chạy migrations**:
```bash
npm run db:migrate
```

4. **Thêm dữ liệu mẫu** (tùy chọn):
```bash
npm run db:seed
```

5. **Khởi chạy server**:
```bash
npm run dev
```

## Dữ liệu mẫu

Sau khi chạy seeders, database sẽ có:

### Categories:
- Sách
- Văn phòng phẩm  
- Dụng cụ học tập

### Book Genres:
- Tiểu thuyết, Khoa học viễn tưởng, Lãng mạn, etc.

### Products:
- 5 sách: Harry Potter, Đắc Nhân Tâm, Sapiens, etc.
- 4 văn phòng phẩm: Bút bi, Tập vở, Compa, Thước kẻ

### Users:
- Admin: `admin@heybook.com` / `admin123`
- User 1: `user1@gmail.com` / `user123`
- User 2: `user2@gmail.com` / `user456`

## Lưu ý

- Đảm bảo MySQL server đang chạy
- Cập nhật thông tin JWT secrets trong file `.env`
- Cập nhật thông tin Cloudinary nếu sử dụng upload ảnh
- Password trong seeders đã được hash bằng bcrypt
