document.addEventListener('DOMContentLoaded', function () {
    // Show password toggle
    var passwordInput = document.getElementById('password');
    var togglePasswordIcon = document.getElementById('togglePasswordIcon');
    if (passwordInput && togglePasswordIcon) {
        togglePasswordIcon.addEventListener('click', function () {
            var isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordIcon.src = isPassword
                ? 'assets/icons/hide.svg'
                : 'assets/icons/preview.svg';
            togglePasswordIcon.alt = isPassword ? 'Hide Password' : 'Show Password';
        });
    }
    // Login form submission
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
