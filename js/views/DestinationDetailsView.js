import {initLoginModal} from "./LoginModalView.js"
import { renderAuthModals } from "./ModalsView.js"
import renderNavbar from "./NavbarView.js"
import {initRegisterModal} from "./RegisterModalView.js"

document.addEventListener("DOMContentLoaded", () => {
    const countryData = JSON.parse(localStorage.getItem("selectedCountry"))

    renderNavbar()
    renderAuthModals()
    initLoginModal()
    initRegisterModal()

    renderCountryDetails(countryData)
})

//Function to render the selected country's details
function renderCountryDetails(country) {
    const container = document.getElementById("countryContainer")

    container.innerHTML = `
        <div class="container my-5 p-4 blue-1 rounded shadow">
            <div class="text-center mb-4">
                <h2 class="mb-3 white">${country.name}</h2>
                <img src="${country.img}" alt="${country.name}" class="img-fluid rounded"; style="max-height: 400px; object-fit: cover">
            </div>
            <div class="row justify-content-center text-center">
                <div class="col-md-6">
                    <p class="white"><strong>Capital:</strong> ${country.capital}</p>
                    <p class="white"><strong>Types of Tourism:</strong> ${country.typesOfTourism.join(", ")}</p>
                    <p class="white"><strong>Average Price:</strong> ${country.countryPrice}€</p>
                </div>
            </div>

            <h4 class="mt-5 mb-3 text-center white">Cities</h4>
            <div id="citiesContainer" class="row justify-content-center g-4"></div>
        </div>
    `

    const citiesContainer = document.getElementById("citiesContainer")

    // Creates different cards for the country's cities
    for (let city of country.cities) {
        const col = document.createElement("div")
        col.className = "col-md-4"

        const cityCard = document.createElement("div")
        cityCard.className = "card h-100 shadow-sm"

        cityCard.innerHTML = `
            <img src="${city.img}" class="card-img-top" alt="${city.name}" style="height: 180px; object-fit: cover">
            <div class="card-body">
                <h5 class="card-title text-center">${city.name}</h5>
                <p class="card-text"><strong>Hotels:</strong></p>
                <ul class="mb-0">
                    ${city.hotels.map(hotel => `
                        <li>${hotel.name} - ${hotel.stars}★, Rating: ${hotel.rating}</li>
                    `).join("")}
                </ul>
            </div>
        `

        col.appendChild(cityCard)
        citiesContainer.appendChild(col)
    }
}