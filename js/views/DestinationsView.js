import { Country } from "../models/CountryModel.js";
import renderNavbar from "./NavbarView.js";
import renderModals from "./ModalsView.js";
import { initLoginModal } from "./LoginModalView.js";
import { initRegisterModal } from "./RegisterModalView.js";

document.addEventListener("DOMContentLoaded", () => {
    renderNavbar()
    renderModals()
    initLoginModal()
    initRegisterModal()
    renderTopDestinations()
})


// Renders the 3 top destinations overall (the ones that appear the most in the bookings array in the localStorage)
function renderTopDestinations() {
    const countries = JSON.parse(localStorage.getItem("countries"))
    const bookings = JSON.parse(localStorage.getItem("bookings"))

    const countryCount = {}

    for (let i = 0; i < bookings.length; i++) {
        const countryCode = bookings[i].destinationCountryCode
        if (!countryCount[countryCode]) {
            countryCount[countryCode] = 0
        }
        countryCount[countryCode]++
    }

    const topCountryCodes = []

    for (const code in countryCount) {
        //While it's less than 3 it adds the country's code to the topCountryCodes array
        if (topCountryCodes.length < 3) {
            topCountryCodes.push(code)
        } else {
            //Checks which is the countryCode that appears the less and sets minIndex as that
            let minIndex = 0
            for (let j = 1; j < topCountryCodes.length; j++) {
                if (
                    countryCount[topCountryCodes[j]] < countryCount[topCountryCodes[minIndex]]
                ) {
                    minIndex = j
                }
            }
            //If countrCode appears more than the minIndex it replaces it
            if (countryCount[code] > countryCount[topCountryCodes[minIndex]]) {
                topCountryCodes[minIndex] = code
            }
        }
    }

    //Creates an array with only the top 3 most popular countries
    const topCountries = []
    for (let i = 0; i < topCountryCodes.length; i++) {
        const data = countries.find(c => c.countryCode == topCountryCodes[i])
        if (data) {
            topCountries.push(
                new Country(
                    data.countryId,
                    data.countryCode,
                    data.name,
                    data.capital,
                    data.typesOfTourism,
                    data.img,
                    data.cities,
                    data.airports,
                    data.countryPrice,
                    data.numberOfPeople
                )
            )
        }
    }

    const container = document.getElementById("destinationsContainer")
    container.innerHTML = ""

    //Creates the cards for the countries/destinations
    for (let i = 0; i < topCountries.length; i++) {
        const country = topCountries[i]
        const col = document.createElement("div")
        col.classList.add("col-md-4", "d-flex", "justify-content-center")

        const card = document.createElement("div")
        card.classList.add("card", "mb-4")
        card.style.width = "18rem"
        card.style.cursor = "pointer"

        card.innerHTML = `
            <img src="${country.img}" class="card-img-top" alt="${country.name}" style="height: 180px; object-fit: cover;">
            <div class="card-body text-center">
                <h5 class="card-title">${country.name}</h5>
                <p class="card-text">Capital: ${country.capital}</p>
                <p class="card-text"><small>${country.typesOfTourism.join(", ")}</small></p>
            </div>
        `

        card.addEventListener("click", () => {
            localStorage.setItem("selectedCountry", JSON.stringify(country))
            window.location.href = "destinationDetails.html"
        })

        col.appendChild(card)
        container.appendChild(col)
    }
}