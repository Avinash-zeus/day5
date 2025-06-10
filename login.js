document.querySelector('.toggle-password').addEventListener('click', function () {
    const pwd = document.getElementById('password');
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            window.location.href = 'dashboard.html';
        }
    });
});