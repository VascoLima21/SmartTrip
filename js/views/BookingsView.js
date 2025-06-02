import renderNavbar from "../views/NavbarView.js"

document.addEventListener("DOMContentLoaded", () => {
    renderNavbar()
})

function handleFormSubmission() {
    const bookingForm = document.getElementById('bookingForm');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = getFormData();
        
        // Validate form
        if (!validateForm(formData)) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show recommendations
        showRecommendations();
        
        // Log form data (for debugging/future use)
        console.log('Form submitted with:', formData);
    });
}

// Get all form data
function getFormData() {
    return {
        departure: document.getElementById('departureLocation').value,
        duration: document.getElementById('tripDuration').value,
        date: document.getElementById('tripDate').value,
        people: document.getElementById('numberOfPeople').value,
        tourism: document.getElementById('tourismType').value
    };
}

// Validate form data
function validateForm(formData) {
    return formData.departure && 
           formData.duration && 
           formData.date && 
           formData.people && 
           formData.tourism;
}

// Show recommendations section
function showRecommendations() {
    const recommendationsSection = document.getElementById('recommendationsSection');
    recommendationsSection.style.display = 'block';
    
    // Smooth scroll to recommendations
    setTimeout(() => {
        recommendationsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// Set minimum date to today
function setMinimumDate() {
    const dateInput = document.getElementById('tripDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission();
    handleLogout();
    setMinimumDate();
    
});

// Export functions for potential use in other modules
export {
    handleFormSubmission,
    getFormData,
    validateForm,
    showRecommendations,
};