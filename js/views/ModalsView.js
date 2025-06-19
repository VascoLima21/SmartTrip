  export default function renderModals() {
    const modalsHTML = `
        <!-- Login Modal -->
        <div class="modal" id="loginModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Login</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm">
                            <div class="form-group">
                                <label for="nameOrEmailInput">Name/Email</label>
                                <input type="text" class="form-control" id="nameOrEmailInput" placeholder="Type your Name or Email">
                            </div>
                            <div class="form-group">
                                <label for="passwordInputLogin">Password</label>
                                <input type="password" class="form-control" id="passwordInputLogin" placeholder="Type your Password">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                        <div class="text-center w-100">
                            <small class="text-muted">Don’t have an account?
                                <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#signUpModal" id="loginToRegister">Register!</a>
                            </small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sign Up Modal -->
        <div class="modal" id="signUpModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create Account</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="signUpModalForm">
                            <div class="form-group">
                                <label for="emailInput">Email</label>
                                <input type="email" class="form-control" id="emailInput" placeholder="Type your Email">
                            </div>
                            <div class="form-group">
                                <label for="nameInput">Name</label>
                                <input type="text" class="form-control" id="nameInput" placeholder="Type your Name">
                            </div>
                            <div class="form-group">
                                <label for="birthDate">Date of Birth</label>
                                <input type="date" class="form-control" id="birthDateInput">
                            </div>
                            <div class="form-group">
                                <label for="passwordInputRegister">Password</label>
                                <input type="password" class="form-control" id="passwordInputRegister" placeholder="Type your Password">
                            </div>
                            <div class="form-group">
                                <label for="confPasswordInput">Confirm Password</label>
                                <input type="password" class="form-control" id="confPasswordInput" placeholder="Type your Password Again">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                        <div class="text-center w-100">
                            <small class="text-muted">Already have an account?
                                <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal" id="signupToLogin">Log in!</a>
                            </small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement("div")
    wrapper.innerHTML = modalsHTML
    document.body.appendChild(wrapper)
  }