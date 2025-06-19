import { Country } from "../models/CountryModel.js"

document.addEventListener("DOMContentLoaded", () => {
    renderTopDestinations()
});

function renderTopDestinations() {
    const countries = JSON.parse(localStorage.getItem("countries"))
    const bookings = JSON.parse(localStorage.getItem("bookings"))

    // Counts the bookings for each country
    const countryCount = {}

    for (let i = 0; i < bookings.length; i++) {
        const countryCode = bookings[i].countryCode
            if (!countryCount[countryCode]) {
            countryCount[countryCode] = 0
        }
        countryCount[countryCode]++
    }

    // Get the three most popular destinations (the 3 that are in more bookings)
    const topCountryCodes = []

    for (const code in countryCount) {
        //Verifies if there aren't 3 countries already, and adds until there are 3
        if (topCountryCodes.length < 3) {
            topCountryCodes.push(code)
        } else {
            // Gets the country that appears the least times from those 3 and saves it's index in the array
            let minIndex = 0
            for (let j = 1; j < topCountryCodes.length; j++) {
                if (countryCount[topCountryCodes[j]] < countryCount[topCountryCodes[minIndex]]) {
                    minIndex = j
                }
            }
            // If the new country has more bookings replaces the one from the minIndex
            if (countryCount[code] > countryCount[topCountryCodes[minIndex]]) {
                topCountryCodes[minIndex] = code
            }
        }
    }

    // Converts the countries into Country Objects from the Country class from the codes
    const topCountries = []
    for (let i = 0; i < topCountryCodes.length; i++) {
        const data = countries.find(c => c.countryCode == topCountryCodes[i]);
        if (data) {
            topCountries.push(new Country(
                data.countryCode,
                data.name,
                data.capital,
                data.typesOfTourism,
                data.img,
                data.cities,
                data.airports,
                data.countryPrice,
                data.numberOfPeople
            ))
        }
    }

    // Renders the country cards
    const container = document.getElementBycode("destinationsContainer")
    container.innerHTML = "";

    for (let i = 0; i < topCountries.length; i++) {
        const country = topCountries[i];
        const card = document.createElement("div");
        card.classList.add("card", "m-3");
        card.style.wcodeth = "18rem";
        card.style.cursor = "pointer";

        card.innerHTML = `
            <img src="${country.img}" class="card-img-top" alt="${country.name}">
            <div class="card-body text-center">
                <h5 class="card-title">${country.name}</h5>
                <p class="card-text">Capital: ${country.capital}</p>
                <p class="card-text"><small>${country.typesOfTourism.join(", ")}</small></p>
            </div>
        `;

        card.addEventListener("click", () => {
            localStorage.setItem("selectedCountryCode", country.countryCode);
            window.location.href = "country.html";
        });

        container.appendChild(card);
    }
}