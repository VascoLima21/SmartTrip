import { countriesInit } from "../init.js";
import renderNavbar from "../views/NavbarView.js";
import { getUserLogged } from "../utils/auth.js";
import { getRecommendedDestinations } from "../utils/recommendations.js";
import { Booking } from "../models/BookingModel.js";
import { generateId, generateUniqueDomId } from "../utils/generateId.js";
import { renderRecDetailsModal, showBookingDetailsModal } from "./ModalsView.js";

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

    renderRecDetailsModal();

    destinations.forEach(({ country, city }) => {
        const basePrice = country.countryPrice;
        const totalCost = basePrice * formData.people;

        const startDate = formData.date;
        const duration = formData.duration;
        const endDate = calculateEndDate(startDate, duration);

        const recommendationData = {
            departureAirport: formData.departure,
            arrivalAirport: city.airport,
            cost: totalCost,
            tourismTypes: country.typesOfTourism,
            hotel: city.hotels[Math.floor(Math.random() * city.hotels.length)],
            people: formData.people,
            country: country.name,
            city: city.name,
            startDate,
            endDate,
        };

        const cardId = generateUniqueDomId("trip");
        const bookingButtonId = `booking-btn-${cardId}`;
        const detailsButtonId = `details-btn-${cardId}`;

        const card = document.createElement("div");
        card.className = "trip-card";

        card.innerHTML = `
            <img src="${city.img}" alt="${country.name}" class="trip-image" />
            <h3 class="trip-title">Trip to ${country.name} - ${city.name}</h3>
            <div class="trip-buttons">
                <button class="btn btn-success btn-trip" id="${bookingButtonId}">Book Now</button>
                <button class="btn btn-primary btn-trip" id="${detailsButtonId}">See Details</button>
            </div>
        `;

        container.appendChild(card);

        const bookingBtn = document.getElementById(bookingButtonId);
        const detailsBtn = document.getElementById(detailsButtonId);

        if (bookingBtn) {
            bookingBtn.addEventListener("click", () => {
                openPaymentModal({
                    ...recommendationData,
                    userEmail: user.email,
                    countryCode: country.countryCode || "XX",
                });
            });
        }

        if (detailsBtn) {
            detailsBtn.addEventListener("click", () => {
                showBookingDetailsModal(recommendationData);
            });
        }
    });
}




function calculateEndDate(startDate, durationDays) {
    const start = new Date(startDate);
    start.setDate(start.getDate() + Number(durationDays));
    return start.toISOString().split("T")[0];
}

function openPaymentModal(booking) {
    const paymentModalEl = document.getElementById("paymentModal");
    const tripSummary = paymentModalEl.querySelector("#tripSummary");

    tripSummary.innerHTML = `
        <h6>Trip to ${booking.country} - ${booking.city}</h6>
        <p>Total Cost: <strong>€${booking.cost}</strong></p>
    `;

    // Guarda os dados completos diretamente no modal
    paymentModalEl.bookingData = booking;

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

        const data = paymentModalEl.bookingData;
        if (!data) {
            alert("Booking data missing.");
            return;
        }

        const booking = new Booking(
            generateId(),
            data.departureAirport,
            data.arrivalAirport,
            data.cost,
            [data.tourismTypes],
            data.hotel,
            data.people,
            data.country,
            data.countryCode,
            data.startDate,
            data.endDate,
            data.userEmail
        );

        // Atualiza o localStorage
        if (!user.myBookings) user.myBookings = [];
        user.myBookings.push(booking);

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map(u => u.email === user.email ? user : u);

        const bookings = JSON.parse(localStorage.getItem("bookings"))
        bookings.push(booking)
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("userLogged", JSON.stringify(user));
        localStorage.setItem("bookings", JSON.stringify(bookings))

        alert("Payment submitted! Thank you.");

        const modalInstance = bootstrap.Modal.getInstance(paymentModalEl);
        if (modalInstance) modalInstance.hide();
        document.body.classList.remove("modal-open");
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

        window.location.reload();
    });
}