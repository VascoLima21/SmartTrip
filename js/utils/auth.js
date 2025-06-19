import calcAge from "./date.js"
import { User } from "../models/UserModel.js"
import { Booking } from "../models/BookingModel.js"

export function login(name, password) {
    const users = JSON.parse(localStorage.getItem("users")) || []

    for (let user of users) {
        if (user.name == name && user.password == password) {
            localStorage.setItem("userLogged", JSON.stringify(user))
            alert("Success")
            return true
        } else if (user.name == name) {
            return false
        }
    }

    alert("Something went wrong")
    return false
}

export function logout() {
    localStorage.removeItem("userLogged")
    alert("User Logged Out Successfully")
}

export function getUserLogged() {
    const parsedUser = JSON.parse(localStorage.getItem("userLogged"))
    if (!parsedUser) return null

    const bookings = parsedUser.myBookings?.map(booking => new Booking(
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
    )) || []

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

export function createAccount(email, name, password, confPassword, birthDate) {
    if (password != confPassword) {
        alert("Passwords do not match.")
        return false
    }

    const users = JSON.parse(localStorage.getItem("users")) || []

    for (let user of users) {
        if (user.email == email) {
            alert("User with that email already exists.")
            return false
        } else if (user.name == name) {
            alert("User with that name already exists.")
            return false
        }
    }

    const newUser = new User(
        name,
        email,
        birthDate,
        password,
        [], // bookings
        0, // points
        "./../assets/profileImages/defaultPfp.png",
        [], // titles
        [], // favouriteBookings
        "", // curTitle
        "user" // role
    )

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("userLogged", JSON.stringify(newUser))

    return true
}