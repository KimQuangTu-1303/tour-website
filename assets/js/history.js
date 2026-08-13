// ==========================================
// 1. XỬ LÝ MAIN TABS (Account / History / Payment)
// ==========================================
const mainTabs = document.querySelectorAll(".main-tab");
const mainIndicator = document.querySelector(".slide-indicator");

function moveMainIndicator(tab) {
  if (!mainIndicator) return;

  const tabStyle = window.getComputedStyle(tab);
  const paddingLeft = parseFloat(tabStyle.paddingLeft);
  const paddingRight = parseFloat(tabStyle.paddingRight);

  const contentWidth = tab.clientWidth - paddingLeft - paddingRight;
  const tabLeft = tab.offsetLeft + paddingLeft;

  mainIndicator.style.width = `${contentWidth}px`;
  mainIndicator.style.transform = `translateX(${tabLeft}px)`;
}

// Khởi tạo vị trí thanh slide chính khi load trang
window.addEventListener("load", function () {
  const activeMainTab = document.querySelector(".main-tab--active");
  if (activeMainTab) {
    moveMainIndicator(activeMainTab);
  }
});

// Lắng nghe click Main Tabs
mainTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    mainTabs.forEach((t) => t.classList.remove("main-tab--active"));
    this.classList.add("main-tab--active");
    moveMainIndicator(this);
  });
});

// ==========================================
// 2. XỬ LÝ SUB-TABS (Flights / Stays) TRONG HISTORY
// ==========================================
const subTabs = document.querySelectorAll(".sub-tab");
const subIndicator = document.querySelector(".sub-indicator");

function moveSubIndicator(tab) {
  if (!subIndicator) return;

  const tabStyle = window.getComputedStyle(tab);
  const paddingLeft = parseFloat(tabStyle.paddingLeft);
  const paddingRight = parseFloat(tabStyle.paddingRight);

  const contentWidth = tab.clientWidth - paddingLeft - paddingRight;
  const tabLeft = tab.offsetLeft + paddingLeft;

  subIndicator.style.width = `${contentWidth}px`;
  subIndicator.style.transform = `translateX(${tabLeft}px)`;
}

// Khởi tạo vị trí thanh slide phụ khi load trang
window.addEventListener("load", function () {
  const activeSubTab = document.querySelector(".sub-tab--active");
  if (activeSubTab) {
    moveSubIndicator(activeSubTab);
  }
});

// Lắng nghe click Sub Tabs
subTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    subTabs.forEach((t) => t.classList.remove("sub-tab--active"));
    this.classList.add("sub-tab--active");
    moveSubIndicator(this);
  });
});
