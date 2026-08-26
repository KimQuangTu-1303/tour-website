import { initNav } from "./modules/header-nav.js";
import { initGlobalAuth } from "./modules/global-auth.js";
import { initLogin } from "./modules/login.js";
import { initHome } from "./modules/index.js";
import { initHotelListing } from "./modules/hotel-listing.js";
import { initFavorites } from "./modules/favourites.js";
import { initHotelBookingDetail } from "./modules/hotel-booking-detail.js";
import { initSignup } from "./modules/signup.js";
import { initSearchValidation } from "./modules/search-validation.js";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initGlobalAuth();

  const path = window.location.pathname;

  // Thêm điều kiện nhận diện trang chủ (index.html hoặc đường dẫn gốc /)
  if (path.endsWith("/") || path.includes("index.html")) {
    initHome();
  }

  if (path.includes("login.html")) {
    initLogin();
  }

  if (path.includes("signup.html")) {
    initSignup();
  }

  if (path.includes("favorites.html")) {
    initFavorites();
  }

  if (path.includes("hotel-booking-detail.html")) {
    initHotelBookingDetail();
  }

  if (path.includes("hotel-listing.html")) {
    initHotelListing();
  }

  if (path.includes("find-stays.html") || path.includes("hotel-listing.html")) {
    initSearchValidation();
  }
});