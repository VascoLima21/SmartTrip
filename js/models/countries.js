export class Hotel {
    constructor(hotelId, name, location, stars, rating) {
        this.hotelId = hotelId
        this.name = name
        this.location = location
        this.stars = stars
        this.rating = rating
    }
}

export class City {
    constructor(cityId, name, img, hotels = []) {
        this.cityId = cityId
        this.name = name
        this.img = img
        this.hotels = hotels.map(h => new Hotel(h.hotelId, h.name, h.location, h.stars, h.rating))
    }
}

export class Country {
    constructor(countryId, capital, typesOfTourism, img, cities = [], airports = []) {
        this.countryId = countryId
        this.capital = capital
        this.typesOfTourism = typesOfTourism
        this.img = img
        this.cities = cities.map(c => new City(c.cityId, c.name, c.img, c.hotels))
        this.airports = airports
    }
}




let countries = []

const japan = {
    countryId: 1,
    airports: [],
    capital: "Tokyo",
    typesOfTourism: ["Cultural", "Technological", "Gastronomical"],
    img: "../assets/countryImages/JapanImage.png",
    cities: [
        {
            cityId: 1,
            name: "Tokyo",
            img: "../assets/cityImages/tokyo.jpg",
            hotels: [
                {
                    hotelId: 1,
                    name: "Keio Plaza Hotel Tokyo",
                    location: "Shinjuku",
                    stars: 5,
                    rating: 8.7
                },
                {
                    hotelId: 2,
                    name: "Hoshinoya Tokyo",
                    location: "Otemachi",
                    stars: 5,
                    rating: 9.6
                },
                {
                    hotelId: 3,
                    name: "Park Hotel Tokyo",
                    location: "Shiodome",
                    stars: 4,
                    rating: 8.8
                }
            ],
        },
        {
            cityId: 2,
                name: "Kyoto",
                img: "../assets/cityImages/kyoto.jpg",
                hotels: [
                    {
                        hotelId: 4,
                        name: "Forza Kyoto Shijo Kawaramachi",
                        location: "Nakagyo",
                        stars: 3,
                        rating: 9.0
                    },
                    {
                        hotelId: 5,
                        name: "Vischio Kyoto",
                        location: "Near Kyoto Station",
                        stars: 4,
                        rating: 9.1
                    },
                    {
                        hotelId: 6,
                        name: "Rhino Hotel Kyoto",
                        location: "Nishikyogoku",
                        stars: 3,
                        rating: 8.0
                    }
                ],
        }
    ]
}