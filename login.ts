document.querySelector('.toggle-password')?.addEventListener('click', function () {
    const pwd = document.getElementById('password') as HTMLInputElement | null;
    if (pwd) {
        pwd.type = pwd.type === 'password' ? 'text' : 'password';
    }
});

document.addEventListener('DOMContentLoaded', () => {
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