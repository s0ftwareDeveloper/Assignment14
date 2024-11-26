let textarea = document.querySelector("#textarea")

textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); //no new line
        textarea.value = ''
    }
})