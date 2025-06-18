import calcAge from "./date.js"
import { User } from "../models/UserModel.js"
import { Booking } from "../models/BookingModel.js"

const users = JSON.parse(localStorage.getItem("users"))

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
    const parsedUser = JSON.parse(localStorage.getItem("userLogged"))
    if (!parsedUser) return null

    // Reconstructing Booking instances
    const bookings = parsedUser.myBookings.map(booking => new Booking(
        booking.bookingId,
        booking.departureAirport,
        booking.arrivalAirport,
        booking.cost,
        booking.tourismType,
        booking.hotel,
        booking.numberOfPeople,
        booking.destinationCountry,
        booking.destinationCountryCode,
        booking.startDate,
        booking.endDate,
        booking.userEmail
    ))

    return new User(
        parsedUser.name,
        parsedUser.email,
        parsedUser.birthDate,
        parsedUser.password,
        bookings,
        parsedUser.points,
        parsedUser.profileImg,
        parsedUser.titles,
        parsedUser.favouriteBookings,
        parsedUser.curTitle,
        parsedUser.role
    )
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