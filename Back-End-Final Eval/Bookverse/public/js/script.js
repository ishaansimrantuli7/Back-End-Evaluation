document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const signInButton = document.getElementById("signIn");
    const signUpButton = document.getElementById("signUp");

    if (signUpButton && container) {
        signUpButton.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });
    }

    if (signInButton && container) {
        signInButton.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });
    }

    // Existing form submission handlers (preserved)
    const loginForm = document.querySelector(".sign-in-container form");
    const signupForm = document.querySelector(".sign-up-container form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const response = await fetch("/auth/login", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            alert(result.message);
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const response = await fetch("/auth/register", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            alert(result.message);
        });
    }

    // New event listener for libraryBookingForm submission (if exists)
    const bookingForm = document.getElementById("libraryBookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const response = await fetch("/bookings", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" }
            });
            const result = await response.json();
            alert(result.message);
            if (response.ok) {
                bookingForm.reset();
            }
        });
    }
});