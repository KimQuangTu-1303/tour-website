window.toggleReview = function(button) {
  const reviewText = button.previousElementSibling;
  const isClamped = reviewText.classList.contains('line-clamp-2');
  
  if (isClamped) {
    reviewText.classList.remove('line-clamp-2');
    button.textContent = 'View less';
  } else {
    reviewText.classList.add('line-clamp-2');
    button.textContent = 'View more';
  }
};

window.swapLocations = function(button) {
  // Tìm ô input nằm ngay trong cùng thẻ bọc (parent container)
  const container = button.closest('div.border');
  const input = container.querySelector('input[name="from-to"]');
  
  if (input && input.value.includes('-')) {
    // Tách chuỗi theo dấu gạch ngang
    let parts = input.value.split('-').map(item => item.trim());
    if (parts.length === 2) {
      // Đảo ngược vị trí và gán lại giá trị mới
      input.value = `${parts[1]} - ${parts[0]}`;
    }
  }
};