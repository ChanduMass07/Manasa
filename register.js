const backendUrl = "http://localhost:3000"; // Change to your backend URL if hosted

let otpVerified = false; // Track OTP verification status

// Function to send OTP
document.getElementById("sendOtp").addEventListener("click", async () => {
  const email = document.getElementById("email").value;

  if (!email) return alert("Please enter an email address.");

  try {
    // Send OTP request to the backend
    const response = await fetch("http://localhost:3000/api/sendOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Sending email in request body
    });

    const data = await response.json(); // Get response from backend
    if (response.ok) {
      alert("✅ OTP sent to your email.");
    } else {
      alert(`❌ Failed to send OTP: ${data.message}`);
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    alert("❌ Error sending OTP. Try again.");
  }
});

// Function to verify OTP
document.getElementById("verifyOtp").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  if (!otp) return alert("Please enter the OTP.");

  try {
    // Send OTP verification request to the backend
    const response = await fetch("http://localhost:3000/api/sendOtp" {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }), // Send OTP and email for verification
    });

    const data = await response.json(); // Get response from backend
    if (response.ok) {
      otpVerified = true;
      alert("✅ OTP verified successfully!");
    } else {
      otpVerified = false;
      alert(`❌ OTP verification failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    alert("❌ Error verifying OTP. Try again.");
  }
});

// Form submission and registration
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!otpVerified) {
    return alert("⚠️ Please verify your OTP before submitting the form.");
  }

  const formData = new FormData();

  // Append form fields to formData
  formData.append("firstName", document.getElementById("first-name").value);
  formData.append("lastName", document.getElementById("last-name").value);
  formData.append("fatherName", document.getElementById("father-name").value);
  formData.append("username", document.getElementById("username").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("password", document.getElementById("password").value);
  formData.append("confirmPassword", document.getElementById("confirm-password").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("aadharNumber", document.getElementById("aadhar-number").value);
  formData.append("panNumber", document.getElementById("PAN-Number").value);

  // Append file inputs
  formData.append("profilePhoto", document.getElementById("profile-photo").files[0]);
  formData.append("aadharCard", document.getElementById("aadhar-card").files[0]);
  formData.append("panCard", document.getElementById("PAN-card").files[0]);
  formData.append("signature", document.getElementById("signature").files[0]);

  try {
    // Send registration request to the backend
    const response = await fetch("http://localhost:3000/api/user/register", {
      method: "POST",
      body: formData, // Send form data to the backend
    });

    const result = await response.json(); // Get response from backend
    if (response.ok) {
      alert("✅ Registered successfully!");
      document.getElementById("registerForm").reset();
      otpVerified = false; // Reset OTP verification status after successful registration
    } else {
      alert(`❌ Registration failed: ${result.message}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("❌ Error during registration.");
  }
});
