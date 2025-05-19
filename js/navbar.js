import { getUserLogged, logout } from "./auth.js"

function isHomePage() {
    return location.pathname.endsWith("index.html")
}
export default function renderNavbar() {
    const user = getUserLogged()
    const pathStart = isHomePage() ? "./html" : "../html"
    const assetsPath = isHomePage() ? "./assets" : "../assets"

    const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light blue-1 mt-3">
        <a class="navbar-brand nav-item active ml-5" href="#" id="navbarLogo">
            <img src="${assetsPath}/SmartTrip Logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
            SmartTrip
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="${pathStart}/booking.html">Booking</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${pathStart}/destinations.html">Destinations</a>
                </li>
                ${user
            ? `
                <li class="nav-item">
                    <a class="nav-link" href="${pathStart}/profile.html">Profile</a>
                </li>
                <li class="nav-item">
                    <button class="btn nav-link" id="logoutBtn">Logout</button>
                </li>`
            : `
                <li class="nav-item" id="signInNavbar">
                    <button type="button" class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal" id="btnSignIn">
                        Sign In
                    </button>
                </li>`
        }
            </ul>
        </div>
    </nav>`

    const container = document.getElementById("navbarContainer")
    container.innerHTML = navbarHTML

    // If there is a logout button add event listener to it
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logout()
            renderNavbar()
            renderWelcomeText()
        })
    }
}

export function renderWelcomeText() {
    const user = getUserLogged()
    const welcomeTextDiv = document.getElementById("welcomeText")
    welcomeTextDiv.innerHTML = ""

    if (user) {
        const txtWelcomeUser = document.createElement("h1")
        txtWelcomeUser.textContent = `Welcome, ${user.name}!`
        welcomeTextDiv.appendChild(txtWelcomeUser)
    }
}
