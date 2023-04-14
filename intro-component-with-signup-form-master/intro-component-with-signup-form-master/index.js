const formEl = document.querySelector('form')
const inputs = document.querySelector('form').elements
const firstNameControl = inputs["firstName"]
const lastNameControl = inputs["lastName"]
const emailControl = inputs["email"]
const passwordControl = inputs["password"]
function returnInputValue(controlName) {
    let control = inputs[controlName]
    control.addEventListener('input', (e) => {
        return control.value
    })
}
function setValidationErrorMessageById(spanId, errorMessage) {
    document.getElementById(spanId).style.scale = 1;
    document.getElementById(spanId).innerText = errorMessage;
}
function removeValidationErrorById(spanId) {
    document.getElementById(spanId).style.scale = 0;
    document.getElementById(spanId).innerText = '';
}

function setInputValidation(controlName, spanId, errorMessage) {
    if (!inputs[controlName].value) {
        setValidationErrorMessageById(spanId, errorMessage)
        !inputs[controlName].classList.add('invalid')
    } else {
        removeValidationErrorById(spanId)
        !inputs[controlName].classList.remove('invalid')
    }
}
function validateEmail(email) {
    // source: https://stackoverflow.com/a/46181/17733859
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function setEmailValidation() {
    if (!validateEmail(inputs["email"].value) && inputs["email"].value) {
        setValidationErrorMessageById('emailValidation', 'Looks like this is not an email')
        !inputs["email"].classList.add('invalid')
    } else if (inputs["email"].value) {
        removeValidationErrorById("emailValidation")
    }
}
firstNameControl.addEventListener('blur', e => {
    setInputValidation("firstName", "firstNameValidation", "First Name cannot be empty")
})
firstNameControl.addEventListener('input', e => {
    setInputValidation("firstName", "firstNameValidation", "First Name cannot be empty")
})
lastNameControl.addEventListener('blur', e => {
    setInputValidation("lastName", "lastNameValidation", "Last Name cannot be empty")
})
lastNameControl.addEventListener('input', e => {
    setInputValidation("lastName", "lastNameValidation", "Last Name cannot be empty")
})
emailControl.addEventListener('blur', e => {
    setInputValidation('email', 'emailValidation', 'Email cannot be empty')
})
emailControl.addEventListener('input', e => {
    setInputValidation('email', 'emailValidation', 'Email cannot be empty')
})
emailControl.addEventListener('blur', e => {
    setEmailValidation()
})
emailControl.addEventListener('input', e => {
    setEmailValidation()
})
passwordControl.addEventListener('blur', e => {
    setInputValidation("password", "passwordValidation", "Password cannot be empty")
})
passwordControl.addEventListener('input', e => {
    setInputValidation("password", "passwordValidation", "Password cannot be empty")
})
formEl.addEventListener('submit', e => {
    e.preventDefault()
    setInputValidation("firstName", "firstNameValidation", "First Name cannot be empty")
    setInputValidation("lastName", "lastNameValidation", "Last Name cannot be empty")
    setInputValidation("email", "emailValidation", "Email cannot be empty")
    setInputValidation("password", "passwordValidation", "Password cannot be empty")
    setEmailValidation();
})