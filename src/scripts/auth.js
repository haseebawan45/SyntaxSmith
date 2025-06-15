// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const passwordInputs = document.querySelectorAll('input[type="password"]');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const socialButtons = document.querySelectorAll('.social-btn');

// Password Visibility Toggle
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const type = input.getAttribute('type');
        input.setAttribute('type', type === 'password' ? 'text' : 'password');
        btn.parentElement.setAttribute('data-show-password', type === 'password');
    });
});

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Contains number
    if (/\d/.test(password)) strength++;
    
    // Contains both lowercase and uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

// Update Password Strength UI
function updatePasswordStrength(input) {
    const strengthBar = input.parentElement.parentElement.querySelector('.strength-level');
    const strengthText = input.parentElement.parentElement.querySelector('.strength-value');
    
    if (!strengthBar || !strengthText) return;
    
    const strength = checkPasswordStrength(input.value);
    strengthBar.setAttribute('data-strength', strength);
    
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
    strengthText.textContent = strengthLabels[strength];
}

// Password Input Event Listeners
passwordInputs.forEach(input => {
    if (input.form.id === 'signup-form') {
        input.addEventListener('input', () => updatePasswordStrength(input));
    }
});

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            showError(input, 'Please enter a valid email address');
        } else if (input.type === 'password' && input.form.id === 'signup-form') {
            if (!isValidPassword(input.value)) {
                isValid = false;
                showError(input, 'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers');
            }
        }
    });
    
    return isValid;
}

// Email Validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password Validation
function isValidPassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /\d/.test(password);
}

// Error Display
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.classList.add('error');
}

// Clear Error
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}

// Input Event Listeners
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('input', () => clearError(input));
});

// Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(loginForm)) return;
        
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);
        
        try {
            // In a real app, this would be an API call
            console.log('Login data:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login error:', error);
            // Show error message to user
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(signupForm)) return;
        
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData);
        
        try {
            // In a real app, this would be an API call
            console.log('Signup data:', data);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Signup error:', error);
            // Show error message to user
        }
    });
}

// Social Authentication
socialButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const provider = button.classList.contains('google') ? 'Google' : 'GitHub';
        
        try {
            // In a real app, this would redirect to OAuth provider
            console.log(`Authenticating with ${provider}...`);
            // Simulate OAuth flow
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '/dashboard';
        } catch (error) {
            console.error(`${provider} auth error:`, error);
            // Show error message to user
        }
    });
}); 