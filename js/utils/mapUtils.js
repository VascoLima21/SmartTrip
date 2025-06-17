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

    //Changes the normal click path to open a modal with info about old trips
    simplemaps_worldmap.hooks.click_state = function (countryCode) {
        openCountryModal(countryCode);
        //Criar função de openCountryModal para abrir o modal com as informações, de preferência num ficheiro separado
    }
    
}