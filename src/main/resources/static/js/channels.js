// Redirect to welcome page when user session has not been created
if (sessionStorage.getItem('user') == null) {
    window.location.href = '/welcome';
} else {
    let userId = document.querySelector('#userId').value
    sessionStorage.setItem('currentUserId', userId)
    console.log("channels current user id: " + sessionStorage.getItem("currentUserId"))
}