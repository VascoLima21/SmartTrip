import users from "../data/users"
import calcAge from "./utils/date"
import calcAge from "./utils/date"

export default function login(username, password) {
    for (let user of users) {
        if (user.username == username && user.password == password) {
            localStorage.setItem("userLogged", JSON.stringify(user))
            // Modal Alerting the user that they suceeded in logging in and saying welcome
            return true
        } else if (user.username == username && user.password !== password) {
            // Modal alerting that the passwords don't match
            return false
        }
    }
    // Modal alerting that the username was not found
    return false
}

export default function logout() {
    localStorage.removeItem("userLogged")
}

export default function getUserLogged() {
    return JSON.parse(localStorage.getItem("userLogged"))
}

export default function createAccount(email, username, password, birthDate) {
    for (let user of users) {
        if (user.email == email) {
            // Modal for error message "User with that email already exists"
            return false
        } else if (user.username == username) {
            // Modal for error message "Username already exists"
            return false
        }
    }

    // Creates new user object
    const newUser = {
        username: username,
        email: email,
        password: password,
        birthDate: birthDate,
        age: function() {
            return calcAge(this.birthDate);
        },
        role: "user"
    }
    users.push(newUser)
    localStorage.setItem("userLogged", JSON.stringify(newUser))
    return true
}