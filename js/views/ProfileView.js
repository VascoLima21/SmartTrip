import { getUserLogged } from "../utils/auth.js"
import { editData } from "../utils/editData.js"
import renderNavbar from "./NavbarView.js"

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
        </ul>

        <!-- Tab content -->
        <div class="tab-content mt-3" id="profileTabsContent">
            <div class="tab-pane fade show active" id="myData" role="tabpanel">
                <div class="container mt-4 p-4 rounded blue-1 text-white text-center" style="max-width: 600px;">
                    <!-- Profile Image -->
                    <div class="d-flex justify-content-center mb-4">
                        <img src="${user.profileImg}" alt="Profile Image" class="rounded-circle" width="120" height="120">
                    </div>

                    <!-- Edit Data Form -->
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
                <div class="container mt-4 text-center">
                    <p>This is the My Map tab content.</p>
                </div>
            </div>

            <div class="tab-pane fade" id="myTitles" role="tabpanel">
                <div class="container mt-4 text-center">
                    <p>This is the My Titles tab content.</p>
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
}
