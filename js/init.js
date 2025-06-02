import { User } from "./models/UserModel.js"
import { Country } from "./models/CountryModel.js"

export function usersInit() {
    const localUsers = localStorage.getItem("users")

    if (localUsers) {
        const parsedUsers = JSON.parse(localUsers)
        //Reconstructs the parsedUsers list so they are instances of the User class, to have access to methods and so on
        return parsedUsers.map(user => new User(
            user.name, user.email, user.birthDate, user.password, user.myBookings, user.points,
            user.profileImg, user.titles, user.favouriteBookings, user.curTitle, user.role
        ));
    }

    let users = [];

    let admin = new User(
        "admin1",
        "admin1@gmail.com",
        "14/3/1990",
        "adminPassword123",
        [], // myBookings
        0, // points
        "../assets/profileImages/admin1pfp.jpg",
        [], // titles
        [], // favouriteBookings
        "", // curTitle
        "admin" // role
    );

    users.push(admin);

    localStorage.setItem("users", JSON.stringify(users))

    return users;
}

export function countriesInit() {
    const localCountries = localStorage.getItem("countries")

    if (localCountries) {
        const parsedCountries = JSON.parse(localCountries)
        //Reconstructs the Parsed Countries list so they are instances of the Country class, to have access to methods and so on
        return parsedCountries.map(country => new Country(
            country.id, country.capital, country.typesOfTourism, country.img, country.city, country.airports
        ));
    }

    const countries = [];

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
                ]
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
                ]
            }
        ]
    };

    countries.push(japan);

    localStorage.setItem("countries", JSON.stringify(countries))

    return countries;
}