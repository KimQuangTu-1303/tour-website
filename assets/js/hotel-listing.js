// ==========================================
// 1. XỬ LÝ PRICE SLIDER
// ==========================================
const sliderMin = document.getElementById("slider-min");
const sliderMax = document.getElementById("slider-max");
const sliderFill = document.getElementById("slider-fill");
const labelMin = document.getElementById("label-min");
const labelMax = document.getElementById("label-max");
const minGap = 210;

if (sliderMin && sliderMax) {
  function updateSliderUI() {
    let minVal = parseInt(sliderMin.value);
    let maxVal = parseInt(sliderMax.value);

    labelMin.textContent = "$" + minVal;
    labelMax.textContent = "$" + maxVal;

    const minPercent = ((minVal - sliderMin.min) / (sliderMin.max - sliderMin.min)) * 100;
    const maxPercent = ((maxVal - sliderMax.min) / (sliderMax.max - sliderMax.min)) * 100;

    sliderFill.style.left = minPercent + "%";
    sliderFill.style.width = maxPercent - minPercent + "%";
  }

  sliderMin.addEventListener("input", function () {
    let minVal = parseInt(sliderMin.value);
    let maxVal = parseInt(sliderMax.value);
    if (maxVal - minVal < minGap) {
      sliderMin.value = maxVal - minGap;
    }
    updateSliderUI();
  });

  sliderMax.addEventListener("input", function () {
    let minVal = parseInt(sliderMin.value);
    let maxVal = parseInt(sliderMax.value);
    if (maxVal - minVal < minGap) {
      sliderMax.value = minVal + minGap;
    }
    updateSliderUI();
  });

  updateSliderUI();
}

// ==========================================
// 2. XỬ LÝ SORT DROPDOWN
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("sort-dropdown");

  // Chỉ chạy khối lệnh này nếu dropdown tồn tại trên trang
  if (dropdown) {
    const trigger = dropdown.querySelector(".sort-dropdown__trigger");
    const options = dropdown.querySelectorAll(".sort-dropdown__option");
    const selectedText = dropdown.querySelector(".sort-dropdown__selected");
    const hiddenInput = document.getElementById("sort-input");

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("is-open");
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const text = this.textContent;
        const value = this.getAttribute("data-value");

        selectedText.textContent = text;
        if (hiddenInput) hiddenInput.value = value;

        options.forEach((opt) => opt.classList.remove("sort-dropdown__option--active"));
        this.classList.add("sort-dropdown__option--active");
        dropdown.classList.remove("is-open");
      });
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
      }
    });
  }
});
