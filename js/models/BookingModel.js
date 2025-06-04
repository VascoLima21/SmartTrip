export class Booking {
    constructor(
        departureAirport,
        arrivalAirport,
        cost = 0,
        tourismType = [],
        hotel,
        numberOfPeople = 0,
        destinationCountry,          // Ex: "Japan"
        destinationCountryCode,      // Ex: "JP"
        startDate,
        endDate,
        userEmail
    ) {
        this.departureAirport = departureAirport
        this.arrivalAirport = arrivalAirport
        this.cost = cost
        this.tourismType = tourismType
        this.hotel = hotel
        this.numberOfPeople = numberOfPeople
        this.destinationCountry = destinationCountry
        this.destinationCountryCode = destinationCountryCode
        this.startDate = startDate
        this.endDate = endDate
        this.userEmail = userEmail
    }

    // To check if the trip has ended
    get hasEnded() {
        return new Date(this.endDate) < new Date()
    }
}  