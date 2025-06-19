import { countriesInit } from "../init.js";
import renderNavbar from "../views/NavbarView.js";
import { getUserLogged } from "../utils/auth.js";
import { getRecommendedDestinations } from "../utils/recommendations.js";

document.addEventListener("DOMContentLoaded", () => {
  const countries = countriesInit();
  const user = getUserLogged();

  renderNavbar();
  handleFormSubmission(countries, user);
  setMinimumDate();
  setupPaymentForm();
});



// Função para manipular envio do formulário principal
function handleFormSubmission(countries, user) {
  const bookingForm = document.getElementById("bookingForm");

  bookingForm.addEventListener("submit", function (e) {
    console.log("User is:", user); // <-- Debug: vê se é null ou User

    if (!user) {
      e.preventDefault();
      alert("You must be logged in to submit the booking.");
      return;
    }

    e.preventDefault();

    const formData = getFormData();

    if (!validateForm(formData)) {
      alert("Please fill in all fields");
      return;
    }

    const recommendedDestinations = getRecommendedDestinations(
      countries,
      formData.tourism,
      parseInt(formData.people)
    );

    renderRecommendations(recommendedDestinations);
    showRecommendations();
  });
}


function getFormData() {
  return {
    departure: document.getElementById("departureLocation").value,
    duration: document.getElementById("tripDuration").value,
    date: document.getElementById("tripDate").value,
    people: parseInt(document.getElementById("numberOfPeople").value), // ESSENCIAL
    tourism: document.getElementById("tourismType").value,
  };
}

function validateForm(formData) {
  return (
    formData.departure &&
    formData.duration &&
    formData.date &&
    formData.people &&
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


// Função que monta o HTML dos cards de recomendação e injeta na página
function renderRecommendations(destinations) {
  const container = document.querySelector(".recommendations-container");
  container.innerHTML = ""; // Limpa recomendações anteriores

 destinations.forEach(({ country, city }) => {
console.log(country.name, country.typesOfTourism);
  const basePrice = country.pricePerPerson || 1000;
  const cityName = city.name || "City";
  const countryName = country.name || "Country";
  const countryImage = country.img || '/assets/countryImages/default.png';  // trocar .image por .img

  const card = document.createElement("div");
  card.className = "trip-card";

  card.innerHTML = `
    <img src="${countryImage}" alt="${countryName}" class="trip-image" />
    <h3 class="trip-title">Trip to ${countryName} - ${cityName}</h3>
    <div class="trip-buttons">
      <button class="btn btn-success btn-trip" data-bs-toggle="modal" data-bs-target="#paymentModal" data-cost="${basePrice}" data-destination="${countryName}">Book Now</button>
      <button class="btn btn-primary btn-trip" data-action="details">See Details</button>
    </div>
  `;

  container.appendChild(card);
});
}

// configurar botões "Book Now" para abrir modal com dados dinâmicos
function setupBookingButtons() {
  const bookingButtons = document.querySelectorAll(
    ".btn-trip[data-bs-toggle='modal']"
  );
  bookingButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const destination = btn.getAttribute("data-destination");
      const cost = btn.getAttribute("data-cost");

      openPaymentModal({ destinationCountry: destination, cost });
    });
  });
}

// Função para abrir o modal e preencher dados dinamicamente
function openPaymentModal(booking) {
  const paymentModalEl = document.getElementById("paymentModal");
  const tripSummary = paymentModalEl.querySelector("#tripSummary");

  tripSummary.innerHTML = `<h6>Trip to ${booking.destinationCountry}</h6><p>Total Cost: <strong>€${booking.cost}</strong></p>`;

  const modal = new bootstrap.Modal(paymentModalEl);
  modal.show();
}

// Configura o formulário de pagamento no modal
function setupPaymentForm() {
  const paymentForm = document.getElementById("paymentForm");
  const paymentModalEl = document.getElementById("paymentModal");

  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Payment submitted! Thank you.");

    const modalInstance = bootstrap.Modal.getInstance(paymentModalEl);
    modalInstance.hide();

    paymentForm.reset();
  });
}

export {
  handleFormSubmission,
  getFormData,
  validateForm,
  showRecommendations,
  setupBookingButtons,
  setupPaymentForm,
};
