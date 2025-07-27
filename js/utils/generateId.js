export function generateId() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newId = bookings.length + 1;
    return newId;
}

export function generateUniqueDomId(prefix = "id") {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}
