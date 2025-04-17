document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        age: document.getElementById('age').value
    };

    // Send data to the server
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful: ' + data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});