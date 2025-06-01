import User from "./models/users.js"

let users = []

export function initUsers() {
    let user = new User("admin1", "admin1@gmail.com", "14/3/1990", "adminPassword123", [], 0,
        "./assets/profileImages/admin1pfp.jpg", [], [], "", "admin")
    users.push(user)
}