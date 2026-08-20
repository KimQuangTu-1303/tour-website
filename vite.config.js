import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(__dirname, "partials"),
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        // Trang chủ & các trang ở thư mục gốc
        main: resolve(__dirname, "index.html"),
        favorites: resolve(__dirname, "favorites.html"),

        // Thư mục flight-flow
        findFlight: resolve(__dirname, "flight-flow/find-flight.html"),
        flightBookingDetailTicket: resolve(__dirname, "flight-flow/flight-booking-detail-ticket.html"),
        flightBookingDetailVisa: resolve(__dirname, "flight-flow/flight-booking-detail-visa.html"),
        flightBookingDetail: resolve(__dirname, "flight-flow/flight-booking-detail.html"),
        flightDetailPage: resolve(__dirname, "flight-flow/flight-detail-page.html"),
        flightListing: resolve(__dirname, "flight-flow/flight-listing.html"),

        // Thư mục hotel-flow
        findStays: resolve(__dirname, "hotel-flow/find-stays.html"),
        hotelBookingDetailTicket: resolve(__dirname, "hotel-flow/hotel-booking-detail-ticket.html"),
        hotelBookingDetailVisa: resolve(__dirname, "hotel-flow/hotel-booking-detail-visa.html"),
        hotelBookingDetail: resolve(__dirname, "hotel-flow/hotel-booking-detail.html"),
        hotelDetailPage: resolve(__dirname, "hotel-flow/hotel-detail-page.html"),
        hotelListing: resolve(__dirname, "hotel-flow/hotel-listing.html"),

        // Thư mục login-signup
        accountHistoryFlights: resolve(__dirname, "login-signup/account_history-flights.html"),
        accountHistoryStays: resolve(__dirname, "login-signup/account_history-stays.html"),
        accountPaymentMethods: resolve(__dirname, "login-signup/account_payment-methods.html"),
        account: resolve(__dirname, "login-signup/account.html"),
        forgotpassSetNew: resolve(__dirname, "login-signup/forgotpass_set-new.html"),
        forgotpassVerify: resolve(__dirname, "login-signup/forgotpass_verify.html"),
        forgotpass: resolve(__dirname, "login-signup/forgotpass.html"),
        login: resolve(__dirname, "login-signup/login.html"),
        signupPaymentMethods: resolve(__dirname, "login-signup/signup_payment-methods.html"),
        signup: resolve(__dirname, "login-signup/signup.html"),
      },
    },
  },
});