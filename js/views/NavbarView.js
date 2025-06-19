import { getUserLogged, logout } from "../utils/auth.js"
import { renderWelcomeText } from "./LoginModalView.js"

export function isHomePage() {
    return location.pathname.endsWith("index.html")
}

export default function renderNavbar() {
    const user = getUserLogged()
    const pathStart = isHomePage() ? "./html" : "../html"
    const assetsPath = isHomePage() ? "./assets" : "../assets"
    const logoPath = isHomePage() ? "SmartTrip Logo Selected.svg" : "SmartTrip Logo.svg"
    const currentPage = location.pathname.split("/").pop()

    const navbarHTML = `
        <nav class="navbar navbar-expand-lg navbar-light blue-1 mt-3">
            <a class="navbar-brand nav-item ml-5 ${isHomePage() ? "yellow" : ""}" href="/index.html" id="navbarLogo">
            <img src="${assetsPath}/${logoPath}" width="30" height="30" class="d-inline-block align-top" alt="">
            SmartTrip
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link ${currentPage == 'booking.html' ? 'yellow' : ''}" href="${pathStart}/booking.html">Booking</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${currentPage == 'destinations.html' ? 'yellow' : ''}" href="${pathStart}/destinations.html">Destinations</a>
                </li>
                ${user
            ? `
                <li class="nav-item">
                    <a class="nav-link ${currentPage == 'profile.html' ? 'yellow' : ''}" href="${pathStart}/profile.html">Profile</a>
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

    // const currentPath = location.pathname

    // document.querySelectorAll(".nav-link").forEach(link => {
    //     alert(link.href.endsWith("/"))
    // })
    // If there is a logout button adds event listener to it
    const logoutBtn = document.getElementById("logoutBtn")
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logout()
            renderNavbar()
        })
    }
}