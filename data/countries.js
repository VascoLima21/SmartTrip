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