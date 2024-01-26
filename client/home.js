document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");

    registrationForm.addEventListener("submit", function (event) {
        const createUsernameInput = document.getElementById("createUsername");
        const createPasswordInput = document.getElementById("createPassword");

        // Get the values from the inputs
        const createUsername = createUsernameInput.value;
        const createPassword = createPasswordInput.value;

        // Create an object to store the username and password
        const userCredentials = {
            createUsername: createUsername,
            createPassword: createPassword
        };

        // Send the userCredentials object to the server using Axios
        axios.post('/login', userCredentials)
            .then(response => {
                console.log(response.data);
                // Handle the server response if needed
            })
            .catch(error => {
                console.error("Error registering user:", error);
            });

        // Prevent the default form submission
        event.preventDefault();
    });
});