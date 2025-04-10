// After user.updateProfile(...)
const idToken = await user.getIdToken();

fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        idToken,
        firstName,
        lastName,
        fatherName,
        email,
        phone,
        profilePhotoUrl: photoURL
    })
})
.then(res => res.json())
.then(data => {
    console.log(data);
})
.catch(err => {
    console.error("Backend error:", err);
});
