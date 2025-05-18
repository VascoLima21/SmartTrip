import users from "../data/users.js"
import calcAge from "./utils/date.js"

export function login(name, password) {
    for (let user of users) {
        if (user.name == name && user.password == password) {
            localStorage.setItem("userLogged", JSON.stringify(user))
            // Modal Alerting the user that they suceeded in logging in and saying welcome
            alert("Sucess")
            return true
        } else if (user.name == name && user.password !== password) {
            // Modal alerting that the passwords don't match
            return false
        }
    }
    alert("Something Went Wrong")
    // Modal alerting that the name was not found
    return false
}

export function logout() {
    localStorage.removeItem("userLogged")
    alert("User Logged Out Successfully")
}

export function getUserLogged() {
    return JSON.parse(localStorage.getItem("userLogged"))
}

export function createAccount(email, name, password, birthDate) {
    for (let user of users) {
        if (user.email == email) {
            // Modal for error message "User with that email already exists"
            return false
        } else if (user.name == name) {
            // Modal for error message "name already exists"
            return false
        }
    }

    // Creates new user object
    const newUser = {
        name: name,
        email: email,
        birthDate: birthDate,
        password: password,
        countriesVisited: [],
        points: 0,
        profileImg: "./../assets/profileImages/defaultPfp.png",
        titles: [],
        curTitle: "",
        age: function() {
            return calcAge(this.birthDate)
        },
        role: "user"
    }
    users.push(newUser)
    localStorage.setItem("userLogged", JSON.stringify(newUser))
    return true
}