export function initSearchValidation() {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const checkinIcon = document.getElementById("checkin-icon");
  const checkoutIcon = document.getElementById("checkout-icon");
  const destinationInput = document.getElementById("destination");
  const guestsInput = document.getElementById("guests");

  // 1. TỰ ĐỘNG ĐỒNG BỘ DỮ LIỆU TỪ URL
  const urlParams = new URLSearchParams(window.location.search);
  if (destinationInput && urlParams.get("destination")) destinationInput.value = urlParams.get("destination");
  if (guestsInput && urlParams.get("guests")) guestsInput.value = urlParams.get("guests");
  if (checkinInput && urlParams.get("checkin")) checkinInput.value = urlParams.get("checkin");
  if (checkoutInput && urlParams.get("checkout")) checkoutInput.value = urlParams.get("checkout");

  if (!checkinInput || !checkoutInput) return;

  // 2. SỰ KIỆN CLICK ICON MỞ BẢNG LỊCH
  const openDatePicker = (inputElement) => {
    if ("showPicker" in HTMLInputElement.prototype) {
      inputElement.showPicker();
    } else {
      inputElement.focus();
    }
  };

  if (checkinIcon) checkinIcon.addEventListener("click", () => openDatePicker(checkinInput));
  if (checkoutIcon) checkoutIcon.addEventListener("click", () => openDatePicker(checkoutInput));

  // 3. HÀM TÍNH NGÀY KẾ TIẾP (YYYY-MM-DD)
  const getNextDayString = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  // Lấy ngày hôm nay làm mốc nhỏ nhất cho Check-in
  const today = new Date().toISOString().split("T")[0];
  checkinInput.setAttribute("min", today);

  // 4. CẬP NHẬT RÀNG BUỘC CHO CHECK-OUT
  const updateCheckoutMinDate = () => {
    if (checkinInput.value) {
      const minCheckoutDate = getNextDayString(checkinInput.value);
      checkoutInput.setAttribute("min", minCheckoutDate);

      // Nếu Check-out nhỏ hơn hoặc BẰNG Check-in thì xóa trắng
      if (checkoutInput.value && checkoutInput.value <= checkinInput.value) {
        checkoutInput.value = "";
        alert("Ngày Check-out phải sau ngày Check-in ít nhất 1 ngày!");
      }
    }
  };

  // Kiểm tra lần đầu khi vừa tải trang
  updateCheckoutMinDate();

  // Lắng nghe sự kiện khi người dùng đổi ngày Check-in
  checkinInput.addEventListener("change", updateCheckoutMinDate);

  // Lắng nghe sự kiện nếu người dùng cố tình chọn Check-out trước
  checkoutInput.addEventListener("change", () => {
    if (checkinInput.value && checkoutInput.value <= checkinInput.value) {
      checkoutInput.value = "";
      alert("Ngày Check-out phải sau ngày Check-in ít nhất 1 ngày!");
    }
  });
}
