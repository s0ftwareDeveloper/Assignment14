let user = sessionStorage.getItem('user')
let nameInput = document.querySelector('#name-input')
let submitBtn = document.querySelector('#submit-btn')
nameInput.value = '' //reset value to empty if not already
// if user session exists, redirect to /channels
if (user) {
    window.location.href = '/channels';
}

// Function to generate random colors
function getRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function contrastColor(hex, factor = 0.5) {
    // Convert HEX to RGB
    const [r, g, b] = hexToRgbArray(hex);

    // Calculate the perceived brightness
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

    // Determine if the color should be lightened or darkened
    const lighten = brightness < 0.5;

    // Adjust the color channels
    const adjust = (value) =>
        lighten
            ? Math.min(255, Math.floor(value + (255 - value) * factor)) // Lighten
            : Math.max(0, Math.floor(value * (1 - factor))); // Darken

    const newR = adjust(r);
    const newG = adjust(g);
    const newB = adjust(b);

    // Convert the adjusted RGB values back to HEX
    return rgbToHex(newR, newG, newB);
}

// Helper Function: Convert HEX to RGB Array
function hexToRgbArray(hex) {
    hex = hex.replace(/^#/, ""); // Remove the '#' if present
    let r, g, b;

    if (hex.length === 3) {
        // Short HEX format (#f00 -> #ff0000)
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        // Full HEX format (#ff0000)
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    } else {
        throw new Error("Invalid HEX color format");
    }

    return [r, g, b];
}

// Helper Function: Convert RGB to HEX
function rgbToHex(r, g, b) {
    const toHex = (value) => value.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// adds user when submit button is clicked
submitBtn.addEventListener('click', async () => {
    nameInput.value = nameInput.value.trim()
    if (!(nameInput.value === '')) {
        sessionStorage.setItem('user', nameInput.value)
        const iconColor = getRandomColor()
        sessionStorage.setItem('iconColor', iconColor)
        sessionStorage.setItem('iconBackgroundColor', contrastColor(iconColor))

        const userObject = {
            "name": nameInput.value,
            "iconColor": sessionStorage.getItem('iconColor'),
            "iconBackgroundColor": sessionStorage.getItem('iconBackgroundColor')
        }

        fetch(`http://localhost:8080/saveUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })
            .then(response => response.json())
            .then(user => {
                if(user.iconColor !== sessionStorage.getItem('iconColor')) {
                    sessionStorage.setItem('iconColor', user.iconColor)
                    sessionStorage.setItem('iconBackgroundColor', user.iconBackgroundColor)
                }
            })
    }
})


