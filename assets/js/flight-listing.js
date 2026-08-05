document.addEventListener("DOMContentLoaded", () => {
  // --- 1. XỬ LÝ PRICE SLIDER ---
  const priceMin = document.getElementById("slider-min");
  const priceMax = document.getElementById("slider-max");
  const sliderFill = document.getElementById("slider-fill");
  const labelMin = document.getElementById("label-min");
  const labelMax = document.getElementById("label-max");
  const minGap = 210;

  function updatePriceSlider() {
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
    updatePriceSlider();
  }

  // --- 2. XỬ LÝ TIME SLIDER (Departure Time) ---
  const timeMin = document.getElementById("slider-min-time");
  const timeMax = document.getElementById("slider-max-time");
  // Sửa lại ID trỏ đúng vào thẻ span hiển thị label trong HTML
  const timeMinText = document.getElementById("label-min-time");
  const timeMaxText = document.getElementById("label-max-time");

  function formatMinutesToTime(totalMinutes) {
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let hours12 = hours24 % 12 || 12;
    return `${hours12}:${minutes < 10 ? "0" : ""}${minutes} ${hours24 >= 12 ? "pm" : "am"}`;
  }

  function updateTimeSeries() {
    if (!timeMin || !timeMax) return;
    let minVal = parseInt(timeMin.value);
    let maxVal = parseInt(timeMax.value);

    if (minVal > maxVal) {
      [timeMin.value, timeMax.value] = [maxVal, minVal];
    }

    if (timeMinText) timeMinText.textContent = formatMinutesToTime(parseInt(timeMin.value));
    if (timeMaxText) timeMaxText.textContent = formatMinutesToTime(parseInt(timeMax.value));
  }

  if (timeMin && timeMax) {
    timeMin.addEventListener("input", updateTimeSeries);
    timeMax.addEventListener("input", updateTimeSeries);
    updateTimeSeries();
  }

  // --- 3. XỬ LÝ TABS (Active Switch) ---
  // Cập nhật class theo BEM
  const tabItems = document.querySelectorAll(".flight-results__tab");
  tabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabItems.forEach((item) => item.classList.remove("flight-results__tab--active"));
      tab.classList.add("flight-results__tab--active");
    });
  });

  // --- 4. XỬ LÝ NÚT FAVORITE (Dùng Event Delegation) ---
  // Vì các vé được render bằng JS, ta cần gắn sự kiện vào container cha
  const ticketListContainer = document.getElementById("ticket-list");
  if (ticketListContainer) {
    ticketListContainer.addEventListener("click", function (e) {
      const btnFavorite = e.target.closest(".ticket-card__btn-favorite");
      if (btnFavorite) {
        btnFavorite.classList.toggle("active");
      }
    });
  }

  // --- 5. RENDER DANH SÁCH VÉ (TICKETS) ---
  async function fetchFlightTickets() {
    try {
      const mockApiData = [
        {
          airlineName: "Emirates",
          airlineLogo: "assets/image/image 40.png",
          rating: 4.2,
          ratingText: "Very Good",
          reviewsCount: 54,
          price: 107,
          priceUnit: "",
          flights: [
            { time: "12:00 pm - 01:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "EWR-BNA" },
            { time: "05:00 pm - 06:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "BNA-EWR" },
          ],
        },
        {
          airlineName: "Flydubai",
          airlineLogo: "assets/image/image 41.png",
          rating: 4.2,
          ratingText: "Verygood",
          reviewsCount: 54,
          price: 107,
          priceUnit: "",
          flights: [
            { time: "12:00 pm - 01:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "EWR-BNA" },
            { time: "05:00 pm - 06:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "BNA-EWR" },
          ],
        },
        {
          airlineName: "Qatar Airways",
          airlineLogo: "assets/image/image 43.png",
          rating: 4.2,
          ratingText: "Verygood",
          reviewsCount: 54,
          price: 107,
          priceUnit: "/ night",
          flights: [
            { time: "12:00 pm - 01:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "EWR-BNA" },
            { time: "05:00 pm - 06:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "BNA-EWR" },
          ],
        },
        {
          airlineName: "Etihad",
          airlineLogo: "assets/image/image 45.png",
          rating: 4.2,
          ratingText: "Verygood",
          reviewsCount: 54,
          price: 107,
          priceUnit: "/night",
          flights: [
            { time: "12:00 pm - 01:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "EWR-BNA" },
            { time: "05:00 pm - 06:28 pm", airline: "Emirates", type: "non stop", duration: "2h 28m", route: "BNA-EWR" },
          ],
        },
      ];

      renderTickets(mockApiData);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu chuyến bay:", error);
    }
  }

  function renderTickets(ticketsData) {
    const container = document.getElementById("ticket-list");
    const template = document.getElementById("ticket-template");
    if (!container || !template) return;

    container.innerHTML = "";

    ticketsData.forEach((ticket) => {
      const clone = template.content.cloneNode(true);

      // Cập nhật các selectors để query chuẩn xác các class BEM
      clone.querySelector(".ticket-card__airline-logo").src = ticket.airlineLogo;
      clone.querySelector(".ticket-card__airline-logo").alt = ticket.airlineName;
      clone.querySelector(".ticket-card__score").textContent = ticket.rating;
      clone.querySelector(".ticket-card__rating-text").textContent = ticket.ratingText;
      clone.querySelector(".ticket-card__review-count").textContent = `${ticket.reviewsCount} reviews`;
      clone.querySelector(".ticket-card__price-value").textContent = `$${ticket.price}`;

      // Xử lý logic nếu HTML có thẻ span chứa unit (Ví dụ /night)
      const priceUnitEl = clone.querySelector(".ticket-card__price-unit");
      if (priceUnitEl) {
        priceUnitEl.textContent = ticket.priceUnit ? ` ${ticket.priceUnit}` : "";
      }

      // Render mảng flights bên trong mỗi vé
      const flightsContainer = clone.querySelector(".ticket-card__flights");
      ticket.flights.forEach((flight) => {
        const flightRow = document.createElement("div");
        flightRow.className = "flight-card__row"; // Đổi sang class BEM
        flightRow.innerHTML = `
          <input type="checkbox" class="flight-card__check">
          <div class="flight-card__time">
            <strong class="flight-card__time-strong">${flight.time}</strong>
            <span class="flight-card__time-span">${flight.airline}</span>
          </div>
          <div class="flight-card__type">${flight.type}</div>
          <div class="flight-card__duration">
            <strong class="flight-card__duration-strong">${flight.duration}</strong>
            <span class="flight-card__duration-span">${flight.route}</span>
          </div>
        `;
        flightsContainer.appendChild(flightRow);
      });

      container.appendChild(clone);
    });
  }

  fetchFlightTickets();
});

