// Common JavaScript functions for Dragon Amulet MMORPG

// Show message function
function showMessage(text, type = 'success') {
    const messageArea = document.getElementById('messageArea');
    if (!messageArea) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `p-3 rounded-xl font-story text-sm ${type === 'success' ? 'success-message' : 'error-message'}`;
    messageDiv.textContent = text;
    
    messageArea.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.startsWith('8')) value = '7' + value.slice(1);
    if (value.startsWith('7')) {
        value = value.slice(1);
    }
    
    let formatted = '+7';
    if (value.length > 0) {
        formatted += ' (' + value.substring(0, 3);
    }
    if (value.length >= 4) {
        formatted += ') ' + value.substring(3, 6);
    }
    if (value.length >= 7) {
        formatted += '-' + value.substring(6, 8);
    }
    if (value.length >= 9) {
        formatted += '-' + value.substring(8, 10);
    }
    
    input.value = formatted;
    return value.length === 10;
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength += 25;
    else feedback.push('минимум 8 символов');
    
    if (/[a-z]/.test(password)) strength += 25;
    else feedback.push('строчные буквы');
    
    if (/[A-Z]/.test(password)) strength += 25;
    else feedback.push('заглавные буквы');
    
    if (/[0-9]/.test(password)) strength += 25;
    else feedback.push('цифры');
    
    return { strength, feedback };
}

// Update password strength indicator
function updatePasswordStrength(password, strengthBar, strengthText) {
    const { strength } = checkPasswordStrength(password);
    
    strengthBar.style.width = strength + '%';
    
    if (strength < 25) {
        strengthBar.className = 'h-full transition-all duration-300 rounded-full bg-red-600';
        strengthText.textContent = 'Слабый пароль';
        strengthText.className = 'text-xs text-red-400 font-story';
    } else if (strength < 50) {
        strengthBar.className = 'h-full transition-all duration-300 rounded-full bg-yellow-600';
        strengthText.textContent = 'Средний пароль';
        strengthText.className = 'text-xs text-yellow-400 font-story';
    } else if (strength < 100) {
        strengthBar.className = 'h-full transition-all duration-300 rounded-full bg-blue-600';
        strengthText.textContent = 'Хороший пароль';
        strengthText.className = 'text-xs text-blue-400 font-story';
    } else {
        strengthBar.className = 'h-full transition-all duration-300 rounded-full bg-green-600';
        strengthText.textContent = 'Отличный пароль';
        strengthText.className = 'text-xs text-green-400 font-story';
    }
}

// Toggle password visibility
function togglePasswordVisibility(passwordInput, toggleButton) {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleButton.textContent = type === 'password' ? '👁' : '🙈';
}

// Check password match
function checkPasswordMatch(password, confirmPassword, matchDiv, matchText) {
    if (confirmPassword.length > 0) {
        matchDiv.classList.remove('hidden');
        if (password === confirmPassword) {
            matchText.textContent = '✓ Пароли совпадают';
            matchText.className = 'text-green-400';
            return true;
        } else {
            matchText.textContent = '✗ Пароли не совпадают';
            matchText.className = 'text-red-400';
            return false;
        }
    } else {
        matchDiv.classList.add('hidden');
        return false;
    }
}

// Ripple effect for buttons
function addRippleEffect() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Validate email or phone
function isValidEmailOrPhone(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return emailRegex.test(input) || phoneRegex.test(input);
}

// Validate nickname
function isValidNickname(nickname) {
    return nickname.length >= 3 && nickname.length <= 20 && /^[a-zA-Zа-яА-Я0-9]+$/.test(nickname);
}

// Initialize common functionality
function initializeCommon() {
    // Add ripple effect to all buttons
    addRippleEffect();
    
    // Initialize tooltips or other common UI elements
    console.log('Dragon Amulet MMORPG initialized');
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCommon);
