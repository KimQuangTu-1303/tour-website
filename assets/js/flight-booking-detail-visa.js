function setupUploadPopup(inputId, popupId) {
    const fileInput = document.getElementById(inputId);
    const popup = document.getElementById(popupId);
    if (!fileInput || !popup) return; 
    const closeButtons = popup.querySelectorAll('.popup-btn, .close-x');
    const closePopup = () => {
        popup.style.display = 'none';
        fileInput.value = ""; 
    };
    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            popup.style.display = 'flex';
        } else {
            popup.style.display = 'none';
        }
    });
    closeButtons.forEach(btn => btn.addEventListener('click', closePopup));
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });
}
setupUploadPopup('image-upload', 'upload-popup');