import { login } from "../utils/auth.js"
import renderNavbar, { renderWelcomeText } from "./NavbarView.js"
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
