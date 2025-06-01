import calcAge from "../utils/date.js"

let users = []

const admin = {
    name: "admin1",
    email: "admin1@gmail.com",
    birthDate: "14/3/1990",
    password: "adminPassword123",
    countriesVisited: [],
    points: 0,
    profileImg: "../assets/profileImages/admin1pfp.jpg",
    titles: [],
    curTitle: "",
    age: function () {
        return calcAge(this.birthDate)
    },
    role: "admin"
}

users.push(admin)

export default users

// export class User {
//     name = ""
//     email = ""
//     birthDate = ""
//     password = ""
//     myBookings = []
//     points = 0
//     profileImg = ""
//     titles = []
//     favouriteBookings = []
//     curTitle = ""
//     age = 0
//     role = ""
//     constructor(name, email, birthDate, password, myBookings, points, profileImg, titles, favouriteBookings, curTitle, age, role) {
//         this.name = name
//         this.email = email
//         this.birthDate = birthDate
//         this.password = password
//         this.myBookings = myBookings
//         this.points = points
//         this.profileImg = profileImg
//         this.titles = titles
//         this.favouriteBookings = favouriteBookings
//         this.curTitle = curTitle
//         this.age = this.calcAge(birthDate)
//         this.role = role
//     }

//     get age () {
//         return this.age
//     }

//     set age(birthdate) {
//         this.age = calcAge(birthdate)
//     }
// }