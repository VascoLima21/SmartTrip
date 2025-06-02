import {Hotel} from "./HotelModel.js"

export class City {
    constructor(cityId, name, img, hotels = []) {
        this.cityId = cityId
        this.name = name
        this.img = img
        this.hotels = hotels.map(hotel => new Hotel(hotel.hotelId, hotel.name, hotel.location, hotel.stars, hotel.rating))
    }
}