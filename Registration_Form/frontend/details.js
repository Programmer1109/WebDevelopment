 // details.js

function submitForm(event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('new-password').value,
        accountType: document.querySelector('input[name="account-type"]:checked').value,
        age: document.getElementById('age').value,
        referrer: document.getElementById('referrer').value,
        bio: document.getElementById('bio').value,
        termsAccepted: document.getElementById('terms-and-conditions').checked
    };

    console.log("Form Data = " + formData);

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.log(error);
        console.error('Error:', error);
        alert('Error registering. Please try again.');
    });
}
