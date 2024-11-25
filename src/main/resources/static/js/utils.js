let userName = sessionStorage.getItem('user')

if (!userName) {
    window.location.href = '/welcome';
}