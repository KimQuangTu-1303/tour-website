export async function initFavorites() {
  const container = document.getElementById("favorites-list");
  const placesCountText = document.querySelector('[data-target="places-list"] p');

  // 1. Lấy dữ liệu từ localStorage
  const favoriteIds = JSON.parse(localStorage.getItem("golobe_favorite_hotels")) || [];

  // 2. Cập nhật ngay con số trên tab khi tải trang
  if (placesCountText) {
    placesCountText.textContent = `${favoriteIds.length} marked`;
  }

  // 3. Nếu chưa có khách sạn nào được thả tim
  if (favoriteIds.length === 0) {
    if (container) {
      container.innerHTML = `
        <li class="text-center py-12 text-blackish-green/60 font-medium">
          Bạn chưa có khách sạn yêu thích nào trong danh sách.
        </li>`;
    }
    return;
  }

  try {
    // 4. Fetch JSON và render khung thẻ khách sạn đầy đủ (Đã có async nên dùng await bình thường)
    const response = await fetch("../assets/data/hotels.json");
    const allHotels = await response.json();
    const favHotels = allHotels.filter((hotel) => favoriteIds.includes(hotel.id));

    if (container) {
      container.innerHTML = favHotels
        .map(
          (hotel) => `
        <li>
          <article class="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] overflow-hidden">
            <div class="relative w-full h-64 md:h-full min-h-60">
              <img src="${hotel.image}" alt="${hotel.name}" class="absolute inset-0 w-full h-full object-cover" />
              <span class="absolute top-4 right-4 flex items-center justify-center px-2 py-1 bg-white/75 backdrop-blur-sm rounded text-xs font-semibold text-blackish-green leading-none">${hotel.imagesCount} images</span>
            </div>

            <div class="md:col-span-2 flex flex-col p-6">
              <div class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div class="flex flex-col gap-3">
                  <h2 class="text-2xl font-bold text-blackish-green leading-none m-0 pr-4">${hotel.name}</h2>
                  <span class="flex items-center gap-1 text-sm font-medium text-blackish-green/75">
                    <img src="../assets/image/location_light.svg" alt="location" class="w-4 h-4 shrink-0" />
                    ${hotel.location}
                  </span>

                  <div class="flex items-center gap-6 mt-1">
                    <span class="flex items-center gap-1 text-sm font-medium text-blackish-green">
                      <img src="../assets/image/5-stars.svg" alt="5 star" class="w-16" />
                      ${hotel.stars} Star Hotel
                    </span>
                    <span class="flex items-center gap-2 text-sm font-medium text-blackish-green">
                      <img src="../assets/image/cafe_light.svg" alt="amenities" class="w-4 h-4 shrink-0" />
                      <strong>${hotel.amenitiesCount}+</strong> Amenities
                    </span>
                  </div>

                  <div class="flex items-center gap-2 mt-1">
                    <span class="border border-mint-green rounded px-2 py-1 text-sm font-medium text-blackish-green">${hotel.rating}</span>
                    <span class="text-sm font-medium text-blackish-green"><strong>${hotel.ratingText}</strong> ${hotel.reviewsCount} reviews</span>
                  </div>
                </div>

                <div class="flex flex-col items-start md:items-end gap-1 shrink-0">
                  <span class="text-xs font-medium text-blackish-green/75">starting from</span>
                  <div class="flex items-baseline text-slamon">
                    <span class="text-3xl font-bold leading-none">$${hotel.price}</span>
                    <span class="text-sm font-bold leading-none">/night</span>
                  </div>
                  <span class="text-xs font-medium text-blackish-green/75">excl. tax</span>
                </div>
              </div>

              <div class="mt-auto">
                <div class="w-full h-px bg-blackish-green/25 mb-6"></div>
                <div class="flex gap-4">
                  <label class="btn-favorite group">
                    <input type="checkbox" class="peer hidden" data-id="${hotel.id}" checked />
                    <div class="w-5 h-5 bg-[url('../image/heart_dark.svg')] bg-center bg-contain bg-no-repeat peer-checked:bg-[url('../image/heart_light.svg')] transition-all"></div>
                    <div class="absolute inset-0 bg-mint-green rounded -z-10 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </label>
                  <a href="hotel-detail-page.html?id=${hotel.id}" class="btn-view-place no-underline">View Place</a>
                </div>
              </div>
            </div>
          </article>
        </li>`,
        )
        .join("");

      attachUnfavoriteEvent();
    }
  } catch (err) {
    console.error("Lỗi nạp dữ liệu khách sạn yêu thích:", err);
  }
}

function attachUnfavoriteEvent() {
  const checkboxes = document.querySelectorAll("#favorites-list .btn-favorite input");
  const placesCountText = document.querySelector('[data-target="places-list"] p');

  checkboxes.forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.getAttribute("data-id");
      let favoriteIds = JSON.parse(localStorage.getItem("golobe_favorite_hotels")) || [];

      // 1. Cập nhật localStorage
      favoriteIds = favoriteIds.filter((favId) => favId !== id);
      localStorage.setItem("golobe_favorite_hotels", JSON.stringify(favoriteIds));

      // 2. Xóa phần tử <li> bị bỏ tim khỏi giao diện
      const liCard = e.target.closest("li");
      if (liCard) liCard.remove();

      // 3. Cập nhật lại số lượng ở tab ("X marked")
      if (placesCountText) {
        placesCountText.textContent = `${favoriteIds.length} marked`;
      }

      // 4. Kiểm tra nếu mảng rỗng thì hiện thông báo ngay lập tức
      const container = document.getElementById("favorites-list");
      if (favoriteIds.length === 0 && container) {
        container.innerHTML = `
          <li class="text-center py-12 text-blackish-green/60 font-medium">
            Bạn chưa có khách sạn yêu thích nào trong danh sách.
          </li>`;
      }
    });
  });
}
