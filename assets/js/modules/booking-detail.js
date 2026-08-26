export function initBookingDetail() {
  let currentStep = 1;

  // Hàm kiểm tra trạng thái đăng nhập an toàn
  const checkLoginStatus = () => {
    const userStorage = localStorage.getItem("golobe_current_user");
    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);
        if (user && (user.isLoggedIn === true || user.isLoggedIn === "true")) {
          return true;
        }
      } catch (e) {
        console.error("Lỗi parse JSON user", e);
      }
    }
    return false;
  };

  // Khởi tạo các phần tử DOM
  const stepWrapper12 = document.getElementById("step-wrapper-12");
  const step3Ticket = document.getElementById("step-3");
  const steps = [document.getElementById("step-1"), document.getElementById("step-2"), document.getElementById("step-3")];
  const indicators = document.querySelectorAll(".step-indicator");

  // Hàm điều hướng UI
  const updateUI = (step) => {
    steps.forEach((el, index) => {
      if (el) {
        if (index + 1 === step) {
          el.classList.remove("hidden");
          el.classList.add("flex");
        } else {
          el.classList.add("hidden");
          el.classList.remove("flex");
        }
      }
    });

    if (step === 3) {
      if (stepWrapper12) stepWrapper12.classList.add("hidden");
      if (step3Ticket) {
        step3Ticket.classList.remove("hidden");
        step3Ticket.classList.add("flex");
      }
    } else {
      if (stepWrapper12) stepWrapper12.classList.remove("hidden");
      if (step3Ticket) step3Ticket.classList.add("hidden");
    }

    indicators.forEach((indicator) => {
      const stepNum = parseInt(indicator.getAttribute("data-step"));
      if (stepNum <= step) {
        indicator.classList.add("text-mint-green");
        indicator.classList.remove("text-blackish-green/50");
      } else {
        indicator.classList.remove("text-mint-green");
        indicator.classList.add("text-blackish-green/50");
      }
    });
  };

  // Mặc định luôn dừng ở Bước 1 khi load trang
  updateUI(currentStep);

  // NÚT BẤM BƯỚC 1 (KIỂM TRA 2 ĐIỀU KIỆN)
  const bookingForm = document.getElementById("booking-phone-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // 1. Kiểm tra điều kiện Đăng nhập
      if (!checkLoginStatus()) {
        alert("Vui lòng đăng nhập trước khi tiếp tục đặt chỗ!");
        return;
      }

      // 2. Vì HTML5 đã tự kiểm tra required thành công mới chạy xuống đây,
      // ta cho phép chuyển sang Bước 2 luôn mà không cần if (!inputPhone) nữa
      currentStep = 2;
      updateUI(currentStep);
    });
  }
  // CÁC NÚT ĐIỀU HƯỚNG CÒN LẠI
  const btnBackTo1 = document.getElementById("btn-back-to-step1");
  if (btnBackTo1) {
    btnBackTo1.addEventListener("click", () => {
      currentStep = 1;
      updateUI(currentStep);
    });
  }

  const btnConfirmBooking = document.getElementById("btn-confirm-booking");
  if (btnConfirmBooking) {
    btnConfirmBooking.addEventListener("click", () => {
      currentStep = 3;
      updateUI(currentStep);
      window.scrollTo(0, 0);
    });
  }

  // XỬ LÝ MODAL (POPUP) "ADD A NEW CARD"
  const btnOpenModal = document.getElementById("btn-open-modal");
  const uploadPopup = document.getElementById("upload-popup");
  const closeBtns = document.querySelectorAll(".close-x");

  const closeModal = () => {
    if (uploadPopup) {
      uploadPopup.classList.add("hidden");
      uploadPopup.classList.remove("flex");
    }
  };

  if (btnOpenModal && uploadPopup) {
    btnOpenModal.addEventListener("click", () => {
      uploadPopup.classList.remove("hidden");
      uploadPopup.classList.add("flex");
    });

    closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

    uploadPopup.addEventListener("click", (e) => {
      if (e.target === uploadPopup) closeModal();
    });
  }

  // VALIDATE TRONG MODAL ADD CARD
  const btnModalAddCard = document.getElementById("btn-modal-add-card");
  const cardNumberInput = document.getElementById("card-number");
  const expDateInput = document.getElementById("exp-date");
  const cvcInput = document.getElementById("cvc-number");
  const cardNameInput = document.getElementById("card-name");

  if (btnModalAddCard) {
    const toggleError = (inputId, isError) => {
      const inputEl = document.getElementById(inputId);
      const errEl = document.getElementById(`err-${inputId}`);
      if (!inputEl || !errEl) return;
      if (isError) {
        inputEl.classList.add("border-red-500", "border-2");
        errEl.classList.remove("hidden");
      } else {
        inputEl.classList.remove("border-red-500", "border-2");
        errEl.classList.add("hidden");
      }
    };

    // Tự động xóa báo lỗi khi người dùng bắt đầu gõ lại vào ô bất kỳ
    [cardNumberInput, expDateInput, cvcInput, cardNameInput].forEach((input) => {
      if (input) {
        input.addEventListener("input", () => toggleError(input.id, false));
      }
    });

    btnModalAddCard.addEventListener("click", (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Validate Card Number (Bắt buộc 16 số, cho phép có khoảng trắng)
      if (cardNumberInput) {
        const rawCardVal = cardNumberInput.value.replace(/\s+/g, "");
        const cardRegex = /^\d{16}$/;
        if (!cardRegex.test(rawCardVal)) {
          toggleError("card-number", true);
          isValid = false;
        }
      }

      // 2. Validate Exp Date (Bắt buộc định dạng MM/YY, ví dụ: 12/25)
      if (expDateInput) {
        const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expRegex.test(expDateInput.value.trim())) {
          toggleError("exp-date", true);
          isValid = false;
        }
      }

      // 3. Validate CVC (Bắt buộc 3 hoặc 4 số)
      if (cvcInput) {
        const cvcRegex = /^\d{3,4}$/;
        if (!cvcRegex.test(cvcInput.value.trim())) {
          toggleError("cvc-number", true);
          isValid = false;
        }
      }

      // 4. Validate Name on Card (Không được để trống)
      if (cardNameInput) {
        if (cardNameInput.value.trim() === "") {
          toggleError("card-name", true);
          isValid = false;
        }
      }

      // Nếu tất cả đều đúng -> Báo thành công và đóng Modal
      if (isValid) {
        alert("Đã thêm thẻ thành công! Bạn có thể bấm Confirm Booking để tiếp tục.");
        closeModal();
      }
    });
  }
}
