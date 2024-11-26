let textarea = document.querySelector("#textarea")
let channelId = document.querySelector('#channelId').value
const dropdown = document.querySelector('.dropdown-menu');
const dropdownIcon = document.querySelector('#dropdown-icon');

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

document.querySelector('.dropdown-button').addEventListener('click', function () {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';

    // Toggle the rotation of the icon
    dropdownIcon.classList.toggle('rotate');
});

/**
 * Saves message to channel
 * @param messageText message to be saved
 */
function sendMessage(messageText) {

    const userObject = {
        "name": userName,
        "iconColor": sessionStorage.getItem('iconColor'),
        "iconBackgroundColor": sessionStorage.getItem('iconBackgroundColor')
    }

    const message = {
        "text": messageText,
        "user": userObject
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

function createIcon(iconColor, backgroundColor) {
    // Create the Font Awesome user icon
    const iconElement = document.createElement("i");
    iconElement.className = "fa-solid fa-user";
    iconElement.style.color = iconColor;
    iconElement.style.fontSize = "24px";

    const iconContainer = document.createElement('div')
    iconContainer.style.background = backgroundColor;
    iconContainer.classList.add('icon-container')
    iconContainer.appendChild(iconElement)

    return iconContainer
}

function populateUserNameAndIcon() {
    const userNameAndIconDiv = document.querySelector("#user-name-and-icon")
    let icon = createIcon(sessionStorage.getItem('iconColor'), sessionStorage.getItem('iconBackgroundColor'))
    userNameAndIconDiv.appendChild(icon)

    const nameSpan = document.createElement('span')
    nameSpan.textContent = userName
    nameSpan.classList.add('user-name-text')
    userNameAndIconDiv.appendChild(nameSpan)
}

populateUserNameAndIcon()


/**
 * Takes in list of messages and puts each in its own div and adds each div to existing
 * message-container div element
 * @param messages list of messages to convert to divs
 */
function createMessageDivs(messages) {
    const messagesContainer = document.querySelector("#messages-container")
    messagesContainer.innerHTML = ''; // clear previous data
    messages.forEach(message => {

        const userMessageDiv = document.createElement('div')
        userMessageDiv.style.display = "flex";

        let messageSender = message.user;

        const messageDiv = document.createElement('div')
        messageDiv.classList.add('message-div')

        let isUser = (messageSender.name === userName)

        if (isUser) {
            messageDiv.classList.add('current-user-message-div')
        } else {
            messageDiv.classList.add('other-user-message-div')

            const nameSpan = document.createElement('span')
            nameSpan.textContent = `${messageSender.name}`
            nameSpan.classList.add('sender')
            messageDiv.appendChild(nameSpan)
        }

        const textSpan = document.createElement('span')
        textSpan.textContent = `${message.text}`
        textSpan.classList.add('text')

        messageDiv.appendChild(textSpan)

        if(isUser) {
            userMessageDiv.appendChild(messageDiv)
            userMessageDiv.appendChild(createIcon(messageSender.iconColor, messageSender.iconBackgroundColor))
            userMessageDiv.style.alignSelf = "end"
        } else {
            userMessageDiv.appendChild(createIcon(messageSender.iconColor, messageSender.iconBackgroundColor))
            userMessageDiv.appendChild(messageDiv)
        }

        messagesContainer.appendChild(userMessageDiv)


    })
}

/**
 * Fetches the messages and updates the page
 */
function getMessages() {
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

function populateUsers(users) {
    const messagesContainer = document.querySelector("#channel-users")
    messagesContainer.innerHTML = ''; // clear previous data
    users.forEach(user => {
        const iconUserDiv = document.createElement('div')
        iconUserDiv.classList.add('icon-user-div')
        iconUserDiv.appendChild(createIcon(user.iconColor, user.iconBackgroundColor))

        const nameSpan = document.createElement('span')
        nameSpan.textContent = `${user.name}`
        nameSpan.classList.add('channel-user-name')
        iconUserDiv.appendChild(nameSpan)

        messagesContainer.appendChild(iconUserDiv)
    })
}

/**
 * Fetches the messages and updates the page
 */
function getUsers() {
    fetch(`http://localhost:8080/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            populateUsers(data)
        })
}

getUsers()

// poll every 500 ms
const int = setInterval(getMessages, 500);
const interval = setInterval(getUsers, 500);

// Stop polling after 10 seconds
/*setTimeout(() => {
    clearInterval(interval); // Stop the interval
    clearInterval(int)
    console.log("Polling stopped.");
}, 10000); // 10,000 ms = 10 seconds*/

/*window.addEventListener('resize', function () {
    if (window.innerWidth < 500) {
        window.resizeTo(500, window.innerHeight);
    }
    if (window.innerHeight < 310) {
        window.resizeTo(window.innerWidth, 310);
    }
});*/

document.addEventListener('DOMContentLoaded', () => {
    // Get the current page URL
    const currentURL = window.location.pathname;

    // Select all <li> elements containing <a> links
    const navItems = document.querySelectorAll('.dropdown-menu li');

    navItems.forEach(item => {
        const link = item.querySelector('a'); // Get the <a> inside the <li>
        if (link && link.getAttribute('href') === currentURL) {
            item.classList.add('active'); // Add "active" class to the <li>
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('modeToggle');
    const body = document.body;

    // Check for saved mode in localStorage
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
        body.classList.add(savedMode);
        toggleSwitch.checked = savedMode === 'dark-mode';
    }

    // Add event listener to toggle switch
    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.className = 'light-mode';
            localStorage.setItem('theme', 'light-mode');
        }
    });
});
