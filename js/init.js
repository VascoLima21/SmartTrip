import { User } from "./models/UserModel.js"
import { Country } from "./models/CountryModel.js"
import { Booking } from "./models/BookingModel.js"
import { Title } from "./models/TitleModel.js"

export function usersInit() {
    const localUsers = localStorage.getItem("users")
    if (localUsers) {
        const parsedUsers = JSON.parse(localUsers)
        return parsedUsers.map(user => {
            const rebuiltBookings = user.myBookings.map(booking => new Booking(
                booking.bookingId,
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
        1,
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
    const titles = JSON.parse(localStorage.getItem("titles"))
    const admin = new User(
        "admin1",
        "admin1@gmail.com",
        "14/3/1990",
        "adminPassword123",
        [tokyoBooking], // myBookings
        0, // points
        "../assets/profileImages/admin1pfp.jpg",
        [titles[0]], // titles
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
            country.countryId, country.countryCode, country.name, country.capital, country.typesOfTourism, country.img, country.cities, country.airports, country.countryPrice, country.numberOfPeople
        ));
    }

    const countries = [];

    const japan = {
        countryId: 1,
        countryCode: "JP",
        name: "Japan",
        countryPrice: 1000,
        airports: [],
        capital: "Tokyo",
        typesOfTourism: ["Cultural", "Technological", "Gastronomical"],
        numberOfPeople: 2,
        img: "../assets/countryImages/JapanImage.png",
        cities: [
            {
                cityId: 1,
                name: "Tokyo",
                cityPrice: 300,
                img: "../assets/cityImages/tokyo.jpg",
                hotels: [
                    {
                        hotelId: 1,
                        name: "Keio Plaza Hotel Tokyo",
                        location: "Shinjuku",
                        hotelPrice: 500,
                        stars: 5,
                        rating: 8.7
                    },
                    {
                        hotelId: 2,
                        name: "Hoshinoya Tokyo",
                        location: "Otemachi",
                        hotelPrice: 600,
                        stars: 5,
                        rating: 9.6
                    },
                    {
                        hotelId: 3,
                        name: "Park Hotel Tokyo",
                        location: "Shiodome",
                        hotelPrice: 400,
                        stars: 4,
                        rating: 8.8
                    }
                ]
            },
            {
                cityId: 2,
                name: "Kyoto",
                cityPrice: 250,
                img: "../assets/cityImages/kyoto.jpg",
                hotels: [
                    {
                        hotelId: 4,
                        name: "Forza Kyoto Shijo Kawaramachi",
                        location: "Nakagyo",
                        hotelPrice: 250,
                        stars: 3,
                        rating: 9.0
                    },
                    {
                        hotelId: 5,
                        name: "Vischio Kyoto",
                        location: "Near Kyoto Station",
                        hotelPrice: 280,
                        stars: 4,
                        rating: 9.1
                    },
                    {
                        hotelId: 6,
                        name: "Rhino Hotel Kyoto",
                        location: "Nishikyogoku",
                        hotelPrice: 230,
                        stars: 3,
                        rating: 8.0
                    }
                ]
            }
        ]
    };

    const mexico = {
        countryId: 2,
        countryCode: "MX",
        name: "Mexico",
        countryPrice: 850,
        airports: [],
        capital: "Ciudad de México",
        typesOfTourism: ["Cultural", "Historical", "Climate"],
        numberOfPeople: 5,
        img: "../assets/countryImages/MexicoImage.jpeg",
        cities: [
            {
                cityId: 3,
                name: "Ciudad de México",
                cityPrice: 200,
                img: "../assets/cityImages/mexicoCity.jpg",
                hotels: [
                    {
                        hotelId: 7,
                        name: "Barceló México Reforma",
                        location: "Centro",
                        hotelPrice: 300,
                        stars: 5,
                        rating: 8.9
                    },
                    {
                        hotelId: 8,
                        name: "NH Collection Mexico City",
                        location: "Zona Rosa",
                        hotelPrice: 280,
                        stars: 4,
                        rating: 9.0
                    }
                ]
            },
            {
                cityId: 4,
                name: "Cancún",
                cityPrice: 320,
                img: "../assets/cityImages/cancun.jpg",
                hotels: [
                    {
                        hotelId: 9,
                        name: "Hard Rock Hotel Cancun",
                        location: "Zona Hotelera",
                        hotelPrice: 600,
                        stars: 5,
                        rating: 9.3
                    },
                    {
                        hotelId: 10,
                        name: "Hotel NYX Cancun",
                        location: "Zona Hotelera",
                        hotelPrice: 450,
                        stars: 4,
                        rating: 8.5
                    }
                ]
            }
        ]
    };

    const spain = {
        countryId: 3,
        countryCode: "ES",
        name: "Spain",
        countryPrice: 900,
        airports: [],
        capital: "Madrid",
        typesOfTourism: ["Climate", "Cultural", "Gastronomical"],
        numberOfPeople: 4,
        img: "../assets/countryImages/SpainImage.jpg",
        cities: [
            {
                cityId: 5,
                name: "Benidorm",
                cityPrice: 220,
                img: "../assets/cityImages/benidorm.jpg",
                hotels: [
                    {
                        hotelId: 11,
                        name: "Hotel Don Pancho",
                        location: "Levante Beach",
                        hotelPrice: 300,
                        stars: 4,
                        rating: 9.2
                    },
                    {
                        hotelId: 12,
                        name: "Melia Benidorm",
                        location: "Rincón de Loix",
                        hotelPrice: 280,
                        stars: 4,
                        rating: 8.4
                    }
                ]
            }
        ]
    };

    const italy = {
        countryId: 4,
        countryCode: "IT",
        name: "Italy",
        countryPrice: 950,
        airports: [],
        capital: "Rome",
        typesOfTourism: ["Historical", "Cultural", "Gastronomical"],
        numberOfPeople: 2,
        img: "../assets/countryImages/ItalyImage.jpg",
        cities: [
            {
                cityId: 6,
                name: "Rome",
                cityPrice: 300,
                img: "../assets/cityImages/rome.jpg",
                hotels: [
                    {
                        hotelId: 13,
                        name: "Hotel Artemide",
                        location: "Via Nazionale",
                        hotelPrice: 400,
                        stars: 4,
                        rating: 9.5
                    },
                    {
                        hotelId: 14,
                        name: "NH Collection Roma",
                        location: "Centro",
                        hotelPrice: 420,
                        stars: 5,
                        rating: 9.0
                    }
                ]
            },
            {
                cityId: 7,
                name: "Milan",
                cityPrice: 280,
                img: "../assets/cityImages/milan.jpg",
                hotels: [
                    {
                        hotelId: 15,
                        name: "Room Mate Giulia",
                        location: "Centro",
                        hotelPrice: 390,
                        stars: 4,
                        rating: 9.3
                    },
                    {
                        hotelId: 16,
                        name: "Hotel Berna",
                        location: "Stazione Centrale",
                        hotelPrice: 330,
                        stars: 4,
                        rating: 8.8
                    }
                ]
            }
        ]
    };

    const madagascar = {
        countryId: 5,
        countryCode: "MG",
        name: "Madagascar",
        countryPrice: 1000,
        airports: [],
        capital: "Antananarivo",
        typesOfTourism: ["Nature", "Adventure", "Climate"],
        numberOfPeople: 3,
        img: "../assets/countryImages/MadagascarImage.jpg",
        cities: [
            {
                cityId: 8,
                name: "Antananarivo",
                cityPrice: 180,
                img: "../assets/cityImages/antananarivo.jpg",
                hotels: [
                    {
                        hotelId: 17,
                        name: "Hotel Colbert",
                        location: "Centre Ville",
                        hotelPrice: 200,
                        stars: 4,
                        rating: 8.3
                    },
                    {
                        hotelId: 18,
                        name: "Palissandre Hotel & Spa",
                        location: "Cité Bel’air",
                        hotelPrice: 220,
                        stars: 4,
                        rating: 8.7
                    }
                ]
            }
        ]
    };

    const iceland = {
        countryId: 6,
        countryCode: "IS",
        name: "Iceland",
        countryPrice: 1100,
        airports: [],
        capital: "Reykjavík",
        typesOfTourism: ["Adventure", "Nature", "Climate"],
        numberOfPeople: 1,
        img: "../assets/countryImages/IcelandImage.png",
        cities: [
            {
                cityId: 9,
                name: "Reykjavík",
                cityPrice: 350,
                img: "../assets/cityImages/reykjavik.jpg",
                hotels: [
                    {
                        hotelId: 19,
                        name: "Hotel Borg",
                        location: "Centro",
                        hotelPrice: 420,
                        stars: 4,
                        rating: 9.1
                    },
                    {
                        hotelId: 20,
                        name: "Center Hotels Plaza",
                        location: "Downtown",
                        hotelPrice: 400,
                        stars: 3,
                        rating: 8.5
                    }
                ]
            }
        ]
    };


    countries.push(japan, mexico, spain, italy, madagascar, iceland);

    localStorage.setItem("countries", JSON.stringify(countries));

    return countries;
}

export function bookingsInit() {
    const localBookings = localStorage.getItem("bookings");

    if (localBookings) {
        const parsed = JSON.parse(localBookings);
        return parsed.map(booking => new Booking(
            booking.bookingId,
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
        1,
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
    localStorage.setItem("bookings", JSON.stringify(bookings));

    return bookings;
}

export function titlesInit() {
    const localTitles = localStorage.getItem("titles")

    if (localTitles) {
        const parsedTitles = JSON.parse(localTitles);

        return parsedTitles.map(title => {
            return new Title(
                title.titleName,
                title.requirementsText,
                title.numTripsReq
            );
        });
    }

    let titles = [];

    const beginnerTraveler = new Title(
        "Beginner Traveler",
        "Book your first trip using SmartTrip and complete it.",
        1
    )

    const experiencedTraveler = new Title(
        "Experienced Traveler",
        "Book 5 trips using SmartTrip and complete them",
        5
    )

    const advancedTraveler = new Title(
        "Advanced Traveler",
        "Book 10 trips using SmartTrip and complete them",
        10
    )

    titles.push(beginnerTraveler, experiencedTraveler, advancedTraveler);

    localStorage.setItem("titles", JSON.stringify(titles))

    return titles
}