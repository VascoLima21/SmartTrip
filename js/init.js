import { User } from "./models/UserModel.js"
import { Country } from "./models/CountryModel.js"
import { Booking } from "./models/BookingModel.js"

export function usersInit() {
    const localUsers = localStorage.getItem("users")

    if (localUsers) {
        const parsedUsers = JSON.parse(localUsers);

        return parsedUsers.map(user => {
            const rebuiltBookings = user.myBookings.map(booking => new Booking(
                booking.departureAirport,
                booking.arrivalAirport,
                booking.cost,
                booking.tourismType,
                booking.hotel,
                booking.numberOfPeople,
                booking.destinationCountry,
                booking.destinationCountryCode,
                booking.startDate,
                booking.endDate,
                booking.userEmail
            ));

            return new User(
                user.name,
                user.email,
                user.birthDate,
                user.password,
                rebuiltBookings,
                user.points,
                user.profileImg,
                user.titles,
                user.favouriteBookings,
                user.curTitle,
                user.role
            );
        });
    }

    const tokyoBooking = new Booking(
        "Lisbon Airport",              // departureAirport
        "Tokyo Haneda Airport",        // arrivalAirport
        2300,                         // cost
        ["Cultural"],                 // tourismType
        {
            name: "Park Hotel Tokyo",
            location: "Shiodome",
            stars: 4,
            rating: 8.8
        },                            // hotel
        2,                            // numberOfPeople
        "Japan",                      // destinationCountry
        "JP",                         // destinationCountryCode
        "2024-04-01",                 // startDate
        "2024-04-14",                 // endDate
        "admin1@gmail.com"            // userEmail
    );

    let users = [];

    let admin = new User(
        "admin1",
        "admin1@gmail.com",
        "14/3/1990",
        "adminPassword123",
        [tokyoBooking], // myBookings
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

export function bookingsInit() {
    const localBookings = localStorage.getItem("bookings");

    if (localBookings) {
        const parsed = JSON.parse(localBookings);
        return parsed.map(booking => new Booking(
            booking.departureAirport,
            booking.arrivalAirport,
            booking.cost,
            booking.tourismType,
            booking.hotel,
            booking.numberOfPeople,
            booking.destinationCountry,
            booking.destinationCountryCode,
            booking.startDate,
            booking.endDate,
            booking.userEmail
        ));
    }
    const bookings = [];

    const japanBooking = new Booking(
        "Lisbon Airport",
        "Tokyo Haneda Airport",
        2300,
        ["Cultural"],
        {
            name: "Park Hotel Tokyo",
            location: "Shiodome",
            stars: 4,
            rating: 8.8
        },
        2,
        "Japan",
        "JP",
        "2024-04-01",
        "2024-04-14",
        "admin1@gmail.com"
    );

    bookings.push(japanBooking);
    alert(bookings)
    localStorage.setItem("bookings", JSON.stringify(bookings));

    return bookings;
}