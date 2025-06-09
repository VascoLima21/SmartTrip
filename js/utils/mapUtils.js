import { getUserLogged } from "./auth.js";

export function highlightVisitedCountries() {
    const curUser = getUserLogged()
    const userBookings = curUser.myBookings
    //Reconstructs the array so that it has access to the method hasEnded in the myBookings objects
    const visitedCountries = userBookings.filter(booking => booking.hasEnded)

    visitedCountries.forEach(booking => {
        const countryCode = booking.destinationCountryCode

        simplemaps_worldmap_mapdata.state_specific[countryCode].color = "#B30808"
    })
}