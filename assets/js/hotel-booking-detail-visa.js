document.addEventListener("DOMContentLoaded", () => {
  function setupUploadPopup(inputId, popupId) {
    const fileInput = document.getElementById(inputId);
    const popup = document.getElementById(popupId);

    if (!fileInput || !popup) return;

    const closeButtons = popup.querySelectorAll(".close-x");

    const closePopup = () => {
      popup.classList.add("hidden");
      popup.classList.remove("flex");
      fileInput.value = "";
    };

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        popup.classList.remove("hidden");
        popup.classList.add("flex");
      } else {
        closePopup();
      }
    });

    closeButtons.forEach((btn) => btn.addEventListener("click", closePopup));

    popup.addEventListener("click", (e) => {
      if (e.target === popup) closePopup();
    });
  }

  setupUploadPopup("image-upload", "upload-popup");
});
