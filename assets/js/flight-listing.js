import logoEmirates from "../image/image 40.png";
import logoFlydubai from "../image/image 41.png";
import logoQatar from "../image/image 43.png";
import logoEtihad from "../image/image 45.png";

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
  const timeFill = document.getElementById("slider-fill-time"); // Thêm biến trỏ tới thanh fill
  const timeMinText = document.getElementById("label-min-time");
  const timeMaxText = document.getElementById("label-max-time");
  const minTimeGap = 180;

  function formatMinutesToTime(totalMinutes) {
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
    updateTimeSeries(); // Khởi tạo chạy lần đầu khi load trang
  }
  // --- 3. XỬ LÝ TABS (Active Switch) ---
  const tabItems = document.querySelectorAll(".flight-results__tab");
  tabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabItems.forEach((item) => item.classList.remove("flight-results__tab--active"));
      tab.classList.add("flight-results__tab--active");
    });
  });

  // --- 4. RENDER DANH SÁCH VÉ (TICKETS) ---
  async function fetchFlightTickets() {
    try {
      const mockApiData = [
        {
          airlineName: "Emirates",
          airlineLogo: logoEmirates,
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
          airlineLogo: logoFlydubai,
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
          airlineLogo: logoQatar,
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
          airlineLogo: logoEtihad,
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

      clone.querySelector(".ticket-card__airline-logo").src = ticket.airlineLogo;
      clone.querySelector(".ticket-card__airline-logo").alt = ticket.airlineName;
      clone.querySelector(".ticket-card__score").textContent = ticket.rating;
      clone.querySelector(".ticket-card__rating-text").textContent = ticket.ratingText;
      clone.querySelector(".ticket-card__review-count").textContent = `${ticket.reviewsCount} reviews`;
      clone.querySelector(".ticket-card__price-value").textContent = `$${ticket.price}`;

      const priceUnitEl = clone.querySelector(".ticket-card__price-unit");
      if (priceUnitEl) {
        priceUnitEl.textContent = ticket.priceUnit ? ` ${ticket.priceUnit}` : "";
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
      container.appendChild(clone);
    });
  }

  fetchFlightTickets();
});
