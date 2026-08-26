Thiết kế Web - nhóm 14
# Chủ đề: Website đặt tour- du lịch

### Mục lục
1. [Giới thiệu](#1-giới-thiệu)
2. [Tính năng chính](#2-tính-năng-chính)
3. [Công Nghệ sử dụng](#3-công-nghệ-sử-dụng)
4. [Sơ đồ trang web](#4-sơ-đồ-trang-web)
5. [Quy chuẩn thiết kế](#5-quy-chuẩn-thiết-kế)
6. [Hướng dẫn cài đặt](#6-hướng-dẫn-cài-đặt)
7. [Tác giả](#7-tác-giả)
#### Trải nghiệm dự án: 
Đường dẩn:** [https://tour-website-liard.vercel.app/]
### 1. Giới thiệu
 Xây dựng và phát triển hoàn chỉnh sản phẩm website vận tải hành khách và du lịch trực tuyến, nhằm cung cấp một giải pháp đặt dịch vụ nhanh chóng, tiện lợi, giải quyết triệt để rào cản về thủ tục rườm rà cho đối tượng khách hàng trẻ tuổi.
### 2. Tính năng chính
* Hệ thống phân loại & hiển thị danh sách các địa điểm du lịch và nghỉ dưỡng đa dạng. Nội dung phản ánh đầy đủ các nội dung như: giá, thời gian khởi hành, review đánh giá khách quan của từng khách hàng.
* Tính năng tạo bộ lọc theo các nhu cầu cụ thể của từng cá nhân: Lọc theo giá, theo thời gian và điểm đến phu hợp.
* Trang đăng nhập đơn giản, phù hợp với nhiều đối tượng người dùng. 
* Quản lý tài khoản cá nhân: cho phép thay đổi tên, email, mật khẩu, hiển thị danh sách lịch sử di chuyến đi. 
### 3. Công nghệ sử dụng
* Cấu trúc : HTML5, hệ thống tiện ích Tailwind CSS., Javascript.
* Tham Khảo:**[https://www.figma.com/design/2ghT8MC6VqBr1MlUWSYKFY/Golobe---Travel-agency-website--Community-?node-id=108-18842&t=RLMFAw7fIIUbDT6j-0]
* Triển khai dự án: vercel.
* Lưu trử dự Source code dự án: GitHub.
<pre>
Trang chủ (Index)
│
├── Tìm chuyến bay (Find Flight)
│   └── Luồng tìm kiếm (Flight Flow)
│       └── Danh sách chuyến bay (Flight Listing)
│           └── Chi tiết chuyến bay (Flight Detail Page)
│
├── Tìm nơi lưu trú (Find Stays)
│   └── Khung tìm kiếm (Hotel Search)
│       └── Danh sách khách sạn (Hotel Listing)
│           └── Chi tiết đặt phòng (Booking Detail)
│               └── Danh sách yêu thích (Favourites)
│
└── Quản lý Tài khoản (Account)
    ├── Lịch sử giao dịch (History)
    └── Phương thức thanh toán (Payment Methods)
</pre>
### 5.Quy chuẩn thiết kế
#### 5.1 Bảng màu:
*Màu thương hiệu chính:*
    --color-mint-green: #8DD3BB.
*Màu nhấn:*
    --color-slamon: #FF8682
*Màu chữ chính:*
    --color-blackish-green: #122223
*Màu chữ phụ:*
    --color-muted: #797979
*Nền trang:*
    --color-surface: #FFFFFF
    --color-mint-cream: #EBF6F2
*Viền:*
    --color-line: #D7E2EE
#### 5.2 Font chữ & Cỡ chữ
- Font chính:Trade Gothic, Montserrat 
- Kích thước Headingh1: 48px đến 60px; h2: 30px đến 36px; h3: 20px đến 24px.
#### BREAKPOINT
- sm: dùng cho màn hình nhỏ / điện thoại xoay ngang 
- md: máy tính bảng /tablet 
- lg: màn hình máy tính xách tay / laptop 
- xl: màn hình hình máy tính lớn /destop
- 2xl: màn hình có độ phân giải cực lớn 
#### 6.Hướng dẫn cài đặt
1. Sao chép (Clone) kho lưu trữ mã nguồn này về thiết bị cục bộ.
2. Mở trực tiếp tệp `index.html` bằng trình duyệt web (Chrome, Edge, Safari, v.v.) để trải nghiệm giao diện. Hoặc xem trực tiếp qua đường link Live Demo ở trên.
3. (Tùy chọn) Để biên dịch lại hoặc tùy chỉnh cấu hình Tailwind CSS, cần sử dụng Node.js và thiết lập môi trường phát triển cơ bản.
#### 7. Tác giả
Thành viên nhóm 14
1. Kim Quang Tú
2. Vũ Lê Chí Tài
3. Phan Thị Khánh Ly
*Sinh viên ngành Công nghệ Thông tin - Trường Đại học Mở TP.Hồ Chí Minh*