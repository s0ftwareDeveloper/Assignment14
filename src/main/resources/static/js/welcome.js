let nameInput = document.querySelector('#name-input')
let submitBtn = document.querySelector('#submit-btn')
nameInput.value = '' //reset value to empty if not already
// if user session exists, redirect to /channels
if (sessionStorage.getItem('user') != null) {
    window.location.href = '/channels';
}

// adds user when submit button is clicked
submitBtn.addEventListener('click', () => {
    if (!(nameInput.value === '')) {
        sessionStorage.setItem('user', nameInput.value)
    }

})


