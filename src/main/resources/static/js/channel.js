let textarea = document.querySelector("#textarea")
let channelId = document.querySelector('#channelId').value
let userName = document.querySelector('#user-name-span')

if (sessionStorage.getItem('user') == null) {
    window.location.href = '/welcome';
}

userName.textContent = sessionStorage.getItem('user')

/**
 * Calls send message when enter is pressed
 */
textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); //no new line
        sendMessage(textarea.value)
        textarea.value = ''
    }
})

/**
 * Saves message to channel
 * @param messageText message to be saved
 */
function sendMessage(messageText) {

    const message = {
        "text": messageText,
        "sender": sessionStorage.getItem('user'),
        "senderId": parseInt(sessionStorage.getItem('currentUserId'))
    }

    fetch(`http://localhost:8080/channels/${channelId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(response => response.json())
}

/**
 * Takes in list of messages and puts each in its own div and adds each div to existing
 * message-container div element
 * @param messages list of messages to convert to divs
 */
function createMessageDivs(messages) {
    const messagesContainer = document.querySelector("#messages-container")
    messagesContainer.innerHTML = ''; // clear previous data
    messages.forEach(message => {
        const messageDiv = document.createElement('div')
        messageDiv.classList.add('message-div')

        if (message.senderId === parseInt(sessionStorage.getItem('currentUserId'))) {
            messageDiv.classList.add('current-user-message-div')
        } else {
            messageDiv.classList.add('other-user-message-div')

            const nameSpan = document.createElement('span')
            nameSpan.textContent = `${message.sender}`
            nameSpan.classList.add('sender')
            messageDiv.appendChild(nameSpan)
        }

        const textSpan = document.createElement('span')
        textSpan.textContent = `${message.text}`
        textSpan.classList.add('text')

        messageDiv.appendChild(textSpan)

        messagesContainer.appendChild(messageDiv)
    })
}

/**
 * Fetches the messages and updates the page
 */
function updatePage() {
    fetch(`http://localhost:8080/channels/${channelId}/get-messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            createMessageDivs(data)
        })
}

// poll every 500 ms
setInterval(updatePage, 500);