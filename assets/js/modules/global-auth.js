export function initGlobalAuth() {
  const currentUser = JSON.parse(localStorage.getItem("golobe_current_user"));

  const guestMenu = document.getElementById("guest-menu");
  const loggedInMenu = document.getElementById("logged-in-menu");
  const displayUserName = document.getElementById("display-user-name");
  const displayUserAvatar = document.getElementById("display-user-avatar");

  // 1. ĐỒNG BỘ HIỂN THỊ HEADER
  if (currentUser && currentUser.isLoggedIn) {
    if (guestMenu) {
      guestMenu.classList.add("hidden");
    }

    if (loggedInMenu) {
      loggedInMenu.classList.remove("hidden");
      loggedInMenu.classList.add("flex");
    }

    if (displayUserName) {
      displayUserName.textContent = currentUser.name;
    }

    if (displayUserAvatar && currentUser.avatar) {
      displayUserAvatar.src = currentUser.avatar;
    }
  }

  // 2. XỬ LÝ ĐÓNG / MỞ DROPDOWN AVATAR
  const userMenuBtn = document.getElementById("user-menu-button");
  const userDropdown = document.getElementById("user-dropdown");

  if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
      userDropdown.classList.toggle("hidden");
      userDropdown.classList.toggle("flex");
    });
  }

  // Đóng Dropdown khi click ra khoảng trống bất kỳ trên web
  document.addEventListener("click", (e) => {
    if (userDropdown && !userDropdown.contains(e.target) && userMenuBtn && !userMenuBtn.contains(e.target)) {
      userDropdown.classList.add("hidden");
      userDropdown.classList.remove("flex");
    }
  });

  // 3. XỬ LÝ LỆNH ĐĂNG XUẤT (LOGOUT)
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();

      // Xóa phiên đăng nhập (Không xóa mảng users)
      localStorage.removeItem("golobe_current_user");

      alert("Đã đăng xuất thành công!");

      // Reload lại chính trang hiện tại để giao diện quay về Guest
      window.location.reload();
    });
  }
}
