import { getUserLogged } from "../utils/auth.js"
import { editData, editTitle } from "../utils/editData.js"
import renderNavbar from "./NavbarView.js"
import { loadWorldMap } from "../map/loadMap.js"
import { renderBookings } from "./UserBookingsView.js"

document.addEventListener("DOMContentLoaded", () => {
    renderNavbar()
    renderProfilePage()
})

function renderProfilePage() {
    const user = getUserLogged()

    const profileHTML = `
        <!-- Profile Tabs (nav) -->
        <ul class="nav nav-tabs justify-content-center" id="profileTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="myDataTab" data-bs-toggle="tab" href="#myData" role="tab">My Data</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="myMapTab" data-bs-toggle="tab" href="#myMap" role="tab">My Map</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="myTitlesTab" data-bs-toggle="tab" href="#myTitles" role="tab">My Titles</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link" id="myBookingsTab" data-bs-toggle="tab" href="#myBookings" role="tab">My Bookings</a>
            </li>
        </ul>

        <!-- Tab content -->
        <div class="tab-content mt-3" id="profileTabsContent">
            <div class="tab-pane fade show active" id="myData" role="tabpanel">
                <div class="container mt-4 p-4 rounded blue-1 text-white text-center" style="max-width: 600px">
                    <div class="d-flex justify-content-center mb-4">
                        <img src="${user.profileImg}" alt="Profile Image" class="rounded-circle" width="120" height="120">
                    </div>

                    <form id="editProfileForm" class="text-start">
                        <div class="mb-3">
                            <label for="editName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="editName" value="${user.name}">
                        </div>
                        <div class="mb-3">
                            <label for="editEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="editEmail" value="${user.email}">
                        </div>
                        <div class="mb-3">
                            <label for="editPassword" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="editPassword" placeholder="Enter new password">
                        </div>
                        <div class="mb-3">
                            <label for="editConfPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="editConfPassword" placeholder="Confirm new password">
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-light">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="tab-pane fade" id="myMap" role="tabpanel">
                <div style="max-width: 700px margin: 0 auto">
                    <div id="map" style="width: 100% height: 500px"></div>
                </div>
            </div>

            <div class="tab-pane fade" id="myTitles" role="tabpanel">
                <div class="container mt-4 p-4 rounded blue-1 text-white text-center" style="max-width: 600px">

                    <!-- CURRENT TITLE -->
                    <div class="mb-4 p-3 rounded bg-blue-2 bg-opacity-50">
                        <h5>Current Title</h5>
                        <p id="currentTitle" class="fw-bold yellow">${user.curTitle?.titleName || "No Title"}</p>
                    </div>

                    <!-- ALL TITLES -->
                        <div class="mb-4 p-3 rounded bg-blue-2 bg-opacity-50" style="max-height: 150px; overflow-y: auto">
                        <h5>All Titles</h5>
                        <ul id="titleList" class="list-group list-group-flush mt-2"></ul>
                    </div>

                    <!-- REQUIREMENTS -->
                    <div class="p-3 rounded bg-blue-2 bg-opacity-50">
                        <h5>Requirements</h5>
                        <p id="requirementsText" class="mt-2">Select a title to view the requirements.</p>
                    </div>

                    <button id="saveTitleBtn" class="btn btn-light mt-3" disabled>Save</button>

                </div>
            </div>
            <div class="tab-pane fade" id="myBookings" role="tabpanel">
                <select id="bookingFilter" class="form-select mb-3" style="max-width: 200px; margin: 0 auto">
                    <option value="all">All Bookings</option>
                    <option value="favorites">Favorites</option>
                    <option value="active">Active</option>
                    <option value="ended">Ended</option>
                </select>
                <div class="container mt-4 p-4 rounded blue-1 text-white text-center" style="max-width: 700px">
                    <h4>My Bookings</h4>
                    <ul id="bookingsList" class="list-group list-group-flush mt-3" style="max-height: 400px overflow-y: auto"></ul>
                </div>
            </div>
        </div>
    `

    document.body.insertAdjacentHTML("beforeend", profileHTML)

    const editProfileForm = document.getElementById("editProfileForm")
    editProfileForm.addEventListener("submit", (event) => {
        event.preventDefault()
        editData()
    })

    // Map
    let mapLoaded = false
    document.getElementById("myMapTab").addEventListener("click", () => {
        if (!mapLoaded) {
            loadWorldMap()
            mapLoaded = true
        }
    })

    // Titles logic
    const titleList = document.getElementById("titleList")
    const requirementsText = document.getElementById("requirementsText")
    const currentTitleText = document.getElementById("currentTitle")
    const saveTitleBtn = document.getElementById("saveTitleBtn")

    let selectedTitle
    const allTitles = JSON.parse(localStorage.getItem("titles"))

    allTitles.forEach(title => {
        const li = document.createElement("li")
        li.classList.add("list-group-item", "bg-transparent", "text-white", "border-0", "title-item")
        li.style.cursor = "pointer"
        li.textContent = title.titleName

        //Verifies if the user has the title unlocked or not
        const hasTitle = user.titles.some(t => t.titleName == title.titleName)
        if (!hasTitle) {
            li.classList.add("text-muted")
        }

        li.addEventListener("click", () => {
            selectedTitle = title
            requirementsText.textContent = title.requirementsText
            saveTitleBtn.disabled = !hasTitle  //If hasTitle is true (user has the title unlocked), the button will have disabled = !true, so disbled= false and vice-versa

            // Removes background from previous title selected
            document.querySelectorAll(".title-item").forEach(item => {
                item.classList.remove("selected")
            })

            // Adds bg to current selected title
            li.classList.add("selected")
        })

        titleList.appendChild(li)
    })

    saveTitleBtn.addEventListener("click", () => {
        if (selectedTitle) {
            currentTitleText.textContent = selectedTitle.titleName
            editTitle(selectedTitle)
            saveTitleBtn.disabled = true
        }
    })
    
    document.getElementById("myBookingsTab").addEventListener("click", () => {
        renderBookings()
    })
    document.getElementById("bookingFilter").addEventListener("change", (e) => {
        renderBookings(e.target.value)
    })

}