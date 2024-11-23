let user = sessionStorage.getItem('user')
let nameInput = document.querySelector('#name-input')
let submitBtn = document.querySelector('#submit-btn')
nameInput.value = '' //reset value to empty if not already
// if user session exists, redirect to /channels
if (user) {
    window.location.href = '/channels';
}

/**
 * Fetches the messages and updates the page
 */
function getUserExists() {
    fetch(`http://localhost:8080/users/${nameInput.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            setUsername(data)
        })
}

function setUsername(exists) {
    if(exists) {
        nameInput.value = ''
        alert(`Username already exists!`)
    }else{
        sessionStorage.setItem('user', nameInput.value)
    }
}

// adds user when submit button is clicked
submitBtn.addEventListener('click', () => {
    nameInput.value = nameInput.value.trim()
    if (!(nameInput.value === '')) {
        getUserExists()
    }

})


