import { login } from "../auth.js"
import renderNavbar, { renderWelcomeText } from "../views/NavbarView.js"

document.addEventListener("DOMContentLoaded", () => {
    renderNavbar()
})