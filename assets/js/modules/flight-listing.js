export function initFlightListing() {
  let allFlights = [];

  // 1. XỬ LÝ PRICE SLIDER
  const priceMin = document.getElementById("slider-min");
  const priceMax = document.getElementById("slider-max");
  const sliderFill = document.getElementById("slider-fill");
  const labelMin = document.getElementById("label-min");
  const labelMax = document.getElementById("label-max");
  const minGap = 100;

  function updatePriceSlider() {
    if (!priceMin || !priceMax || !sliderFill) return;
    let minVal = parseInt(priceMin.value);
    let maxVal = parseInt(priceMax.value);

    if (maxVal - minVal < minGap) {
      if (this === priceMin) priceMin.value = maxVal - minGap;
      else priceMax.value = minVal + minGap;
      minVal = parseInt(priceMin.value);
      maxVal = parseInt(priceMax.value);
    }

    labelMin.textContent = "$" + minVal;
    labelMax.textContent = "$" + maxVal;

    const minPercent = ((minVal - priceMin.min) / (priceMin.max - priceMin.min)) * 100;
    const maxPercent = ((maxVal - priceMax.min) / (priceMax.max - priceMax.min)) * 100;

    sliderFill.style.left = minPercent + "%";
    sliderFill.style.width = maxPercent - minPercent + "%";
  }

  if (priceMin && priceMax) {
    priceMin.addEventListener("input", updatePriceSlider);
    priceMax.addEventListener("input", updatePriceSlider);

    priceMin.addEventListener("change", runFlightFilter);
    priceMax.addEventListener("change", runFlightFilter);
    updatePriceSlider();
  }

  // 2. XỬ LÝ TIME SLIDER (Departure Time)
  const timeMin = document.getElementById("slider-min-time");
  const timeMax = document.getElementById("slider-max-time");
  const timeFill = document.getElementById("slider-fill-time");
  const timeMinText = document.getElementById("label-min-time");
  const timeMaxText = document.getElementById("label-max-time");
  const minTimeGap = 120; // Khoảng cách tối thiểu 2 giờ (120 phút)

  function formatMinutesToTime(totalMinutes) {
    // Khóa mức tối đa 1440 phút thành 11:59 pm của cuối ngày
    if (totalMinutes >= 1440) return "11:59 pm";

    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let hours12 = hours24 % 12 || 12;
    return `${hours12}:${minutes < 10 ? "0" : ""}${minutes} ${hours24 >= 12 ? "pm" : "am"}`;
  }

  function updateTimeSeries(e) {
    if (!timeMin || !timeMax) return;
    let minVal = parseInt(timeMin.value);
    let maxVal = parseInt(timeMax.value);

    if (maxVal - minVal < minTimeGap) {
      if (e && e.target === timeMin) {
        timeMin.value = maxVal - minTimeGap;
      } else {
        timeMax.value = minVal + minTimeGap;
      }
      minVal = parseInt(timeMin.value);
      maxVal = parseInt(timeMax.value);
    }

    if (timeMinText) timeMinText.textContent = formatMinutesToTime(minVal);
    if (timeMaxText) timeMaxText.textContent = formatMinutesToTime(maxVal);

    if (timeFill) {
      const minPercent = ((minVal - timeMin.min) / (timeMin.max - timeMin.min)) * 100;
      const maxPercent = ((maxVal - timeMax.min) / (timeMax.max - timeMax.min)) * 100;

      timeFill.style.left = minPercent + "%";
      timeFill.style.width = maxPercent - minPercent + "%";
    }
  }

  if (timeMin && timeMax) {
    timeMin.addEventListener("input", updateTimeSeries);
    timeMax.addEventListener("input", updateTimeSeries);

    timeMin.addEventListener("change", runFlightFilter);
    timeMax.addEventListener("change", runFlightFilter);
    updateTimeSeries();
  }

  function parseTimeToMinutes(timeStr) {
    const timeMatch = timeStr.trim().match(/(\d+):(\d+)\s*(am|pm)/i);
    if (!timeMatch) return 0;
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);
    const period = timeMatch[3].toLowerCase();

    if (hours === 12) hours = 0;
    if (period === "pm") hours += 12;
    return hours * 60 + minutes;
  }

  // 3. XỬ LÝ TABS & TRƯỢT INDICATOR
  const tabItems = document.querySelectorAll(".flight-results__tab");
  const indicator = document.querySelector(".slide-indicator");

  function moveIndicator(tab) {
    if (!indicator) return;
    const tabStyle = window.getComputedStyle(tab);
    const paddingLeft = parseFloat(tabStyle.paddingLeft);
    const paddingRight = parseFloat(tabStyle.paddingRight);

    const contentWidth = tab.clientWidth - paddingLeft - paddingRight;
    const tableLeft = tab.offsetLeft + paddingLeft;

    indicator.style.width = `${contentWidth}px`;
    indicator.style.transform = `translateX(${tableLeft}px)`;
  }

  tabItems.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabItems.forEach((item) => item.classList.remove("flight-results__tab--active"));
      this.classList.add("flight-results__tab--active");
      moveIndicator(this);
      runFlightFilter();
    });
  });

  window.addEventListener("load", () => {
    const activeTab = document.querySelector(".flight-results__tab--active");
    if (activeTab) moveIndicator(activeTab);
  });

  // 4. LỌC CHUYẾN BAY (TÍCH HỢP TOÀN BỘ FILTER)
  function runFlightFilter() {
    const listContainer = document.getElementById("ticket-list");
    if (!listContainer) return;

    // A. Lấy điều kiện từ Tab
    const activeTab = document.querySelector(".flight-results__tab--active");
    const currentTabType = activeTab ? activeTab.getAttribute("data-target") : "cheapest";

    const currentMinPrice = priceMin ? parseInt(priceMin.value) : 0;
    const currentMaxPrice = priceMax ? parseInt(priceMax.value) : 1200;

    const currentMinTime = timeMin ? parseInt(timeMin.value) : 0;
    const currentMaxTime = timeMax ? parseInt(timeMax.value) : 1440;

    const checkedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map((cb) => parseFloat(cb.value));
    const checkedAirlines = Array.from(document.querySelectorAll('input[name="airlines"]:checked')).map((cb) => cb.value);

    // THÊM: Lấy điều kiện từ Trips
    const checkedTrips = Array.from(document.querySelectorAll('input[name="trips"]:checked')).map((cb) => cb.value);

    // THỰC HIỆN LỌC
    const filteredFlights = allFlights.filter((flight) => {
      const matchType = flight.type === currentTabType;
      const matchPrice = flight.price >= currentMinPrice && flight.price <= currentMaxPrice;
      const matchRating = checkedRatings.length === 0 || checkedRatings.some((r) => flight.rating >= r);
      const matchAirline = checkedAirlines.length === 0 || checkedAirlines.includes(flight.airlineName);

      // THÊM: Lọc theo Trip
      const matchTrip = checkedTrips.length === 0 || checkedTrips.includes(flight.trip);

      let matchTime = true;
      if (flight.flights && flight.flights.length > 0) {
        const departTimeStr = flight.flights[0].time.split("-")[0];
        const departMinutes = parseTimeToMinutes(departTimeStr);
        matchTime = departMinutes >= currentMinTime && departMinutes <= currentMaxTime;
      }

      // Nối matchTrip vào điều kiện return
      return matchType && matchPrice && matchRating && matchAirline && matchTime && matchTrip;
    });
    // Cập nhật số lượng
    const countDisplay = document.getElementById("result-count");
    if (countDisplay) {
      countDisplay.innerHTML = `Showing ${filteredFlights.length} of <span class="text-slamon">${allFlights.length} flights</span>`;
    }

    if (filteredFlights.length === 0) {
      listContainer.innerHTML = `<p class="text-center font-medium mt-10 w-full col-span-full text-blackish-green/75">Không tìm thấy chuyến bay nào phù hợp với bộ lọc.</p>`;
      return;
    }

    renderTickets(filteredFlights);
  }

  // 5. GẮN SỰ KIỆN CHO CÁC CHECKBOX BỘ LỌC

  let currentBaseRating = null;

  document.querySelectorAll('input[name="rating"]').forEach((cb) => {
    cb.addEventListener("click", function () {
      const clickedValue = parseInt(this.value);

      if (currentBaseRating === clickedValue) {
        document.querySelectorAll('input[name="rating"]').forEach((otherCb) => {
          otherCb.checked = false;
        });
        currentBaseRating = null;
      } else {
        document.querySelectorAll('input[name="rating"]').forEach((otherCb) => {
          const otherValue = parseInt(otherCb.value);
          otherCb.checked = otherValue >= clickedValue;
        });
        currentBaseRating = clickedValue;
      }

      runFlightFilter();
    });
  });

  document.querySelectorAll('input[name="airlines"]').forEach((cb) => {
    cb.addEventListener("change", runFlightFilter);
  });

  document.querySelectorAll('input[name="trips"]').forEach((cb) => {
    cb.addEventListener("change", runFlightFilter);
  });

  // 6. RENDER VÀ FETCH DỮ LIỆU
  function updateTabSubtitles() {
    const tabs = document.querySelectorAll(".flight-results__tab");
    tabs.forEach((tab) => {
      const targetType = tab.getAttribute("data-target");
      const categoryFlights = allFlights.filter((flight) => flight.type === targetType);

      const subtitleEl = tab.querySelector("p");
      if (subtitleEl) {
        if (categoryFlights.length > 0) {
          const minPrice = Math.min(...categoryFlights.map((f) => f.price));
          const duration = categoryFlights[0].flights[0].duration;
          subtitleEl.textContent = `$${minPrice} . ${duration}`;
        } else {
          subtitleEl.textContent = "Không có vé";
        }
      }
    });
  }

  async function fetchFlightTickets() {
    try {
  const response = await fetch("/assets/data/flights.json?v=" + new Date().getTime());
      if (!response.ok) return;

      allFlights = await response.json();

      updateTabSubtitles();
      runFlightFilter();
    } catch (error) {
      console.log("File JSON chuyến bay không tồn tại hoặc không ở trang danh sách:", error);
    }
  }

  function renderTickets(ticketsData) {
    const container = document.getElementById("ticket-list");
    const template = document.getElementById("ticket-template");
    if (!container || !template) return;

    container.innerHTML = "";

    ticketsData.forEach((ticket) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".ticket-card__airline-logo").src = ticket.airlineLogo;
      clone.querySelector(".ticket-card__airline-logo").alt = ticket.airlineName;
      clone.querySelector(".ticket-card__score").textContent = ticket.rating;
      clone.querySelector(".ticket-card__rating-text").textContent = ticket.ratingText;
      clone.querySelector(".ticket-card__review-count").textContent = `${ticket.reviewsCount} reviews`;
      clone.querySelector(".ticket-card__price-value").textContent = `$${ticket.price}`;

      const priceUnitEl = clone.querySelector(".ticket-card__price-unit");
      if (priceUnitEl) {
        priceUnitEl.textContent = ticket.priceUnit ? `${ticket.priceUnit}` : "";
      }

      const flightsContainer = clone.querySelector(".ticket-card__flights");
      ticket.flights.forEach((flight) => {
        const flightRow = document.createElement("div");
        flightRow.className = "flex justify-between md:justify-start gap-2 md:gap-10 w-full";

        flightRow.innerHTML = `
          <input type="checkbox" class="appearance-none w-4 h-4 md:w-5 md:h-5 border-2 border-blackish-green/40 rounded-sm checked:border-mint-green checked:bg-mint-green checked:bg-[url('../image/check_success.svg')] bg-center bg-no-repeat transition-all cursor-pointer shrink-0" >
          <div class="flex flex-col justify-center flex-1 md:flex-none">
            <strong class="text-[11px] sm:text-[14px] md:text-base text-blackish-green font-semibold leading-tight">${flight.time}</strong>
            <span class="text-[10px] sm:text-[12px] md:text-sm text-blackish-green/50 mt-1">${flight.airline}</span>
          </div>
          <div class="text-[10px] sm:text-[13px] md:text-sm font-semibold text-blackish-green/75 shrink-0 text-center px-1">
            ${flight.type}
          </div>
          <div class="flex flex-col justify-center flex-1 md:flex-none text-right md:text-left">
            <strong class="text-[11px] sm:text-[14px] md:text-base text-blackish-green font-semibold leading-tight">${flight.duration}</strong>
            <span class="text-[10px] sm:text-[12px] md:text-sm text-blackish-green/50 mt-1">${flight.route}</span>
          </div>
        `;
        flightsContainer.appendChild(flightRow);
      });

      const favoriteCheckbox = clone.querySelector(".btn-favorite input");
      if (favoriteCheckbox) {
        favoriteCheckbox.setAttribute("data-id", ticket.id);
        favoriteCheckbox.classList.add("favorite-flight-checkbox");
      }

      container.appendChild(clone);
    });

    initFavoritesUI();
  }

  // 7. KHỞI TẠO NÚT YÊU THÍCH (FAVORITES)
  function initFavoritesUI() {
    const favoriteCheckboxes = document.querySelectorAll(".favorite-flight-checkbox");
    if (favoriteCheckboxes.length === 0) return;

    const favorites = JSON.parse(localStorage.getItem("golobe_favorite_flights")) || [];

    favoriteCheckboxes.forEach((checkbox) => {
      const id = checkbox.getAttribute("data-id");

      if (id && favorites.includes(id)) {
        checkbox.checked = true;
      }

      const newCheckbox = checkbox.cloneNode(true);
      checkbox.replaceWith(newCheckbox);

      newCheckbox.addEventListener("change", (e) => {
        const checkboxId = e.target.getAttribute("data-id");
        let favs = JSON.parse(localStorage.getItem("golobe_favorite_flights")) || [];

        if (e.target.checked) {
          if (!favs.includes(checkboxId)) favs.push(checkboxId);
        } else {
          favs = favs.filter((favId) => favId !== checkboxId);
        }

        localStorage.setItem("golobe_favorite_flights", JSON.stringify(favs));
      });
    });
  }

  // Khởi động fetch dữ liệu
  fetchFlightTickets();
}
