import { createAccount } from "../utils/auth.js"
import { renderWelcomeText } from "./LoginModalView.js"
import { isHomePage } from "./NavbarView.js"
import renderNavbar from "./NavbarView.js"

export function initRegisterModal() {
    const loginToRegisterLink = document.getElementById("loginToRegister")
    const registerToLoginLink = document.getElementById("signupToLogin")

    // Hides loginModal and shows registerModal
    if (loginToRegisterLink) {
        loginToRegisterLink.addEventListener("click", (e) => {
            e.preventDefault()
            const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"))
            loginModal?.hide()

            const signUpModalEl = document.getElementById("signUpModal")
            const signUpModal = new bootstrap.Modal(signUpModalEl)
            signUpModal.show()
        })
    }

    //Hides registerModal and shows loginModal
    if (registerToLoginLink) {
        registerToLoginLink.addEventListener("click", (e) => {
            e.preventDefault()
            const signUpModal = bootstrap.Modal.getInstance(document.getElementById("signUpModal"))
            signUpModal?.hide()

            const loginModalEl = document.getElementById("loginModal")
            const loginModal = new bootstrap.Modal(loginModalEl)
            loginModal.show()
        })
    }

    const registerForm = document.getElementById("signUpModalForm")
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const name = document.getElementById("nameInput").value
        const email = document.getElementById("emailInput").value
        const birthDate = document.getElementById("birthDateInput").value
        const password = document.getElementById("passwordInputRegister").value
        const confPassword = document.getElementById("confPasswordInput").value

        // const success = createAccount(email, name, password, confPassword, birthDate)
        const success = createAccount("teste@gmail.com", "teste", "teste123", "teste123", "22/05/2007")

        if (success) {
            const registerModal = bootstrap.Modal.getInstance(document.getElementById("signUpModal"))
            registerModal.hide()

            renderNavbar()
            if (isHomePage()) {
                document.addEventListener("DOMContentLoaded", () => {
                    renderWelcomeText()
                })
            }

        } else {
            alert("Register failed.")
        }
    })
}
