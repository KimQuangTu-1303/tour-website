export function initAccountTabs() {
  // --- 1. XỬ LÝ MAIN TABS (Account / History / Payment) ---
  const mainTabs = document.querySelectorAll(".main-tab");
  const accountContents = document.querySelectorAll(".account-content");
  const mainIndicator = document.querySelector(".main-tab-indicator");

  function updateMainIndicator(tab) {
    if (!mainIndicator || !tab) return;
    // Dịch chuyển thanh chỉ thị xanh
    mainIndicator.style.width = `${tab.offsetWidth}px`;
    mainIndicator.style.transform = `translateX(${tab.offsetLeft}px)`;
  }

  mainTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Đổi class active cho tab
      mainTabs.forEach((t) => t.classList.remove("main-tab--active"));
      tab.classList.add("main-tab--active");
      updateMainIndicator(tab);

      // Ẩn/Hiện nội dung tương ứng
      const targetId = tab.getAttribute("data-target");
      accountContents.forEach((content) => {
        if (content.id === targetId) {
          content.classList.remove("hidden");
          content.classList.add(targetId === "account-section" ? "block" : "flex");
        } else {
          content.classList.add("hidden");
          content.classList.remove("block", "flex");
        }
      });

      // Nếu mở History, cập nhật lại thanh gạch dưới của sub-tab
      if (targetId === "history-section") {
        const activeSub = document.querySelector(".sub-tab--active");
        if (activeSub) updateSubIndicator(activeSub);
      }
    });
  });

  // --- 2. XỬ LÝ SUB TABS (Flights / Stays trong History) ---
  const subTabs = document.querySelectorAll(".sub-tab");
  const historyLists = document.querySelectorAll(".history-list-content");
  const subIndicator = document.querySelector(".sub-indicator");

  function updateSubIndicator(tab) {
    if (!subIndicator || !tab) return;
    subIndicator.style.width = `${tab.offsetWidth}px`;
    subIndicator.style.transform = `translateX(${tab.offsetLeft}px)`;
  }

  subTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      subTabs.forEach((t) => t.classList.remove("sub-tab--active"));
      tab.classList.add("sub-tab--active");
      updateSubIndicator(tab);

      const targetId = tab.getAttribute("data-target");
      historyLists.forEach((list) => {
        if (list.id === targetId) {
          list.classList.remove("hidden");
          list.classList.add("flex");
        } else {
          list.classList.add("hidden");
          list.classList.remove("flex");
        }
      });
    });
  });

  // --- 3. KHỞI TẠO INDICATOR LÚC MỚI VÀO TRANG ---
  setTimeout(() => {
    const activeMain = document.querySelector(".main-tab--active");
    if (activeMain) updateMainIndicator(activeMain);

    const activeSub = document.querySelector(".sub-tab--active");
    if (activeSub) updateSubIndicator(activeSub);
  }, 100);

  // --- 4. XỬ LÝ ĐÓNG MỞ MODAL PAYMENT ---
  const openModalBtn = document.getElementById("open-popup-btn");
  const uploadPopup = document.getElementById("upload-popup");
  const closeBtns = document.querySelectorAll(".close-x");

  if (openModalBtn && uploadPopup) {
    const closeModal = () => {
      uploadPopup.classList.add("hidden");
      uploadPopup.classList.remove("flex");
    };

    openModalBtn.addEventListener("click", () => {
      uploadPopup.classList.remove("hidden");
      uploadPopup.classList.add("flex");
    });

    closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

    uploadPopup.addEventListener("click", (e) => {
      // Đóng khi click ra ngoài vùng xám
      if (e.target === uploadPopup) closeModal();
    });
  }

  // --- 5. VALIDATE TRONG MODAL ADD CARD ---
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

    // Tự động xóa báo lỗi khi người dùng bắt đầu gõ lại
    [cardNumberInput, expDateInput, cvcInput, cardNameInput].forEach((input) => {
      if (input) {
        input.addEventListener("input", () => toggleError(input.id, false));
      }
    });

    btnModalAddCard.addEventListener("click", (e) => {
      e.preventDefault();
      let isValid = true;

      if (cardNumberInput) {
        const rawCardVal = cardNumberInput.value.replace(/\s+/g, "");
        if (!/^\d{16}$/.test(rawCardVal)) {
          toggleError("card-number", true);
          isValid = false;
        }
      }

      if (expDateInput) {
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDateInput.value.trim())) {
          toggleError("exp-date", true);
          isValid = false;
        }
      }

      if (cvcInput) {
        if (!/^\d{3,4}$/.test(cvcInput.value.trim())) {
          toggleError("cvc-number", true);
          isValid = false;
        }
      }

      if (cardNameInput) {
        if (cardNameInput.value.trim() === "") {
          toggleError("card-name", true);
          isValid = false;
        }
      }

      if (isValid) {
        alert("Đã thêm thẻ mới thành công vào tài khoản!");
        uploadPopup.classList.add("hidden");
        uploadPopup.classList.remove("flex");
      }
    });
  }
}
