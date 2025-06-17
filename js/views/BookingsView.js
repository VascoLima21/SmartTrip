import { countriesInit } from "../init.js"
import renderNavbar from "../views/NavbarView.js";
import { getUserLogged } from "../utils/auth.js"

document.addEventListener("DOMContentLoaded", () => {
  const countries = countriesInit();
  const user = getUserLogged()
  renderNavbar();
  handleFormSubmission();
  setMinimumDate();
  setupBookingButtons();
  setupPaymentForm();
});

// Função para manipular envio do formulário principal
function handleFormSubmission() {
  const bookingForm = document.getElementById("bookingForm");

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = getFormData();

    if (!validateForm(formData)) {
      alert("Please fill in all fields");
      return;
    }

    showRecommendations();
    console.log("Form submitted with:", formData);
  });
}

function getFormData() {
  return {
    departure: document.getElementById("departureLocation").value,
    duration: document.getElementById("tripDuration").value,
    date: document.getElementById("tripDate").value,
    people: document.getElementById("numberOfPeople").value,
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

// configurar botões "Book Now" para abrir modal com dados ---
function setupBookingButtons() {
  const bookingButtons = document.querySelectorAll(".btn-trip[data-action='book']");
  bookingButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Pega o trip card para obter info (ex: título, custo)
      const tripCard = btn.closest(".trip-card");
      const destination = tripCard.querySelector(".trip-title").textContent.replace("Trip to ", "");
      // Aqui você pode definir o custo fixo ou dinamicamente
      // Exemplo fixo:
     

      openPaymentModal({ destinationCountry: destination, cost });
    });
  });
}

// Função para abrir o modal e preencher dados dinamicamente
function openPaymentModal(booking) {
  const paymentModalEl = document.getElementById("paymentModal");
  const tripSummary = paymentModalEl.querySelector("#tripSummary");

  tripSummary.innerHTML = `<h6>Trip to ${booking.destinationCountry}</h6><p>Total Cost: <strong>€${booking.cost}</strong></p>`;

  // Instancia o modal do Bootstrap e mostra
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

    // Fecha o modal após submissão
    const modalInstance = bootstrap.Modal.getInstance(paymentModalEl);
    modalInstance.hide();

    paymentForm.reset();
  });
}

// Exporta funções para testes ou uso externo se necessário
export {
  handleFormSubmission,
  getFormData,
  validateForm,
  showRecommendations,
  setupBookingButtons,
  setupPaymentForm,
};
