var _a;
(_a = document.querySelector('.toggle-password')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var pwd = document.getElementById('password');
    if (pwd) {
        pwd.type = pwd.type === 'password' ? 'text' : 'password';
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (form.checkValidity()) {
                window.location.href = 'dashboard.html';
            }
        });
    }
});
