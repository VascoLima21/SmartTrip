import { getUserLogged } from "../utils/auth.js"

export function renderBookings(filter = "all") {
    const user = getUserLogged()
    const bookingsList = document.getElementById("bookingsList")
    bookingsList.innerHTML = ""

    const bookings = user.myBookings || []
    const favs = user.favouriteBookings || []
    const now = new Date()

    // Filter Bookings
    let filteredBookings = []

    if (filter === "all") {
        filteredBookings = bookings
    } else if (filter === "favorites") {
        filteredBookings = bookings.filter(booking => {
            const bookingId = booking.bookingId
            return favs.some(fav => {
                const favId = fav.bookingId
                return favId == bookingId
            })
        })
    } else if (filter === "active") {
        filteredBookings = bookings.filter(booking => {
            const start = new Date(booking.startDate)
            const end = new Date(booking.endDate)
            return start <= now && now <= end
        })
    } else if (filter === "ended") {
        filteredBookings = bookings.filter(booking => {
            const end = new Date(booking.endDate)
            return end < now
        })
    }

    //If length = 0 show text saying there are no bookings found
    if (filteredBookings.length == 0) {
        bookingsList.innerHTML = `<li class="list-group-item bg-transparent text-white">No bookings found for selected filter.</li>`
        return
    }

    // Creates the html for each user's booking card, according to filters
    filteredBookings.forEach((booking) => {
        const bookingId = booking.bookingId

        const isFav = favs.some(fav => (fav.bookingId == bookingId))

        const card = document.createElement("div")
        card.classList.add("card", "mb-3", "bg-dark", "text-white")
        card.style.maxWidth = "700px"
        card.style.margin = "0 auto"

        card.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-start">
                <div>
                    <h5 class="card-title">From: ${booking.departureAirport} To: ${booking.arrivalAirport}</h5>
                    <p class="card-text mb-0">
                        <strong>Hotel:</strong> ${booking.hotel.name} <br>
                        <strong>Start Date:</strong> ${new Date(booking.startDate).toLocaleDateString()} <br>
                        <strong>End Date:</strong> ${new Date(booking.endDate).toLocaleDateString()} <br>
                        <strong>Cost:</strong> $${booking.cost} <br>
                        <strong>People:</strong> ${booking.numberOfPeople}
                    </p>
                </div>
                <button class="btn btn-link fav-btn" aria-label="Toggle Favorite" style="font-size: 1.8rem; color: ${isFav ? 'red' : 'white'}">
                    ${isFav
                ? `<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" width="24" height="24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24" height="24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
            }
                </button>
            </div>
        `

        bookingsList.appendChild(card)

        //Adds event listeners to all favourite buttons
        const favBtn = card.querySelector(".fav-btn")
        favBtn.addEventListener("click", () => {
            if (isFav) {
                user.favouriteBookings = favs.filter(fav => {
                    const favId = fav.bookingId
                    return favId != bookingId
                })
            } else {
                user.favouriteBookings.push(booking)
            }
            localStorage.setItem("userLogged", JSON.stringify(user))
            renderBookings(filter)
        })
    })
}