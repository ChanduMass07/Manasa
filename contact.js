function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = "<p style='color: green; font-size: 18px;'>Message submitted successfully!</p>";
    
}

