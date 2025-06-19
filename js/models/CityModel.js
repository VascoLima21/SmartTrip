import {Hotel} from "./HotelModel.js"

export class City {
    constructor(cityId, name, airport, img, hotels = []) {
        this.cityId = cityId
        this.name = name
        this.airport = airport
        this.img = img
        this.hotels = hotels.map(hotel => new Hotel(hotel.hotelId, hotel.name, hotel.location, hotel.stars, hotel.rating))
    }
}