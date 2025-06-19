import { countriesInit } from "../init.js";
import renderNavbar from "../views/NavbarView.js";
import { getUserLogged } from "../utils/auth.js";
import { getRecommendedDestinations } from "../utils/recommendations.js";
import { Booking } from "../models/BookingModel.js";
import { generateId } from "../utils/generateId.js";

document.addEventListener("DOMContentLoaded", () => {
  const countries = countriesInit();
  window.countriesGlobal = countries; // Disponível globalmente
  const user = getUserLogged();

  renderNavbar();
  handleFormSubmission(countries, user);
  setMinimumDate();
  setupPaymentForm();
});

// Função principal do formulário
function handleFormSubmission(countries, user) {
  const bookingForm = document.getElementById("bookingForm");

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit the booking.");
      return;
    }

    const formData = getFormData();

    if (!validateForm(formData)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const recommendedDestinations = getRecommendedDestinations(
      countries,
      formData.tourism,
      formData.people
    );

    if (!recommendedDestinations.length) {
      alert("No destinations match your preferences.");
      return;
    }

    renderRecommendations(recommendedDestinations, formData, user, countries);
    showRecommendations();
  });
}

function getFormData() {
  return {
    departure: document.getElementById("departureLocation").value,
    duration: parseInt(document.getElementById("tripDuration").value),
    date: document.getElementById("tripDate").value,
    people: parseInt(document.getElementById("numberOfPeople").value),
    tourism: document.getElementById("tourismType").value,
  };
}

function validateForm(formData) {
  return (
    formData.departure &&
    formData.duration > 0 &&
    formData.date &&
    formData.people > 0 &&
    formData.tourism
  );
}

function showRecommendations() {
  const recommendationsSection = document.getElementById("recommendationsSection");
  recommendationsSection.style.display = "block";

  setTimeout(() => {
    recommendationsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
}

function setMinimumDate() {
  const dateInput = document.getElementById("tripDate");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

function renderRecommendations(destinations, formData, user, countries) {
  const container = document.querySelector(".recommendations-container");
  container.innerHTML = "";

  destinations.forEach(({ country, city }) => {
    const basePrice = country.pricePerPerson || 1000;
    const totalCost = basePrice * formData.people;

    const card = document.createElement("div");
    card.className = "trip-card";

    card.innerHTML = `
      <img src="${city.img}" alt="${country.name}" class="trip-image" />
      <h3 class="trip-title">Trip to ${country.name} - ${city.name}</h3>
      <div class="trip-buttons">
        <button class="btn btn-success btn-trip" data-bs-toggle="modal" data-bs-target="#paymentModal"
          data-cost="${totalCost}" data-destination="${country.name}">
          Book Now
        </button>
        <button class="btn btn-primary btn-trip" data-action="details">See Details</button>
      </div>
    `;

    container.appendChild(card);
  });

  setupBookingButtons(countries, formData, user);
}

function setupBookingButtons(countries, formData, user) {
  const bookingButtons = document.querySelectorAll(".btn-trip[data-bs-toggle='modal']");
  bookingButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const destinationCountry = btn.getAttribute("data-destination");
      const cost = Number(btn.getAttribute("data-cost"));

      const country = countries.find(c => c.name === destinationCountry);
      if (!country) {
        alert("Country info not found!");
        return;
      }

      // Passar os dados via dataset para o modal
      const paymentModalEl = document.getElementById("paymentModal");
      paymentModalEl.dataset.destinationCountry = destinationCountry;
      paymentModalEl.dataset.cost = cost;
      paymentModalEl.dataset.departure = formData.departure;
      paymentModalEl.dataset.duration = formData.duration;
      paymentModalEl.dataset.date = formData.date;
      paymentModalEl.dataset.people = formData.people;
      paymentModalEl.dataset.tourism = formData.tourism;

      openPaymentModal({ destinationCountry, cost });
    });
  });
}

function calculateEndDate(startDate, durationDays) {
  const start = new Date(startDate);
  start.setDate(start.getDate() + durationDays);
  return start.toISOString().split("T")[0];
}

function openPaymentModal(booking) {
  const paymentModalEl = document.getElementById("paymentModal");
  const tripSummary = paymentModalEl.querySelector("#tripSummary");

  tripSummary.innerHTML = `
    <h6>Trip to ${booking.destinationCountry}</h6>
    <p>Total Cost: <strong>€${booking.cost}</strong></p>
  `;

  const modal = new bootstrap.Modal(paymentModalEl);
  modal.show();
}

function setupPaymentForm() {
  const paymentForm = document.getElementById("paymentForm");
  const paymentModalEl = document.getElementById("paymentModal");

  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = getUserLogged();
    if (!user) {
      alert("You must be logged in to submit the booking.");
      return;
    }

    // Recuperar dados do modal dataset
    const destinationCountry = paymentModalEl.dataset.destinationCountry;
    const cost = Number(paymentModalEl.dataset.cost);
    const departure = paymentModalEl.dataset.departure;
    const duration = Number(paymentModalEl.dataset.duration);
    const date = paymentModalEl.dataset.date;
    const people = Number(paymentModalEl.dataset.people);
    const tourism = paymentModalEl.dataset.tourism;

    // Usar countriesGlobal para evitar nova chamada
    const countries = window.countriesGlobal;
    const country = countries.find(c => c.name === destinationCountry);
    if (!country) {
      alert("Country info not found!");
      return;
    }

    const city = country.cities[0];
    const arrivalAirport = city.airport || "Unknown Airport";
    const countryCode = country.countryCode || "XX";
    const randomHotel = city.hotels[Math.floor(Math.random() * city.hotels.length)];
    const startDate = date;
    const endDate = calculateEndDate(startDate, duration);

    // Criar o booking
    const booking = new Booking(
      generateId(),
      departure,
      arrivalAirport,
      cost,
      [tourism],
      randomHotel,
      people,
      destinationCountry,
      countryCode,
      startDate,
      endDate,
      user.email
    );

    // Atualizar dados do utilizador
    if (!user.myBookings) user.myBookings = [];
    user.myBookings.push(booking);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u => (u.email === user.email ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("userLogged", JSON.stringify(user));

    alert("Payment submitted! Thank you.");

    // Fechar modal e limpar backdrop
    const modalInstance = bootstrap.Modal.getInstance(paymentModalEl);
    if (modalInstance) modalInstance.hide();
    document.body.classList.remove("modal-open");
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove()); 
    
    window.location.reload();
  });
}


