// Redirect to welcome page when user session has not been created
if (user) {
    let userId = document.querySelector('#userId').value
    if (userId > 0) {
        sessionStorage.setItem('currentUserId', userId)
    }
}