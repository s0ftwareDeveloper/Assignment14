// Redirect to welcome page when user session has not been created
if (sessionStorage.getItem('user') == null) {
    window.location.href = '/welcome';
} else {
    let userId = document.querySelector('#userId').value
    if (userId > 0) {
        sessionStorage.setItem('currentUserId', userId)
    }
}