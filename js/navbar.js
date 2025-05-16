import { getUserLogged, logout } from "./auth.js"

export default function renderNavbar() {
    const userLogged = getUserLogged()
    const navbarDiv = document.getElementById("navbarContainer")

    let authSection = ''

    if (userLogged) {
        //If the user is logged in load the navbar with the profile and logout options
        authSection = `
        <li class="nav-item">
                <a class="nav-link" href="./html/profile.html">Profile</a>
            </li>
            <li class="nav-item">
                <button class="nav-link btn btn-link" id="logoutBtn">Logout</button>
            </li>
        `
    } else{
        //If the user isn't logged in load the navbar with the login option
        authSection = `
            <li class="nav-item" id="signInNavbar">
                <button type="button" class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal" id="btnSignIn">
                    Sign In
                </button>
            </li>
        `
    }

    navbarDiv.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light blue-1 mt-3">
            <a class="navbar-brand nav-item active ml-5" href="#" id="navbarLogo">
                <img src="./assets/SmartTrip Logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
                SmartTrip
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="./html/booking.html">Booking</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./html/destinations.html">Destinations</a>
                    </li>
                    ${authSection}
                </ul>
            </div>
        </nav>
    `

    if(userLogged){
        document.getElementById('logoutBtn').addEventListener('click', () => {
            logout()
            renderNavbar() //To automatically reload the navbar
        })
    }
}