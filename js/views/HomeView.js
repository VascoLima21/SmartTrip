import renderNavbar from "./NavbarView.js"
import { titlesInit, usersInit, countriesInit, bookingsInit } from "../init.js"
import { renderAuthModals } from "./ModalsView.js"
import { initLoginModal, renderWelcomeText } from "./LoginModalView.js"
import { initRegisterModal } from "./RegisterModalView.js"

document.addEventListener("DOMContentLoaded", () => {
    titlesInit()
    usersInit()
    countriesInit()
    bookingsInit()

    renderNavbar()
    renderAuthModals()
    initLoginModal()
    initRegisterModal()
    renderWelcomeText()

})

document.addEventListener("userLoggedIn", () => {
    renderNavbar()
})