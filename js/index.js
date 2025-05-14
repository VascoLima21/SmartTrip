import { login } from "./auth.js"

document.getElementById("loginForm").addEventListener('submit', (event) => {
    event.preventDefault()
    const name = document.getElementById("nameOrEmailInput").value
    const password = document.getElementById("passwordInputLogin").value
    login(name, password)
})