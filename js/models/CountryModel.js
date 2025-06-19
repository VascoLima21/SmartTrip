import { City } from "./CityModel.js";

export class Country {
    constructor(countryId, countryCode, name, capital, typesOfTourism, img, cities = [], airports = [], countryPrice, numberOfPeople) {
        this.countryId = countryId;
        this.countryCode = countryCode;
        this.name = name;
        this.capital = capital;
        this.typesOfTourism = typesOfTourism;
        this.img = img;
        this.cities = cities.map(city => new City(city.cityId, city.name, city.img, city.hotels));
        this.airports = airports;
        this.countryPrice = countryPrice;
        this.numberOfPeople = numberOfPeople;
    }
}