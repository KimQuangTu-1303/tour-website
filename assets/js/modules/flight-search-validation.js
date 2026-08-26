export function initFlightSearchValidation() {
  const fromToInput = document.getElementById("from-to");
  const tripInput = document.getElementById("trip");
  const departReturnInput = document.getElementById("depart-return");
  const passengerClassInput = document.getElementById("passenger-class");

  // 1. ĐỒNG BỘ DỮ LIỆU TỪ URL SAU KHI SEARCH
  const urlParams = new URLSearchParams(window.location.search);
  if (fromToInput && urlParams.get("from-to")) fromToInput.value = urlParams.get("from-to");
  if (tripInput && urlParams.get("trip")) tripInput.value = urlParams.get("trip");
  if (departReturnInput && urlParams.get("depart-return")) departReturnInput.value = urlParams.get("depart-return");
  if (passengerClassInput && urlParams.get("passenger-class")) passengerClassInput.value = urlParams.get("passenger-class");

  if (!departReturnInput) return;

  // Tìm Form chứa nút Search
  const flightForm = departReturnInput.closest("form");

  // 2. HÀM KIỂM TRA NGÀY ĐI VÀ NGÀY VỀ
  const validateFlightDates = (e) => {
    const val = departReturnInput.value;
    if (!val) return;

    const dates = val.split("-");

    // Chặn nhập linh tinh (vd: "-9") không đủ 2 vế Ngày đi và Ngày về
    if (dates.length !== 2 || dates[0].trim() === "" || dates[1].trim() === "") {
      alert("Vui lòng nhập đầy đủ: Ngày đi - Ngày về (VD: 07 Nov 22 - 13 Nov 22)");
      if (e) e.preventDefault(); // Khóa nút Search
      return;
    }

    const departDate = new Date(dates[0].trim());
    const returnDate = new Date(dates[1].trim());

    // Chặn nếu định dạng ngày bị sai (JS không đọc được)
    if (isNaN(departDate.getTime()) || isNaN(returnDate.getTime())) {
      alert("Định dạng ngày không hợp lệ! Vui lòng nhập theo mẫu DD MMM YY");
      if (e) e.preventDefault(); // Khóa nút Search
      return;
    }

    // Chặn nếu ngày về trước ngày đi
    if (returnDate < departDate) {
      alert("Ngày về không được trước ngày đi!");
      departReturnInput.value = dates[0].trim() + " - ";
      if (e) e.preventDefault(); // Khóa nút Search
    }
  };

  // 3. RÀNG BUỘC VÀO NÚT SEARCH VÀ Ô INPUT
  if (flightForm) {
    // Bắt chết sự kiện khi bấm nút Search
    flightForm.addEventListener("submit", validateFlightDates);
  }

  // Vẫn kiểm tra sớm ngay khi người dùng rời ô text
  departReturnInput.addEventListener("change", () => validateFlightDates());
}
