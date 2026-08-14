document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.getElementById("login-slider");
  const dots = document.querySelectorAll(".slider-dot");
  const images = sliderTrack.querySelectorAll("img");

  if (!sliderTrack || dots.length === 0 || images.length === 0) return;

  // 1. NHÂN BẢN ẢNH ĐẦU TIÊN
  // Khắc phục lỗi giật lùi bằng cách gắn thêm 1 bản sao của ảnh số 1 vào cuối cùng
  const firstClone = images[0].cloneNode(true);
  sliderTrack.appendChild(firstClone);

  let currentSlide = 0;
  const totalDots = dots.length; // Số lượng ảnh gốc (3)
  let slideInterval;
  let isTransitioning = false; // Khóa không cho spam click khi đang trượt

  // Hàm cập nhật màu cho các dấu chấm
  function updateDots(index) {
    // Nếu đang ở ảnh nhân bản (index = 3), đánh dấu sáng cho dot số 0
    const dotIndex = index === totalDots ? 0 : index;

    dots.forEach((dot, i) => {
      if (i === dotIndex) {
        dot.className = "slider-dot w-6 h-2 bg-mint-green rounded-full cursor-pointer transition-all duration-300";
      } else {
        dot.className = "slider-dot w-2 h-2 bg-white/70 hover:bg-white rounded-full cursor-pointer transition-all duration-300";
      }
    });
  }

  // Hàm di chuyển thanh trượt
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = index;

    // Bật lại hiệu ứng trượt (phòng khi nó bị tắt ở hàm xử lý vô tận)
    sliderTrack.style.transition = "transform 700ms ease-in-out";
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    updateDots(currentSlide);

    // Lắng nghe thời điểm trượt xong
    sliderTrack.addEventListener("transitionend", handleTransitionEnd);
  }

  // Xử lý logic vòng lặp vô tận (Infinite loop)
  function handleTransitionEnd() {
    isTransitioning = false;
    sliderTrack.removeEventListener("transitionend", handleTransitionEnd);

    // Mấu chốt: Nếu vừa trượt đến ảnh nhân bản (ảnh cuối cùng)
    if (currentSlide === totalDots) {
      // Tắt sạch hiệu ứng chuyển động
      sliderTrack.style.transition = "none";
      // Giật ngược về ảnh số 0 thật ngay lập tức (mắt người không kịp nhìn thấy)
      currentSlide = 0;
      sliderTrack.style.transform = `translateX(0%)`;
    }
  }

  function nextSlide() {
    if (isTransitioning) return;
    goToSlide(currentSlide + 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3000); // 3 giây đổi ảnh 1 lần
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  // Lắng nghe sự kiện click vào từng dot
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.getAttribute("data-slide"));
      if (slideIndex !== currentSlide) {
        goToSlide(slideIndex);
        resetAutoSlide();
      }
    });
  });

  // Bắt đầu chạy slider
  startAutoSlide();
});
