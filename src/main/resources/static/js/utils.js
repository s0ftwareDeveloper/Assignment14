let user = sessionStorage.getItem('user')

if (!user) {
    window.location.href = '/welcome';
}