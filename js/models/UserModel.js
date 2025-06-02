import calcAge from "../utils/date.js"

export class User {
    constructor(name, email, birthDate, password, myBookings = [], points = 0, profileImg = "", titles = [], favouriteBookings = [], curTitle = "", role = "user") {
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.password = password;
        this.myBookings = myBookings;
        this.points = points;
        this.profileImg = profileImg;
        this.titles = titles;
        this.favouriteBookings = favouriteBookings;
        this.curTitle = curTitle;
        this.role = role;
    }

    get age() {
        return calcAge(this.birthDate);
    }
}