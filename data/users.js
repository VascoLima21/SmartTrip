import calcAge from "../js/utils/date.js"

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