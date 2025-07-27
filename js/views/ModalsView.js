export function renderAuthModals() {
  const modalsHTML = `
      <!-- Login Modal -->
      <div class="modal fade" id="loginModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content p-4 rounded shadow-lg">
                  <div class="modal-header border-0">
                      <h5 class="modal-title w-100 text-center">Login</h5>
                      <button type="button" class="btn-close position-absolute end-0 me-3 mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <form id="loginForm" class="d-flex flex-column gap-3">
                          <div>
                              <label for="nameOrEmailInput" class="form-label">Name</label>
                            <input type="text" class="form-control" id="nameOrEmailInput" placeholder="Enter your name">
                          </div>
                          <div>
                              <label for="passwordInputLogin" class="form-label">Password</label>
                              <input type="password" class="form-control" id="passwordInputLogin" placeholder="Enter your password">
                          </div>
                          <button type="submit" class="btn btn-primary w-100 mt-3">Log In</button>
                      </form>
                      <div class="text-center mt-3">
                          <small class="text-muted">Don’t have an account?
                              <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#signUpModal" id="loginToRegister">Register!</a>
                          </small>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <!-- Sign Up Modal -->
      <div class="modal fade" id="signUpModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content p-4 rounded shadow-lg">
                  <div class="modal-header border-0">
                      <h5 class="modal-title w-100 text-center">Create Account</h5>
                      <button type="button" class="btn-close position-absolute end-0 me-3 mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <form id="signUpModalForm" class="d-flex flex-column gap-3">
                          <div>
                              <label for="emailInput" class="form-label">Email</label>
                              <input type="email" class="form-control" id="emailInput" placeholder="Enter your email">
                          </div>
                          <div>
                              <label for="nameInput" class="form-label">Name</label>
                              <input type="text" class="form-control" id="nameInput" placeholder="Enter your name">
                          </div>
                          <div>
                              <label for="birthDateInput" class="form-label">Date of Birth</label>
                              <input type="date" class="form-control" id="birthDateInput">
                          </div>
                          <div>
                              <label for="passwordInputRegister" class="form-label">Password</label>
                              <input type="password" class="form-control" id="passwordInputRegister" placeholder="Enter your password">
                          </div>
                          <div>
                              <label for="confPasswordInput" class="form-label">Confirm Password</label>
                              <input type="password" class="form-control" id="confPasswordInput" placeholder="Confirm your password">
                          </div>
                          <button type="submit" class="btn btn-primary w-100 mt-3">Create Account</button>
                      </form>
                      <div class="text-center mt-3">
                          <small class="text-muted">Already have an account?
                              <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal" id="signupToLogin">Log in!</a>
                          </small>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;

  const wrapper = document.createElement("div")
  wrapper.innerHTML = modalsHTML
  document.body.appendChild(wrapper)
}

export function renderRecDetailsModal() {
  if (document.getElementById("bookingDetailsModal")) return;
  const modalHTML = `
  <!-- Booking Details Modal -->
    <div class="modal fade" id="bookingDetailsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content p-4 rounded shadow-lg">
          <div class="modal-header border-0">
            <h5 class="modal-title w-100 text-center">Booking Details</h5>
            <button type="button" class="btn-close position-absolute end-0 me-3 mt-2" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="list-group list-group-flush" id="bookingDetailsList">
              <li class="list-group-item"><strong>Departure Airport:</strong> <span id="bookingDeparture"></span></li>
              <li class="list-group-item"><strong>Arrival Airport:</strong> <span id="bookingArrival"></span></li>
              <li class="list-group-item"><strong>Cost:</strong> €<span id="bookingCost"></span></li>
              <li class="list-group-item"><strong>Tourism Types:</strong> <span id="bookingTourism"></span></li>
              <li class="list-group-item"><strong>Hotel:</strong> <span id="bookingHotel"></span></li>
              <li class="list-group-item"><strong>Number of People:</strong> <span id="bookingPeople"></span></li>
              <li class="list-group-item"><strong>Country:</strong> <span id="bookingCountry"></span></li>
              <li class="list-group-item"><strong>City:</strong> <span id="bookingCity"></span></li>
              <li class="list-group-item"><strong>Start Date:</strong> <span id="bookingStartDate"></span></li>
              <li class="list-group-item"><strong>End Date:</strong> <span id="bookingEndDate"></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  const wrapper = document.createElement("div")
  wrapper.innerHTML = modalHTML
  document.body.appendChild(wrapper)
}

export function showBookingDetailsModal(destination) {
  console.log(destination);
  
  document.getElementById("bookingDeparture").innerText = destination.departureAirport;
  document.getElementById("bookingArrival").innerText = destination.arrivalAirport;
  document.getElementById("bookingCost").innerText = destination.cost;
  document.getElementById("bookingTourism").innerText = destination.tourismTypes.join(", ");
  document.getElementById("bookingHotel").innerText = destination.hotel.name;
  document.getElementById("bookingPeople").innerText = destination.people;
  document.getElementById("bookingCountry").innerText = destination.country;
  document.getElementById("bookingCity").innerText = destination.city;
  document.getElementById("bookingStartDate").innerText = destination.startDate;
  document.getElementById("bookingEndDate").innerText = destination.endDate;

  const modal = new bootstrap.Modal(document.getElementById("bookingDetailsModal"));
  modal.show();
}
