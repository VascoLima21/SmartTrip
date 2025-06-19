export function verifyUserData(name, email, password, confPassword) {
    const users = JSON.parse(localStorage.getItem("users"))
    const curUser = JSON.parse(localStorage.getItem("userLogged"))

    for (let user of users) {
        if (user.email == curUser.email && user.name == curUser.name) {
            continue
        }
        if (user.name == name) {
            alert("Name already exists")
            return false
        }else if (user.email == email) {
            alert("Email already in use")
            return false
        }else if(password != confPassword) {
            alert("Passwords don't match")
            return false
        }
    }

    return true
}