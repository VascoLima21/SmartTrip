import { login, getUserLogged } from "../utils/auth.js"
import renderNavbar from "./NavbarView.js"
import { usersInit, countriesInit } from "../init.js"

document.addEventListener("DOMContentLoaded", () => {
    const users = usersInit()
    const countries = countriesInit()
    renderNavbar()
    renderWelcomeText()

    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const name = document.getElementById("nameOrEmailInput").value
            const password = document.getElementById("passwordInputLogin").value

            // const success = login(name, password)
            const success = login("admin1", "adminPassword123")
            if (success) {
                // To close the modal
                const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'))
                loginModal.hide()

                // Update automatically the page
                renderNavbar()
                renderWelcomeText()
            } else {
                alert("Login failed.")
            }
        })
    }
})

function renderWelcomeText() {
    const user = getUserLogged()
    const welcomeTextDiv = document.getElementById("welcomeText")
    welcomeTextDiv.innerHTML = ""

    if (user) {
        const txtWelcomeUser = document.createElement("h1")
        txtWelcomeUser.textContent = `Welcome, ${user.name}!`
        welcomeTextDiv.appendChild(txtWelcomeUser)
    }
}