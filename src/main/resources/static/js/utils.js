let userName = sessionStorage.getItem('user')

if (!userName) {
    window.location.href = '/welcome';
}

window.addEventListener('resize', function () {
    if (window.innerWidth < 500) {
        window.resizeTo(500, window.innerHeight);
    }
    if (window.innerHeight < 500) {
        window.resizeTo(window.innerWidth, 500);
    }
});