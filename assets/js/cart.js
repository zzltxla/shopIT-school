const priceTotal = document.querySelector("#price-total");

    function showCart() {
    
        if (cart.length === 0) {
            let h2 = document.createElement("h2");
            h2.textContent = "You have nothing in your cart at the moment";
            articleWrapper.append(h2);

            priceTotal.textContent = "Your total is 0$";
        } else if (cart.length > 0){
            cart.forEach(product => {
                totalPrice += product.price;
                console.log('showcart working');
                createArticle(product);
            });
        }
    updatePrice();
}

function updatePrice() {
    if (priceTotal) { 
        priceTotal.textContent = `Your total is ${totalPrice} $` 
    };
}

document.addEventListener("DOMContentLoaded", () =>
    {
    if (document.URL.includes("cart.html")) { //if in cart page
        showCart() //display the cart

        if (form) { //managing the form
            const address = form.elements["address"];
            const email = form.elements["email"];
            const password = form.elements["password"];
            const confirmPassword = form.elements["confirm-password"];
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    
            const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
            const passwordReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    
            const addressReg = /((^[0-9]*).?((BIS)|(TER)|(QUATER))?)?((\W+)|(^))(([a-z]+.)*)([0-9]{5})?.(([a-z\'']+.)*)$/;
    
    
            const isRequired = value => value === '' ? false : true;
            
            function isValid(value, regex) {
                return regex.test(value);
            }
    
            const showError = (input, message) => {
                const formField = input.parentElement;
    
                // add the error class
                formField.classList.remove('success');
                formField.classList.add('error');
    
                // show the error message
                const error = formField.querySelector('small');
                error.textContent = message;
            }
            
            const showSuccess = (input) => {
                // get the form-field element
                const formField = input.parentElement;
    
                // remove the error class
                formField.classList.remove('error');
                formField.classList.add('success');
    
                // hide the error message
                const error = formField.querySelector('small');
                error.textContent = '';
            }
    
            const showConfirmation = () => {
                console.log('success !');
                confirmationMessage.textContent = `Thank you for your order!`;
    
                window.location.href = "../views/confirmation.html";
            }
    
            const checkEmail = () => {
                let valid = false;
                const emailVAL = email.value.trim();
                if (!isRequired(emailVAL)) {
                    showError(email, 'Email cannot be blank.');
                } else if (!isValid(emailVAL, emailReg)) {
                    showError(email, 'Email is not valid.')
                } else {
                    showSuccess(email);
                    valid = true;
                }
    
                return valid;
            }
    
            const checkPassword = () => {
                let valid = false;
                const passwordVAL = password.value.trim();
                if (!isRequired(passwordVAL)) {
                    showError(password, 'Password cannot be blank');
                } else if (!isValid(passwordVAL, passwordReg)) {
                    showError(password, 'Password is not safe');
                } else {
                    showSuccess(password);
                    valid = true;
                }
    
                return valid;
            }
    
            const checkAddress = () => {
                let valid = false; 
                const addressVAL = address.value.trim();
                if (!isRequired(addressVAL)) {
                    showError(address, 'Address cannot be blank');
                } else if (!isValid(addressVAL, addressReg)) {
                    showError(address, 'Address format is incorect');
                } else {
                    showSuccess(address); 
                    valid = true;
                }
    
                return valid;
            }
    
            const checkConfirmPassword = () => {
                let valid = false;
                // check confirm password
                const confirmPasswordVAL = confirmPassword.value.trim();
                const passwordVAL = password.value.trim();
            
                if (!isRequired(confirmPasswordVAL)) {
                    showError(confirmPassword, 'Please enter the password again');
                } else if (passwordVAL !== confirmPasswordVAL) {
                    showError(confirmPassword, 'Confirm password does not match');
                } else {
                    showSuccess(confirmPassword);
                    valid = true;
                }
            
                return valid;
            };
    
            form.addEventListener('submit', function (e) {
                // prevent the form from submitting
                e.preventDefault();
                console.log('test 1');
            
                // validate forms
                let isAddressValid = checkAddress(),
                    isEmailValid = checkEmail(),
                    isPasswordValid = checkPassword(),
                    isConfirmPasswordValid = checkConfirmPassword();
            
                let isFormValid = isAddressValid &&
                    isEmailValid &&
                    isPasswordValid &&
                    isConfirmPasswordValid;
    
                    console.log(isFormValid);
            
                // submit to the server if the form is valid
                if (isFormValid) {
                    const userInfo = {
                        address: address,
                        email: email,
                        password: password,
                    }
                    localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Save user info
                    window.location.href = "../views/confirmation.html";

                }
            });
        }
    } 
})
