import renderNavbar from "./NavbarView.js"
import { titlesInit, usersInit, countriesInit, bookingsInit } from "../init.js"
import renderModals from "./ModalsView.js"
import { initLoginModal, renderWelcomeText } from "./LoginModalView.js"
import { initRegisterModal } from "./RegisterModalView.js"

document.addEventListener("DOMContentLoaded", () => {
    titlesInit()
    usersInit()
    countriesInit()
    bookingsInit()

    renderNavbar()
    renderModals()
    initLoginModal()
    initRegisterModal()
    renderWelcomeText()

})

document.addEventListener("userLoggedIn", () => {
    renderNavbar()
})