function initNav() {
  // --- 1. MOBILE MENU (HAMBURGER) ---
  const mobileToggle = document.querySelector('[aria-controls="nav-mobile"]');
  const mobileMenu = document.getElementById("nav-mobile");

  function setMobileOpen(open) {
    if (!mobileMenu || !mobileToggle) return;
    mobileMenu.classList.toggle("hidden", !open);
    mobileToggle.setAttribute("aria-expanded", String(open));
    mobileToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  const isMobileOpen = () => mobileToggle?.getAttribute("aria-expanded") === "true";

  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Chặn sự kiện click nảy ra ngoài
      setMobileOpen(!isMobileOpen());
    });
  }

  // --- 2. USER MENU (AVATAR) ---
  const userToggle = document.getElementById("user-menu-button");
  const userMenu = document.getElementById("user-dropdown");

  function setUserOpen(open) {
    if (!userMenu || !userToggle) return;

    if (open) {
      userMenu.classList.remove("hidden");
      userMenu.classList.add("flex"); // Tailwind yêu cầu flex để hiển thị dọc
    } else {
      userMenu.classList.add("hidden");
      userMenu.classList.remove("flex");
    }
    userToggle.setAttribute("aria-expanded", String(open));
  }
  const isUserOpen = () => userToggle?.getAttribute("aria-expanded") === "true";

  if (userToggle) {
    userToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setUserOpen(!isUserOpen());
    });
  }

  // --- 3. CLOSE MENU ---
  document.addEventListener("click", (e) => {
    if (isMobileOpen() && !e.target.closest("#nav-mobile") && !e.target.closest('[aria-controls="nav-mobile"]')) {
      setMobileOpen(false);
    }

    if (isUserOpen() && !e.target.closest("#user-dropdown") && !e.target.closest("#user-menu-button")) {
      setUserOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (isMobileOpen()) setMobileOpen(false);
      if (isUserOpen()) setUserOpen(false);
    }
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (e.matches && isMobileOpen()) {
      setMobileOpen(false);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNav);
} else {
  initNav();
}
