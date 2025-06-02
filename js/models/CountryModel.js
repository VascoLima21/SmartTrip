import { City } from "./CityModel.js";

export class Country {
    constructor(countryId, capital, typesOfTourism, img, cities = [], airports = []) {
        this.countryId = countryId;
        this.capital = capital;
        this.typesOfTourism = typesOfTourism;
        this.img = img;
        this.cities = cities.map(city => new City(city.cityId, city.name, city.img, city.hotels));
        this.airports = airports;
    }
}