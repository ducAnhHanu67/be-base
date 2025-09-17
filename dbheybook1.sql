-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 17, 2025 lúc 06:46 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dbheybook`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `recipient_name` varchar(255) NOT NULL COMMENT 'Tên người nhận',
  `recipient_email` varchar(255) NOT NULL COMMENT 'Email người nhận',
  `recipient_phone` varchar(20) NOT NULL COMMENT 'Số điện thoại người nhận',
  `address` text NOT NULL COMMENT 'Địa chỉ chi tiết',
  `is_default` tinyint(1) DEFAULT 0 COMMENT 'Địa chỉ mặc định',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_genres`
--

CREATE TABLE `book_genres` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `book_genres`
--

INSERT INTO `book_genres` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Tiểu thuyết', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(2, 'Khoa học viễn tưởng', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(3, 'Lãng mạn', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(4, 'Trinh thám', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(5, 'Kinh dị', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(6, 'Phiêu lưu', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(7, 'Tâm lý học', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(8, 'Kinh tế', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(9, 'Công nghệ', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(10, 'Lịch sử', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(11, 'Văn học cổ điển', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(12, 'Self-help', '2025-06-26 13:17:52', '2025-06-26 13:17:52'),
(13, 'Thiếu nhi', '2025-06-26 13:17:52', '2025-06-26 13:17:52');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `final_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `coupon_id` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','ABANDONED','CONVERTED') DEFAULT 'ACTIVE',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `total_amount`, `discount_amount`, `final_amount`, `coupon_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 485000.00, 48500.00, 436500.00, 1, 'ACTIVE', '2025-06-26 13:18:04', '2025-06-26 13:18:04'),
(2, 3, 320000.00, 0.00, 320000.00, NULL, 'ACTIVE', '2025-06-26 13:18:04', '2025-06-26 13:18:04'),
(3, 2, 650000.00, 50000.00, 600000.00, 2, 'CONVERTED', '2024-11-15 00:00:00', '2024-11-16 00:00:00'),
(4, 3, 180000.00, 0.00, 180000.00, NULL, 'ABANDONED', '2024-10-20 00:00:00', '2024-10-25 00:00:00'),
(5, 4, 0.00, 0.00, 0.00, NULL, 'ACTIVE', '2025-06-28 18:18:36', '2025-06-28 18:19:39'),
(6, 5, 236300.00, 0.00, 236300.00, NULL, 'ACTIVE', '2025-06-29 23:19:43', '2025-07-03 00:03:48'),
(7, 6, 0.00, 0.00, 0.00, NULL, 'ACTIVE', '2025-07-06 09:47:58', '2025-07-06 09:47:58'),
(8, 7, 0.00, 0.00, 0.00, NULL, 'ACTIVE', '2025-09-09 14:46:13', '2025-09-10 13:23:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL COMMENT 'Price at the time of adding to cart',
  `discount` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Discount percentage at the time of adding to cart',
  `total_price` decimal(10,2) NOT NULL COMMENT 'quantity * unitPrice * (100 - discount) / 100',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `quantity`, `unit_price`, `discount`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, 120000.00, 0.00, 240000.00, '2025-06-26 13:18:06', '2025-06-26 13:18:06'),
(2, 1, 3, 1, 245000.00, 0.00, 245000.00, '2025-06-26 13:18:06', '2025-06-26 13:18:06'),
(3, 2, 6, 1, 85000.00, 0.00, 85000.00, '2025-06-26 13:18:06', '2025-06-26 13:18:06'),
(4, 2, 2, 1, 235000.00, 0.00, 235000.00, '2025-06-26 13:18:06', '2025-06-26 13:18:06'),
(7, 6, 4, 1, 85000.00, 0.00, 85000.00, '2025-07-02 01:38:41', '2025-07-03 00:03:48'),
(8, 6, 2, 2, 89000.00, 15.00, 151300.00, '2025-07-02 23:07:02', '2025-07-02 23:55:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'ROBOT HÚT BỤI', '2025-06-26 13:17:50', '2025-09-08 10:24:45'),
(2, 'MÁY HÚT BỤI CẦM TAY', '2025-06-26 13:17:50', '2025-09-08 10:25:00'),
(3, 'ROBOT LAU KÍNH (WINBOT)', '2025-06-26 13:17:50', '2025-09-08 10:25:16'),
(4, 'THIẾT BỊ GIA DỤNG', '2025-06-26 13:17:50', '2025-09-08 10:25:31'),
(5, 'TIVI, ÂM THANH', '2025-09-08 22:00:55', '2025-09-08 22:00:55'),
(6, 'THIẾT BỊ SỨC KHỎE', '2025-09-08 22:01:02', '2025-09-08 22:01:02'),
(7, 'PHỤ KIỆN', '2025-09-08 22:01:10', '2025-09-08 22:01:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type` enum('PERCENTAGE','FIXED_AMOUNT') NOT NULL DEFAULT 'PERCENTAGE',
  `value` decimal(10,2) NOT NULL,
  `minOrderAmount` decimal(10,2) DEFAULT 0.00,
  `maxDiscountAmount` decimal(10,2) DEFAULT NULL,
  `usageLimit` int(11) DEFAULT NULL,
  `usedCount` int(11) NOT NULL DEFAULT 0,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `name`, `description`, `type`, `value`, `minOrderAmount`, `maxDiscountAmount`, `usageLimit`, `usedCount`, `startDate`, `endDate`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'WELCOME10', 'Giảm giá chào mừng thành viên mới', 'Giảm 10% cho đơn hàng đầu tiên, áp dụng cho đơn hàng từ 200,000đ', 'PERCENTAGE', 10.00, 200000.00, 50000.00, 100, 15, '2024-01-01 00:00:00', '2025-12-31 00:00:00', 1, '2025-06-26 13:18:01', '2025-06-26 13:18:01'),
(2, 'SAVE50K', 'Giảm giá cố định 50,000đ', 'Giảm trực tiếp 50,000đ cho đơn hàng từ 500,000đ', 'FIXED_AMOUNT', 50000.00, 500000.00, NULL, 50, 8, '2024-06-01 00:00:00', '2025-06-30 00:00:00', 1, '2025-06-26 13:18:01', '2025-06-26 13:18:01'),
(3, 'SUMMER2024', 'Khuyến mãi hè 2024', 'Giảm 15% cho tất cả sản phẩm sách, áp dụng cho đơn hàng từ 300,000đ', 'PERCENTAGE', 15.00, 300000.00, 100000.00, 200, 45, '2024-06-01 00:00:00', '2024-08-31 00:00:00', 0, '2025-06-26 13:18:01', '2025-06-26 13:18:01'),
(4, 'FREESHIP', 'Miễn phí vận chuyển', 'Giảm 30,000đ phí vận chuyển cho đơn hàng từ 400,000đ', 'FIXED_AMOUNT', 30000.00, 400000.00, NULL, NULL, 127, '2024-01-01 00:00:00', '2025-12-31 00:00:00', 1, '2025-06-26 13:18:01', '2025-06-26 13:18:01'),
(5, 'STUDENT20', 'Ưu đãi sinh viên', 'Giảm 20% dành riêng cho sinh viên, áp dụng cho đơn hàng từ 150,000đ', 'PERCENTAGE', 20.00, 150000.00, 80000.00, 300, 89, '2024-09-01 00:00:00', '2025-05-31 00:00:00', 1, '2025-06-26 13:18:01', '2025-06-26 13:18:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `flashsales`
--

CREATE TABLE `flashsales` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `flash_price` decimal(15,2) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `flashsales`
--

INSERT INTO `flashsales` (`id`, `product_id`, `flash_price`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(1, 18, 8999.00, '2025-09-07 10:29:00', '2025-09-16 10:29:00', '2025-09-08 11:18:02', '2025-09-08 21:16:58'),
(2, 26, 10000.00, '2025-09-03 14:01:00', '2025-09-10 14:01:00', '2025-09-09 14:31:50', '2025-09-09 14:31:50'),
(3, 28, 90000.00, '2025-09-04 10:39:00', '2025-09-19 10:39:00', '2025-09-17 10:39:54', '2025-09-17 10:39:54'),
(4, 29, 90000.00, '2025-09-10 10:44:00', '2025-09-18 10:44:00', '2025-09-17 10:44:49', '2025-09-17 10:44:49'),
(5, 30, 122200.00, '2025-09-16 10:50:00', '2025-09-18 10:51:00', '2025-09-17 10:51:16', '2025-09-17 10:51:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `timestamp` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(255) NOT NULL COMMENT 'Generated order number like HB2025001',
  `user_id` bigint(20) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL COMMENT 'Total before discounts and shipping',
  `discount_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(10,2) NOT NULL COMMENT 'Final amount = subtotal - discountAmount',
  `coupon_id` int(11) DEFAULT NULL,
  `coupon_code` varchar(255) DEFAULT NULL COMMENT 'Store coupon code for reference',
  `status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','RETURNED') DEFAULT 'PENDING',
  `payment_status` enum('PENDING','PAID','FAILED','REFUNDED') DEFAULT 'PENDING',
  `payment_method` enum('COD','VNPAY') DEFAULT NULL,
  `shipping_address` text NOT NULL COMMENT 'Full shipping address as text string',
  `notes` text DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `vnp_transaction_no` varchar(255) DEFAULT NULL COMMENT 'VNPay transaction number',
  `vnp_response_code` varchar(255) DEFAULT NULL COMMENT 'VNPay response code',
  `paid_at` datetime DEFAULT NULL COMMENT 'Timestamp when payment was completed',
  `recipient_name` varchar(255) NOT NULL DEFAULT '' COMMENT 'Name of the person receiving the order',
  `recipient_email` varchar(255) NOT NULL DEFAULT '' COMMENT 'Email of the person receiving the order',
  `recipient_phone` varchar(20) NOT NULL DEFAULT '' COMMENT 'Phone number of the person receiving the order'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `user_id`, `subtotal`, `discount_amount`, `total_amount`, `coupon_id`, `coupon_code`, `status`, `payment_status`, `payment_method`, `shipping_address`, `notes`, `delivered_at`, `cancelled_at`, `created_at`, `updated_at`, `vnp_transaction_no`, `vnp_response_code`, `paid_at`, `recipient_name`, `recipient_email`, `recipient_phone`) VALUES
(1, 'HB2024001', 2, 650000.00, 50000.00, 600000.00, 2, 'SAVE50K', 'DELIVERED', 'PAID', 'VNPAY', '{\"name\":\"Nguyễn Văn A\",\"phone\":\"0901234567\",\"address\":\"456 Nguyen Van Cu, District 1, Ho Chi Minh City\"}', 'Giao hàng trong giờ hành chính', NULL, NULL, '2024-11-16 00:00:00', '2024-11-20 00:00:00', NULL, NULL, NULL, '', '', ''),
(2, 'HB2024002', 3, 380000.00, 57000.00, 323000.00, 3, 'SUMMER2024', 'PROCESSING', 'PENDING', 'COD', '{\"name\":\"Trần Thị B\",\"phone\":\"0912345678\",\"address\":\"789 Le Loi, District 3, Ho Chi Minh City\"}', NULL, NULL, NULL, '2024-12-01 00:00:00', '2024-12-01 00:00:00', NULL, NULL, NULL, '', '', ''),
(3, 'HB2024003', 2, 245000.00, 24500.00, 220500.00, 1, 'WELCOME10', 'SHIPPED', 'PAID', 'VNPAY', '{\"name\":\"Nguyễn Văn A\",\"phone\":\"0901234567\",\"address\":\"456 Nguyen Van Cu, District 1, Ho Chi Minh City\"}', 'Gọi trước khi giao', NULL, NULL, '2024-12-10 00:00:00', '2024-12-12 00:00:00', NULL, NULL, NULL, '', '', ''),
(4, 'HB2024004', 3, 460000.00, 30000.00, 430000.00, 4, 'FREESHIP', 'CONFIRMED', 'PAID', 'VNPAY', '{\"name\":\"Trần Thị B\",\"phone\":\"0912345678\",\"address\":\"789 Le Loi, District 3, Ho Chi Minh City\"}', 'Đóng gói cẩn thận', NULL, NULL, '2024-12-15 00:00:00', '2024-12-16 00:00:00', NULL, NULL, NULL, '', '', ''),
(5, 'HB2024005', 2, 180000.00, 36000.00, 144000.00, 5, 'STUDENT20', 'CANCELLED', 'FAILED', 'COD', '{\"name\":\"Nguyễn Văn A\",\"phone\":\"0901234567\",\"address\":\"456 Nguyen Van Cu, District 1, Ho Chi Minh City\"}', 'Khách hàng yêu cầu hủy', NULL, NULL, '2024-12-05 00:00:00', '2024-12-06 00:00:00', NULL, NULL, NULL, '', '', ''),
(21, 'HB2025001', 1, 200000.00, 0.00, 200000.00, NULL, NULL, 'DELIVERED', 'PAID', 'VNPAY', 'Địa chỉ A', NULL, NULL, NULL, '2025-02-05 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(22, 'HB2025002', 2, 300000.00, 0.00, 300000.00, NULL, NULL, 'DELIVERED', 'PAID', 'COD', 'Địa chỉ B', NULL, NULL, NULL, '2025-02-18 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(23, 'HB2025003', 3, 150000.00, 0.00, 150000.00, NULL, NULL, 'DELIVERED', 'PAID', 'VNPAY', 'Địa chỉ C', NULL, NULL, NULL, '2025-02-25 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(24, 'HB2025004', 1, 250000.00, 0.00, 250000.00, NULL, NULL, 'SHIPPED', 'PAID', 'VNPAY', 'Địa chỉ A', NULL, NULL, NULL, '2025-03-10 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(25, 'HB2025005', 2, 180000.00, 0.00, 180000.00, NULL, NULL, 'SHIPPED', 'PAID', 'COD', 'Địa chỉ B', NULL, NULL, NULL, '2025-03-20 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(26, 'HB2025006', 3, 210000.00, 0.00, 210000.00, NULL, NULL, 'SHIPPED', 'PAID', 'VNPAY', 'Địa chỉ C', NULL, NULL, NULL, '2025-04-08 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(27, 'HB2025007', 1, 400000.00, 0.00, 400000.00, NULL, NULL, 'DELIVERED', 'PAID', 'VNPAY', 'Địa chỉ A', NULL, NULL, NULL, '2025-04-21 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(28, 'HB2025008', 2, 350000.00, 0.00, 350000.00, NULL, NULL, 'DELIVERED', 'PAID', 'COD', 'Địa chỉ B', NULL, NULL, NULL, '2025-05-03 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(29, 'HB2025009', 3, 170000.00, 0.00, 170000.00, NULL, NULL, 'DELIVERED', 'PAID', 'VNPAY', 'Địa chỉ C', NULL, NULL, NULL, '2025-05-15 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(30, 'HB2025010', 1, 290000.00, 0.00, 290000.00, NULL, NULL, 'DELIVERED', 'PAID', 'VNPAY', 'Địa chỉ A', NULL, NULL, NULL, '2025-05-28 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(31, 'HB2025011', 2, 220000.00, 0.00, 220000.00, NULL, NULL, 'DELIVERED', 'PAID', 'COD', 'Địa chỉ B', NULL, NULL, NULL, '2025-06-07 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(32, 'HB2025012', 1, 310000.00, 0.00, 310000.00, NULL, NULL, 'SHIPPED', 'PAID', 'VNPAY', 'Địa chỉ A', NULL, NULL, NULL, '2025-06-22 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(33, 'HB2025013', 3, 270000.00, 0.00, 270000.00, NULL, NULL, 'DELIVERED', 'PAID', 'VNPAY', 'Địa chỉ C', NULL, NULL, NULL, '2025-07-01 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(34, 'HB2025014', 1, 190000.00, 0.00, 190000.00, NULL, NULL, 'DELIVERED', 'PAID', 'VNPAY', 'Địa chỉ A', NULL, NULL, NULL, '2025-07-03 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', ''),
(35, 'HB2025015', 2, 330000.00, 0.00, 330000.00, NULL, NULL, 'DELIVERED', 'PAID', 'COD', 'Địa chỉ B', NULL, NULL, NULL, '2025-07-05 00:00:00', '2025-07-06 16:42:05', NULL, NULL, NULL, '', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `product_name` varchar(255) NOT NULL COMMENT 'Store product name at time of order',
  `product_image` text DEFAULT NULL COMMENT 'Store product image URL at time of order',
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL COMMENT 'Price per unit at time of order',
  `discount` decimal(5,2) NOT NULL DEFAULT 0.00 COMMENT 'Discount percentage at time of order',
  `total_price` decimal(10,2) NOT NULL COMMENT 'quantity * unitPrice * (100 - discount) / 100',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `product_image`, `quantity`, `unit_price`, `discount`, `total_price`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 'Tâm Lý Học Tội Phạm - Phác Họa Chân Dung Kẻ Phạm Tội', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734539974/heybook/products/zrnjm8i7aytx9hjr73yc.jpg', 2, 195000.00, 0.00, 390000.00, '2024-11-16 00:00:00', '2024-11-16 00:00:00'),
(2, 1, 6, 'Bộ Bút Chì Màu Chuyên Nghiệp 72 Màu', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734540126/heybook/products/seuht7kqgvdogb6qmdx9.jpg', 1, 260000.00, 0.00, 260000.00, '2024-11-16 00:00:00', '2024-11-16 00:00:00'),
(3, 2, 1, 'Nhà Giả Kim', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734539779/heybook/products/cbzk40nxcvf3lc2yppgv.jpg', 1, 120000.00, 0.00, 120000.00, '2024-12-01 00:00:00', '2024-12-01 00:00:00'),
(4, 2, 6, 'Bộ Bút Chì Màu Chuyên Nghiệp 72 Màu', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734540126/heybook/products/seuht7kqgvdogb6qmdx9.jpg', 1, 260000.00, 0.00, 260000.00, '2024-12-01 00:00:00', '2024-12-01 00:00:00'),
(5, 3, 3, 'Càn Khôn Đại Náo Thiên Cung', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734539872/heybook/products/wxtgozm1qsqpbwlv9ukj.jpg', 1, 245000.00, 0.00, 245000.00, '2024-12-10 00:00:00', '2024-12-10 00:00:00'),
(6, 4, 2, 'Sapiens: Lược Sử Loài Người', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734539825/heybook/products/jw4bqiayc3i6asjqtdnm.jpg', 1, 235000.00, 0.00, 235000.00, '2024-12-15 00:00:00', '2024-12-15 00:00:00'),
(7, 4, 7, 'Máy Tính Casio FX-580VN X', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734540179/heybook/products/vwqhscnw1zlqxmqjlnrs.jpg', 1, 225000.00, 0.00, 225000.00, '2024-12-15 00:00:00', '2024-12-15 00:00:00'),
(8, 5, 5, 'Bộ Thước Kẻ Học Sinh 4 Món', 'https://res.cloudinary.com/dqpo9h5s2/image/upload/v1734540077/heybook/products/l8dtuywrnhtyhxjxm6nw.jpg', 2, 90000.00, 0.00, 180000.00, '2024-12-05 00:00:00', '2024-12-05 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) NOT NULL DEFAULT 0.00,
  `stock` int(11) NOT NULL DEFAULT 0,
  `description` text NOT NULL,
  `cover_image_url` varchar(500) NOT NULL,
  `dimension` varchar(255) DEFAULT NULL,
  `brand_id` bigint(20) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_trend` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `price`, `discount`, `stock`, `description`, `cover_image_url`, `dimension`, `brand_id`, `created_at`, `updated_at`, `is_trend`) VALUES
(1, 1, 'Harry Potter và Hòn đá Phù thủy', 150000.00, 10.00, 50, 'Cuốn sách đầu tiên trong series Harry Potter của J.K. Rowling', 'http://localhost:3000/images/coverImages/1757385054193-677_deebot_mini.jpg', '', 2, '2025-06-26 13:17:53', '2025-09-09 09:30:54', 1),
(2, 1, 'Đắc Nhân Tâm', 89000.00, 15.00, 100, 'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử', 'http://localhost:3000/images/coverImages/1757385066313-656_puricare_aero_hit_as35ggw10_abae.jpg', '', 1, '2025-06-26 13:17:53', '2025-09-09 09:31:06', 1),
(3, 1, 'Sapiens: Lược sử loài người', 299000.00, 20.00, 30, 'Tác phẩm của Yuval Noah Harari về lịch sử nhân loại', 'http://localhost:3000/images/coverImages/1757385086293-614_deebot_x5_pro_omni.jpg', '', 1, '2025-06-26 13:17:53', '2025-09-09 09:31:26', 1),
(4, 1, 'Tôi thấy hoa vàng trên cỏ xanh', 85000.00, 0.00, 75, 'Tiểu thuyết của Nguyễn Nhật Ánh', 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935236437097.jpg', '18 x 13 cm', 1, '2025-06-26 13:17:53', '2025-07-05 00:20:35', 1),
(5, 1, 'Atomic Habits', 199000.00, 25.00, 40, 'Sách về xây dựng thói quen tích cực', 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935236437097.jpg', '20 x 13 cm', 1, '2025-06-26 13:17:53', '2025-07-05 00:20:35', 1),
(6, 2, 'Bút bi Thiên Long TL-027', 5000.00, 0.00, 200, 'Bút bi cao cấp viết mượt', 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935236437097.jpg', '14 cm', 2, '2025-06-26 13:17:53', '2025-07-05 00:20:35', 1),
(7, 2, 'Tập vở 200 trang ô li', 15000.00, 5.00, 150, 'Tập vở chất lượng cao', 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935236437097.jpg', '25 x 18 cm', 2, '2025-06-26 13:17:53', '2025-07-05 00:20:35', 1),
(8, 3, 'Bộ compa học sinh', 45000.00, 10.00, 80, 'Bộ dụng cụ vẽ hình học đầy đủ', 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935236437097.jpg', '20 x 15 cm', 2, '2025-06-26 13:17:53', '2025-07-05 00:20:35', 1),
(9, 3, 'Thước kẻ 30cm', 8000.00, 0.00, 120, 'Thước nhựa trong suốt chất lượng cao', 'https://cdn1.fahasa.com/media/catalog/product/8/9/8935236437097.jpg', '30 cm', 2, '2025-06-26 13:17:53', '2025-06-26 23:30:58', 0),
(10, 3, 'test123', 100000.00, 10.00, 1, 'sssssssssss', 'http://localhost:3000/images/coverImages/1757065463340-Screenshot 2025-09-05 124858.png', '', 2, '2025-09-05 16:44:23', '2025-09-05 16:44:23', 0),
(11, 1, 'Tran duc anh', 300000.00, 10.00, 10, '12112322321312', 'http://localhost:3000/images/coverImages/1757258609222-851035a4-a435-4e36-a067-d396acdb4cf8.jpg', '', 1, '2025-09-07 22:23:29', '2025-09-07 22:23:29', 0),
(12, 3, 'ssss', 20000.00, 10.00, 10, '112đasasssss', 'http://localhost:3000/images/coverImages/1757297798471-download.jpg', '123', 2, '2025-09-08 09:16:38', '2025-09-08 09:16:38', 0),
(13, 3, 'testpayload', 100000.00, 10.00, 10, 'hshshshhshshsh', 'http://localhost:3000/images/coverImages/1757297867946-MicrosoftTeams-image.png', '123', 2, '2025-09-08 09:17:47', '2025-09-08 09:17:47', 0),
(18, 1, 'truong ca', 10000.00, 10.00, 1000, 'test san pham', 'http://localhost:3000/images/coverImages/1757305082572-test1.jpg', NULL, 2, '2025-09-08 11:18:02', '2025-09-08 11:18:02', 0),
(26, 7, 'KhangChie', 1000000.00, 10.00, 100, 'me oi vui len me co dua con anh hung', 'http://localhost:3000/images/coverImages/1757403110508-614_deebot_x5_pro_omni.jpg', NULL, 2, '2025-09-09 14:31:50', '2025-09-09 14:31:50', 0),
(27, 2, 'Tran duc anh 6711', 1000000.00, 10.00, 10, '<p><strong>Những ưu điểm nổi bật của Tineco S9 Artist</strong></p><p>- Thiết kế đẹp, sang trọng, lấy cảm hứng từ màu sắc ánh sáng cực quang&nbsp;</p><p>-&nbsp;Công nghệ DualBlock chống rối hoàn hảo</p><p>-&nbsp;Làm sạch chổi lau sàn tức thì với công nghệ Tineco MHCBS™</p><p>-&nbsp;Cảm biến iLoop™ tự động diều chỉnh lượng nước và lực hút</p><p>-&nbsp;Khả năng làm sạch cạnh đôi, tính năng xóa vệt nước</p><p>-&nbsp;FlashDry tự động làm sạch, sấy khô ở 85°C</p><p>-&nbsp;Tiết kiệm công sức nhờ công nghệ SmoothDrive</p><p>-&nbsp;Khả năng lau ở khu vực thấp với thiết kế gập phẳng 180 độ</p><p>-&nbsp;Thiết kế xoay 90° linh hoạt, thiết kế lại bình chứa nước làm sạch nhằm giảm trọng lượng máy.</p><p>-&nbsp;Lực hút tới 18.000Pa, hoạt động liên tục trong 50 phút</p><p>- Sử dụng công nghệ pin mềm cho tuổi thọ cao và giảm trọng lượng máy&nbsp;</p><p>-&nbsp;Thiết kế bình chứa lớn, dễ dàng tháo rời</p><h3><strong>Thiết kế đẹp, sang trọng, lấy cảm hứng từ màu sắc ánh sáng cực quang</strong></h3><p><a href=\"https://techzhome.vn/may-hut-bui-lau-nha-cam-tay-tineco-floor-one-s9-artist\">Tineco&nbsp;S9 Artist</a>&nbsp;gây ấn tượng với thiết kế thanh lịch, thân máy mỏng nhẹ và vị trí pin tinh tế đặt ở phía sau, góp phần tạo nên vẻ ngoài sang trọng, tăng tính thẩm mỹ cho mọi không gian sống, là sự lựa chọn hoàn hảo cho những người yêu thích sự tiện nghi và phong cách. Từng chi tiết của máy được lựa chọn kết hợp hài hòa phù hợp với mọi không gian nội thất, thắp sáng ngôi nhà của bạn. Công nghệ màn hình LED tiên tiến mang đến trải nghiệm hiển thị thông tin hoàn toàn mới, giúp bạn tiếp cận thông tin nhanh chóng và trực quan hơn bao giờ hết.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-thiet-ke-dep-sang-trong.jpg\" alt=\"\" width=\"600\"></figure><p>&nbsp;</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/Untitled-1.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Công nghệ DualBlock chống rối hoàn hảo</strong></h3><p>Tineco S9 Artist được trang bị công nghệ chống rối lông tóc DualBlock giải quyết vấn đề lông thú cưng và tóc cuốn chặt vào chổi lăn. Lưỡi cạo chống rối ngăn lông/tóc cuốn vào máy, cạo sạch nước bẩn và tóc hiệu quả, đảm bảo hiệu suất và độ bền lâu.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-chong-roi-toc.jpg\" alt=\"\" width=\"600\"></figure><p>&nbsp;</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/s9-artist-chong-roi-toc.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Làm sạch chổi lau sàn tức thì với công nghệ Tineco MHCBS</strong></h3><p>Công nghệ Tineco MHCBS™ không chỉ cung cấp nước sạch liên tục mà còn phân phối đều lượng nước trên chổi lăn. Máy lau sàn Tineco Floor One S9 Artist sẽ cạo sạch nước thải ngay lập tức, loại bỏ hiệu quả các vết bẩn cứng đầu bám trên chổi lau sàn, đảm bảo chổi lăn luôn sạch sẽ, sàn nhà được lau sạch bong kin kít. Đặc điểm này thể hiện sự chú ý đến chi tiết và cải tiến trong quá trình làm sạch của Tineco, giúp người dùng đạt được hiệu suất cao và kết quả rõ ràng khi sử dụng sản phẩm.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-cong-nghe-MHCBS.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Cảm biến iLoop™ tự động diều chỉnh lượng nước và lực hút</strong></h3><p>iLoop™ là công nghệ cảm biến thông minh được tích hợp trong máy hút bụi khô ướt Tineco Floor One S9 Artist, cho phép xác định các khu vực có nhiều bụi bẩn hoặc vết bẩn cứng đầu theo thời gian thực. Dựa vào thông tin thu thập được, máy sẽ tự động điều chỉnh lực hút và lượng nước phun ra, đảm bảo hiệu quả làm sạch cao mà không gây hại cho sàn.</p><p>Ngoài ra, công nghệ này còn nhận biết loại sàn (gạch, gỗ, thảm,...) và tự điều chỉnh chế độ làm việc phù hợp, giúp bảo vệ sàn nhà. Nhờ cảm biến này, người dùng không cần phải điều chỉnh thủ công chế độ làm sạch hay thời gian hoạt động, mà vẫn đảm bảo quá trình làm sạch diễn ra hiệu quả nhất.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-cam-bien-bui-ban.jpg\" alt=\"\" width=\"600\"></figure><h3>&nbsp;<strong>Khả năng làm sạch cạnh đôi, tính năng xóa vệt nước</strong></h3><p>Tính năng xóa vệt nước và làm sạch cạnh đôi nổi bật. Sau khi lau nhà xong, chổi lăn tự động di chuyển ngược lại để loại bỏ vết nước dư thừa, giữ sàn khô ráo. Tính năng làm sạch cạnh đôi giúp đạt hiệu suất làm sạch tối ưu, không bỏ sót vết bẩn ở khu vực khó tiếp cận.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-xoa-vet-nuoc.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>FlashDry tự động làm sạch, sấy khô ở 85°C</strong></h3><p>Tineco Floor One S9 Artist cung cấp giải pháp làm sạch thông minh và hoàn toàn rảnh tay. Sau khi hút bụi lau nhà, chỉ cần nhấn nút, hệ thống FlashDry sẽ tự động sử dụng nước nóng để làm tan các vết bẩn trong đường ống và chổi lăn, mang lại hiệu quả làm sạch toàn diện. Tiếp theo, máy sẽ sấy khô toàn chuỗi bằng khí nóng ở 85°C, loại bỏ hoàn toàn nước khỏi các bộ phận, đồng thời diệt vi khuẩn, nấm mốc.</p><p>Với thiết kế đế kín, quá trình sấy khô này diễn ra nhanh chóng trong 5 phút, đảm bảo&nbsp;máy hút bụi&nbsp;luôn sạch sẽ và sẵn sàng sử dụng. Đặc biệt, chổi lăn của Tineco có khả năng xoay 720 độ, giúp làm sạch sâu và giữ cho các sợi lông luôn mềm mại, khô thoáng hơn so với các dòng sản phẩm khác.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-say-nong.jpg\" alt=\"\" width=\"600\"></figure><p>&nbsp;</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-giat-nuoc-nong.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Tiết kiệm công sức nhờ công nghệ SmoothDrive</strong></h3><p>Với thiết kế thông minh và bánh xe SmoothDrive mô phỏng bộ truyền động vi sai của ô tô, giúp di chuyển linh hoạt. Cảm biến hướng chính xác cho phép điều chỉnh tốc độ bánh xe, đảm bảo việc rẽ mượt và tiết kiệm sức lực khi làm sạch 360 độ.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-tro-luc-di-chuyen.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Khả năng lau ở khu vực thấp với thiết kế gập phẳng 180 độ</strong></h3><p>Công nghệ HyperStretch độc đáo của máy hút bụi cho phép máy nén tối đa, dễ dàng len lỏi vào những góc khuất như gầm giường, tủ, sofa nhờ khả năng ngả phẳng 180° và độ dày chỉ 12.85cm. Hệ thống tách nước bẩn 3 khoang độc quyền phân tách khí, lỏng và rắn gấp 5 lần so với hệ thống thông thường, bảo vệ động cơ, duy trì công suất làm sạch tối ưu ngay cả khi máy nằm phẳng và ngăn chặn nước thải quay trở lại, giúp bạn yên tâm vệ sinh những khu vực khó tiếp cận.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-gap-180-do.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Thiết kế xoay 90° linh hoạt, thiết kế lại bình chứa nước làm sạch nhằm giảm trọng lượng máy</strong></h3><p>Máy được nâng cấp thiết kế xoay 90°, linh hoạt hơn khi vệ sinh quanh chướng ngại vật và góc nhà. Khả năng xoay 45° trái/phải giúp giảm 50% lực cầm tay, giảm áp lực lên tay cầm so với các dòng máy trước. Bình chứa nước sạch được đặt dưới chổi lăn giúp giảm trọng lượng máy, tăng áp suất và nâng cao hiệu quả làm sạch vết bẩn cứng đầu.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-xoay-90-do.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Sử dụng công nghệ pin mềm cho tuổi thọ cao và giảm trọng lượng máy</strong></h3><p>Khác với các loại pin truyền thống, pin mềm dạng túi được cấu tạo từ các tế bào pin mỏng, linh hoạt và được bọc trong một lớp vỏ mềm. Thiết kế này tối ưu hóa khả năng dẫn điện và tản nhiệt, từ đó nâng cao hiệu suất hoạt động và kéo dài tuổi thọ pin.</p><p>Nhờ vào công nghệ tiên tiến và quy trình sản xuất nghiêm ngặt của Tineco, pin mềm dạng túi có tuổi thọ vượt trội, gấp 3 lần so với pin thông thường, đồng thời nhẹ hơn đáng kể. Hơn nữa, công nghệ này còn giúp giảm thiểu quá trình lão hóa pin, duy trì hiệu suất hoạt động ổn định trong thời gian dài, đảm bảo máy luôn vận hành mạnh mẽ và hiệu quả.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-pin-mem.jpg\" alt=\"\" width=\"600\"></figure><h3><strong>Thiết kế bình chứa lớn, dễ dàng tháo rời</strong></h3><p>Máy hút bụi lau sàn Tineco S9 Artist có bình chứa nước lớn được thiết kế để phân tách riêng biệt giữa nước bẩn và nước sạch. Bình chứa nước sạch có dung tích 1L, cho phép bạn sử dụng máy lâu hơn và làm sạch được nhiều khu vực. Trong khi đó, bình chứa nước bẩn 0.75L đảm bảo không có nước thải nào bị tràn ra ngoài, giúp việc lau dọn trở nên sạch sẽ và hiệu quả hơn. Với thiết kế thông minh có thể dễ dàn giúp bạn dễ dàng tháo rời bình chứa nước bẩn chỉ bằng một tay để vệ sinh hay thêm nước.</p><figure class=\"image\"><img src=\"https://techzhome.vn/media/lib/11-02-2025/tineco-s9-artist-binh-nuoc-lon.jpg\" alt=\"\" width=\"600\"></figure><p><strong>Lực hút tới 22.000Pa, hoạt động liên tục trong 50 phút</strong></p><p>Máy sở hữu lực hút mạnh mẽ 22.000Pa, dễ dàng loại bỏ bụi bẩn, mảnh vụn, lông thú cưng và cả vết bẩn cứng đầu, hút sạch cả nước bẩn giúp sàn nhà khô nhanh. Pin 4000*7 mAh kết hợp công nghệ iLoop cho thời gian sử dụng lên đến 50 phút (hút thẳng đứng) và sạc đầy trong 4-5 tiếng. Bình chứa nước lớn giúp làm sạch diện tích rộng mà không lo hết pin. Hệ thống làm mát tự động kích hoạt khi phát hiện nhiệt độ cao, bảo vệ máy.</p><p>&nbsp;</p><p>________</p><p><a href=\"https://techzhome.vn/\"><i>Techzhome</i></a><i>&nbsp;- Phân phối và bán lẻ thiết bị gia dụng thông minh chính hãng&nbsp;</i></p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><h3>&nbsp;</h3><p><a href=\"javascript:;\">Xem thêm</a></p><p><br>&nbsp;</p>', 'http://localhost:3000/images/coverImages/1757470820183-656_puricare_aero_hit_as35ggw10_abae.jpg', NULL, 2, '2025-09-10 09:20:20', '2025-09-10 09:34:51', 0),
(28, 5, 'San pham test1', 1000000.00, 10.00, 12, '<p>day la san pham test</p>', 'http://localhost:3000/images/coverImages/1758080394824-Screenshot 2025-07-16 195424.png', '123', 4, '2025-09-17 10:39:54', '2025-09-17 10:39:54', 0),
(29, 5, 'San pham test2', 1000000.00, 20.00, 100, '<p>day la san pham test2</p>', 'http://localhost:3000/images/coverImages/1758080689810-Screenshot 2025-09-16 113955.png', NULL, 3, '2025-09-17 10:44:49', '2025-09-17 10:44:49', 0),
(30, 5, 'Sản phẩm test3 chinh sua', 1000000.00, 10.00, 10, '<p>day la san pham test 3 chinh sua</p>', 'http://localhost:3000/images/coverImages/1758081076828-Screenshot 2025-09-11 182422.png', '123', 4, '2025-09-17 10:51:16', '2025-09-17 10:59:30', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_brands`
--

CREATE TABLE `product_brands` (
  `id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_brands`
--

INSERT INTO `product_brands` (`id`, `category_id`, `name`, `created_at`, `updated_at`) VALUES
(3, 5, 'Apple chinh sua', '2025-09-16 10:11:16', '2025-09-16 16:28:35'),
(4, 5, 'Mini', '2025-09-16 17:28:06', '2025-09-16 17:28:06'),
(5, 6, 'Hãng Khác', '2025-09-17 10:48:11', '2025-09-17 10:48:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_highlights`
--

CREATE TABLE `product_highlights` (
  `id` int(11) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_highlights`
--

INSERT INTO `product_highlights` (`id`, `product_id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 28, 'xanh', 'do', '2025-09-17 10:39:54', '2025-09-17 10:39:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://example.com/harry-potter-1-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(2, 1, 'https://example.com/harry-potter-1-img2.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(3, 2, 'https://example.com/dac-nhan-tam-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(4, 3, 'https://example.com/sapiens-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(5, 3, 'https://example.com/sapiens-img2.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(6, 4, 'https://example.com/hoa-vang-co-xanh-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(7, 5, 'https://example.com/atomic-habits-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(8, 6, 'https://example.com/but-bi-tl027-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(9, 7, 'https://example.com/tap-vo-200-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55'),
(10, 8, 'https://cdn1.fahasa.com/media/catalog/product/9/7/9781526646712.jpg', '2025-06-26 13:17:55', '2025-06-26 23:10:03'),
(11, 9, 'https://example.com/thuoc-ke-30cm-img1.jpg', '2025-06-26 13:17:55', '2025-06-26 13:17:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 5, 'Sách rất hay, nội dung bổ ích và dễ hiểu. Tôi rất thích!', '2025-06-26 13:17:59', '2025-06-26 13:17:59'),
(2, 2, 1, 4, 'Nội dung tốt nhưng có một số phần hơi khó hiểu.', '2025-06-26 13:17:59', '2025-06-26 13:17:59'),
(3, 3, 1, 5, 'Đây là một cuốn sách tuyệt vời! Rất khuyến khích mọi người đọc.', '2025-06-26 13:17:59', '2025-06-26 13:17:59'),
(4, 1, 2, 4, 'Sách hay, tác giả viết rất cuốn hút.', '2025-06-26 13:17:59', '2025-06-26 13:17:59'),
(5, 2, 3, 3, 'Sách bình thường, không có gì đặc biệt.', '2025-06-26 13:17:59', '2025-06-26 13:17:59'),
(6, 3, 4, 5, 'Bút viết rất mượt, giá cả hợp lý.', '2025-06-26 13:17:59', '2025-06-26 13:17:59'),
(7, 1, 4, 4, 'Chất lượng tốt, đóng gói cẩn thận.', '2025-06-26 13:17:59', '2025-06-26 13:17:59'),
(8, 2, 5, 4, 'Tập vở chất lượng, giấy dày và mịn.', '2025-06-26 13:17:59', '2025-06-26 13:17:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250616000001-create-categories.js'),
('20250616000002-create-book-genres.js'),
('20250616000003-create-products.js'),
('20250616000004-create-book-details.js'),
('20250616000005-create-stationery-details.js'),
('20250616000006-create-product-images.js'),
('20250616000007-create-users.js'),
('20250618000001-add-address-to-users.js'),
('20250618000002-create-coupons.js'),
('20250619000001-create-carts.js'),
('20250619000002-create-cart-items.js'),
('20250619000003-create-orders.js'),
('20250619000004-create-order-items.js'),
('20250619000005-remove-shipping-from-orders.js'),
('20250619000005-update-orders-remove-cancellation-reason.js'),
('20250619000006-change-shipping-address-to-text.js'),
('20250619000007-remove-session-id-from-carts.js'),
('20250619180430-add-vnpay-fields-to-orders.js'),
('20250620000010-create-reviews.js'),
('20250622000001-create-addresses.js'),
('20250704171020-add-isTrend-to-products.js'),
('20250705154228-create-message.js'),
('20250907153126-create-flashsales.js'),
('20250909063002-create-product-highlights.js'),
('20250914151511-create-product-brand.js'),
('add-recipient-fields-to-orders.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `verify_token` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'USER',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `address` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `user_name`, `avatar`, `is_active`, `verify_token`, `role`, `created_at`, `updated_at`, `address`) VALUES
(1, 'admin@heybook.com', '$2b$10$J/k8zQoF7DN.pW8s27FmD.9Hl0nn6uD2TXRayRtqOb3l3eFVtGCKq', 'Admin', 'https://example.com/admin-avatar.jpg', 1, 'verified', 'ADMIN', '2025-06-26 13:17:57', '2025-06-26 13:17:57', NULL),
(2, 'user1@gmail.com', '$2b$10$nLIcOpvkr1T6g1PUKyPnLunWdbdUEX0OG8w9EKc6v.O7EBd2tlYa.', 'Nguyễn Văn A', 'https://example.com/user1-avatar.jpg', 1, 'verified', 'USER', '2025-06-26 13:17:57', '2025-06-26 13:17:57', NULL),
(3, 'user2@gmail.com', '$2b$10$XQKbvMoZKS6okT.yGVVDH.8Gd4ogu7TFgaD1ojnMoiLQrnb3ODkNC', 'Trần Thị B', NULL, 1, 'pending_verification_token', 'USER', '2025-06-26 13:17:57', '2025-06-26 13:17:57', NULL),
(4, 'besu363@gmail.com', '$2b$08$gN0ndf9v3UPrKIB39iX53OHUflBRozRzWTeRdR8ZkYP35xSycq/BC', 'Mila Mila', 'https://lh3.googleusercontent.com/a/ACg8ocLP_Qo_HnDxFo1uIBHpvR_pMb3tEKOamMG88qr7Dr6XG6R5mA=s96-c', 1, 'google_verified', 'ADMIN', '2025-06-28 18:18:36', '2025-06-29 23:09:04', NULL),
(5, 'ducanhhanu2020@gmail.com', '$2b$08$eQtM0JBryej7TfsIieqWcehM11dXLBviDBSdbugNJZbV4F.D5Aw.K', 'Duc Anh Tran', 'https://lh3.googleusercontent.com/a/ACg8ocKdkqhlAyhlnsw0KM0TNHiZAKoBbK4Ye_e2T7yRj4FeWWKb7Q=s96-c', 1, 'google_verified', 'CLIENT', '2025-06-29 23:19:42', '2025-06-29 23:19:42', NULL),
(6, '10mr.pro@gmail.com', '$2b$08$Xf0c/l9Hf8JFgui9kIdJR.ckE7wTPTXoYx4CtN1LR1RKsvKmuA.sO', '76MRPRO', 'https://lh3.googleusercontent.com/a/ACg8ocJicDWM-1BNUYLB7lMLsqVlgj5gQw5foBkahoj-OI9-yYbBU2Q=s96-c', 1, 'google_verified', 'CLIENT', '2025-07-06 09:47:57', '2025-07-06 09:47:57', NULL),
(7, 'happy13425@gmail.com', '$2b$08$TLU0zgYXHn5HZFDvYUxSu.D0lrrjfzUXU7Vtq4CVRoZR5r9s8rs0S', 'happy13425', NULL, 0, 'a2917f78-89f6-468c-a427-e96853cd5327', 'ADMIN', '2025-09-08 21:58:20', '2025-09-08 21:59:31', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_user_id` (`user_id`),
  ADD KEY `addresses_user_id_is_default` (`user_id`,`is_default`);

--
-- Chỉ mục cho bảng `book_genres`
--
ALTER TABLE `book_genres`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coupon_id` (`coupon_id`),
  ADD KEY `carts_user_id` (`user_id`),
  ADD KEY `carts_status` (`status`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cart_items_cart_id_product_id` (`cart_id`,`product_id`),
  ADD KEY `cart_items_cart_id` (`cart_id`),
  ADD KEY `cart_items_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `coupons_code` (`code`),
  ADD KEY `coupons_is_active` (`isActive`),
  ADD KEY `coupons_start_date_end_date` (`startDate`,`endDate`);

--
-- Chỉ mục cho bảng `flashsales`
--
ALTER TABLE `flashsales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`product_id`);

--
-- Chỉ mục cho bảng `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number` (`order_number`),
  ADD KEY `coupon_id` (`coupon_id`),
  ADD KEY `orders_user_id` (`user_id`),
  ADD KEY `orders_order_number` (`order_number`),
  ADD KEY `orders_status` (`status`),
  ADD KEY `orders_payment_status` (`payment_status`),
  ADD KEY `orders_created_at` (`created_at`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id` (`order_id`),
  ADD KEY `order_items_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id` (`category_id`),
  ADD KEY `products_type` (`brand_id`);

--
-- Chỉ mục cho bảng `product_brands`
--
ALTER TABLE `product_brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`category_id`);

--
-- Chỉ mục cho bảng `product_highlights`
--
ALTER TABLE `product_highlights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id` (`product_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `users_email` (`email`),
  ADD KEY `users_role` (`role`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `book_genres`
--
ALTER TABLE `book_genres`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `flashsales`
--
ALTER TABLE `flashsales`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `product_brands`
--
ALTER TABLE `product_brands`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `product_highlights`
--
ALTER TABLE `product_highlights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `flashsales`
--
ALTER TABLE `flashsales`
  ADD CONSTRAINT `flashsales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_brands`
--
ALTER TABLE `product_brands`
  ADD CONSTRAINT `product_brands_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_highlights`
--
ALTER TABLE `product_highlights`
  ADD CONSTRAINT `product_highlights_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
