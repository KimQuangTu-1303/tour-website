document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-popup-btn");
  const popup = document.getElementById("upload-popup");

  if (!openBtn || !popup) return;

  const closeButtons = popup.querySelectorAll(".close-x");

  const closePopup = () => {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
  };

  // Mở popup khi click vào nút "Add a new card"
  openBtn.addEventListener("click", () => {
    popup.classList.remove("hidden");
    popup.classList.add("flex");
  });

  // Đóng popup khi click vào nút X
  closeButtons.forEach((btn) => btn.addEventListener("click", closePopup));

  // Đóng popup khi click ra ngoài vùng nền tối
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closePopup();
  });
});
