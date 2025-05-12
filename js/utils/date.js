export default function calcAge(birthDate) {
    const today = new Date()
    const birthDateFormated = new Date(birthDate)

    let age = today.getFullYear() - birthDateFormated.getFullYear()

    // Compares today's month and day to the birthdate's days and month to see if the birthday has already happened. If not the age is the age - 1
    if (today.getMonth() < birthDateFormated.getMonth() || (today.getMonth() == birthDateFormated.getMonth() && today.getDate() < birthDateFormated.getDate())) {
        age--
    }

    return age
}