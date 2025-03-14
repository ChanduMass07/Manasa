// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// OTP Sending Function
document.getElementById("sendOtp").addEventListener("click", function() {
    const phoneNumber = document.getElementById("phone").value;
    const appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            alert("OTP Sent!");
        }).catch(error => {
            console.error(error);
            alert("Failed to send OTP.");
        });
});

// OTP Verification Function
document.getElementById("verifyOtp").addEventListener("click", function() {
    const otp = document.getElementById("otp").value;
    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }

    window.confirmationResult.confirm(otp)
        .then(result => {
            alert("Phone number verified!");
        }).catch(error => {
            console.error(error);
            alert("Invalid OTP. Please try again.");
        });
});

// Form Validation
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const fatherName = document.getElementById("father-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const profilePhoto = document.getElementById("profile-photo").files[0];

    if (name.length < 3) {
        alert("Name must be at least 3 characters.");
        return;
    }

    if (fatherName.length < 3) {
        alert("Father's name must be at least 3 characters.");
        return;
    }

    if (!profilePhoto) {
        alert("Please upload a profile photo.");
        return;
    }

    if (phone.length !== 10) {
        alert("Enter a valid 10-digit phone number.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    alert("Registration Successful!");
});
