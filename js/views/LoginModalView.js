import { login, getUserLogged } from "../utils/auth.js"
import renderNavbar from "./NavbarView.js"
import { isHomePage } from "./NavbarView.js"

export function initLoginModal() {
    const loginForm = document.getElementById("loginForm")
    if (!loginForm) return

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const name = document.getElementById("nameOrEmailInput").value
        const password = document.getElementById("passwordInputLogin").value

        const success = login(name, password)

        if (success) {
            const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"))
            loginModal.hide()

            renderNavbar()
            if (isHomePage()) {
                renderWelcomeText()
            }
        } else {
            alert("Login failed.")
        }
    })
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