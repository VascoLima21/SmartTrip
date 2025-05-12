export const navbarHTML = `
        <a class="navbar-brand nav-item active ml-5" href="#" id="navbarLogo">
            <img src="./assets/SmartTrip Logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
            SmartTrip
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="./html/booking.html">Booking</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./html/destinations.html">Destinations</a>
                </li>
                <li class="nav-item" id="signInNavbar">
                    <button type="button" class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">
                        Sign In
                    </button>
                </li>
            </ul>
        </div>
`