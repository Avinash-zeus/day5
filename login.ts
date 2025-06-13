document.addEventListener('DOMContentLoaded', () => {
    // Show password toggle
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const togglePasswordIcon = document.getElementById('togglePasswordIcon') as HTMLImageElement | null;

    if (passwordInput && togglePasswordIcon) {
        togglePasswordIcon.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordIcon.src = isPassword
                ? 'assets/icons/hide.svg'
                : 'assets/icons/preview.svg';
            togglePasswordIcon.alt = isPassword ? 'Hide Password' : 'Show Password';
        });
    }

    // Login form submission
    const form = document.querySelector('.login-form') as HTMLFormElement | null;
    if (form) {
        form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            if (form.checkValidity()) {
                window.location.href = 'dashboard.html';
            }
        });
    }
});