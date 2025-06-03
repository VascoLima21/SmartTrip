import { verifyUserData } from "./verify.js"

export function editData() {
    const curUser = JSON.parse(localStorage.getItem("userLogged"))
    const oldCurUser = JSON.parse(localStorage.getItem("userLogged"))
    const name = document.getElementById("editName").value
    const email = document.getElementById("editEmail").value
    const password = document.getElementById("editPassword").value
    const confPassword = document.getElementById("editConfPassword").value


    if (!password && !confPassword) {
        if (verifyUserData(name, email)) {
            curUser.name = name
            curUser.email = email
        } else {
            return false
        }
    } else {
        if (verifyUserData(name, email, password, confPassword)) {
            curUser.name = name
            curUser.email = email
            curUser.password = password
        } else {
            return false
        }
    }

    const users = JSON.parse(localStorage.getItem("users"))
    const updatedUsers = users.map(user => {
        if (user.name == oldCurUser.name && user.email == oldCurUser.email) {
            alert(curUser)
            return curUser
        }
        return user
    })

    localStorage.setItem("userLogged", (JSON.stringify(curUser)))
    localStorage.setItem("users", (JSON.stringify(updatedUsers)))

    return true
}