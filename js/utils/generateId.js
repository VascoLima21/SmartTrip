export function generateId() {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const newId = bookings.length + 1;
    return newId;
}