document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".sign-in-form");
    const signupForm = document.querySelector(".sign-up-form");
    const container = document.querySelector(".container");
    const signInBtn = document.getElementById("sign-in-btn");
    const signUpBtn = document.getElementById("sign-up-btn");
    const signInBtn2 = document.getElementById("sign-in-btn2");
    const signUpBtn2 = document.getElementById("sign-up-btn2");

    signUpBtn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });
    signInBtn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    signUpBtn2.addEventListener("click", () => {
        container.classList.add("sign-up-mode2");
    });
    signInBtn2.addEventListener("click", () => {
        container.classList.remove("sign-up-mode2");
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { "Content-Type": "application/json" }
        });
        const result = await response.json();
        alert(result.message);
    });

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const response = await fetch("/register", {
            method: "POST",
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: { "Content-Type": "application/json" }
        });
        const result = await response.json();
        alert(result.message);
    });
});