Thiết kế Web - nhóm 14
# Chủ đề: Website đặt tour- du lịch

### Mục lục
1. [Giới thiệu](#1-giới-thiệu)
2. [Tính năng chính](#2-tính-năng-chính)
3. [Công Nghệ sử dụng](#3-công-nghệ-sử-dụng)
4. [Sơ đồ trang web](#4-sơ-đồ-trang-web)
5. [Quy chuẩn thiết kế](#5-quy-chuẩn-thiết-kế)

### Trải nghiệm dự án: 
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
### 4. Sơ đồ trang web
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
