const sliderMin = document.getElementById("slider-min");
const sliderMax = document.getElementById("slider-max");
const sliderFill = document.getElementById("slider-fill");
const labelMin = document.getElementById("label-min");
const labelMax = document.getElementById("label-max");

const minGap = 210; // Khoảng cách giá tối thiểu

// Hàm chỉ làm nhiệm vụ vẽ lại giao diện
function updateSliderUI() {
  let minVal = parseInt(sliderMin.value);
  let maxVal = parseInt(sliderMax.value);

  // Cập nhật chữ số
  labelMin.textContent = "$" + minVal;
  labelMax.textContent = "$" + maxVal;

  // Tính phần trăm vị trí
  const minPercent = ((minVal - sliderMin.min) / (sliderMin.max - sliderMin.min)) * 100;
  const maxPercent = ((maxVal - sliderMax.min) / (sliderMax.max - sliderMax.min)) * 100;

  // Cập nhật thanh màu xanh
  sliderFill.style.left = minPercent + "%";
  sliderFill.style.width = maxPercent - minPercent + "%";

  // Cập nhật vị trí của chữ số (đã căn giữa chuẩn)
  // labelMin.style.left = `calc(${minPercent}% - ${minPercent * 0.2}px)`;
  // labelMax.style.left = "auto";
  // labelMax.style.right = `calc(${100 - maxPercent}% - ${(100 - maxPercent) * 0.2}px)`;
}

// Xử lý riêng khi người dùng kéo cục bên TRÁI
sliderMin.addEventListener("input", function () {
  let minVal = parseInt(sliderMin.value);
  let maxVal = parseInt(sliderMax.value);

  // Nếu cố tình kéo cục trái vượt qua (cục phải - 100) thì chặn lại ngay
  if (maxVal - minVal < minGap) {
    sliderMin.value = maxVal - minGap;
  }
  updateSliderUI();
});

// Xử lý riêng khi người dùng kéo cục bên PHẢI
sliderMax.addEventListener("input", function () {
  let minVal = parseInt(sliderMin.value);
  let maxVal = parseInt(sliderMax.value);

  // Nếu cố tình kéo cục phải lùi về vượt qua (cục trái + 100) thì chặn lại ngay
  if (maxVal - minVal < minGap) {
    sliderMax.value = minVal + minGap;
  }
  updateSliderUI();
});

// Chạy 1 lần khi load trang để setup
updateSliderUI();

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("sort-dropdown");
  const trigger = dropdown.querySelector(".sort-dropdown__trigger");
  const options = dropdown.querySelectorAll(".sort-dropdown__option");
  const selectedText = dropdown.querySelector(".sort-dropdown__selected");
  const hiddenInput = document.getElementById("sort-input");

  // 1. Đóng/mở menu khi bấm vào nút
  trigger.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài body
    dropdown.classList.toggle("is-open");
  });

  // 2. Xử lý khi người dùng chọn 1 mục
  options.forEach((option) => {
    option.addEventListener("click", function () {
      // Lấy dữ liệu từ mục vừa click
      const text = this.textContent;
      const value = this.getAttribute("data-value");

      // Thay đổi chữ trên nút hiển thị
      selectedText.textContent = text;

      // Đổ giá trị vào hidden input để lát nữa dùng làm Filter
      hiddenInput.value = value;

      // Xóa class 'active' ở tất cả thẻ li, rồi gán cho thẻ vừa chọn
      options.forEach((opt) => opt.classList.remove("sort-dropdown__option--active"));
      this.classList.add("sort-dropdown__option--active");

      // Đóng menu lại
      dropdown.classList.remove("is-open");

      // TODO: Sau này bạn có thể gọi hàm sắp xếp danh sách khách sạn ở đây
      console.log("Bạn vừa chọn chế độ sắp xếp:", value);
    });
  });

  // 3. Đóng menu khi bấm ra vùng trống bất kỳ trên trang web
  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("is-open");
    }
  });
});

const tabs = document.querySelectorAll(".hotel-listing__tab");
const indicator = document.querySelector(".slide-indicator");

function moveIndicator(tab) {
  // Lấy các thông số CSS thực tế của tab đang được click
  const tabStyle = window.getComputedStyle(tab);
  const paddingLeft = parseFloat(tabStyle.paddingLeft);
  const paddingRight = parseFloat(tabStyle.paddingRight);

  // 1. TÍNH CHIỀU RỘNG: Lấy tổng chiều rộng (bao gồm cả padding) trừ đi padding 2 bên
  // Cách này sẽ ra đúng kích thước của cái khung đứt đoạn màu tím trong DevTools
  const contentWidth = tab.clientWidth - paddingLeft - paddingRight;

  // 2. TÍNH VỊ TRÍ: Lùi vào một khoảng đúng bằng phần padding màu xanh lá bên trái
  const tabLeft = tab.offsetLeft + paddingLeft;

  // 3. Áp dụng vào thanh indicator
  indicator.style.width = `${contentWidth}px`;
  indicator.style.transform = `translateX(${tabLeft}px)`;
}

// Khởi tạo vị trí ban đầu cho tab mặc định
const activeTab = document.querySelector(".hotel-listing__tab--active");
if (activeTab) {
  moveIndicator(activeTab);
}

// Gắn sự kiện click cho từng tab
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabs.forEach((t) => t.classList.remove("hotel-listing__tab--active"));
    this.classList.add("hotel-listing__tab--active");
    moveIndicator(this);
  });
});
