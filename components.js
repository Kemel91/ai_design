// Common HTML components for Dragon Amulet MMORPG

// Header component
function createHeader(title, subtitle, showBackButton = false) {
    return `
        <header class="relative py-6 px-4">
            <div class="max-w-4xl mx-auto text-center">
                <div class="mb-4">
                    ${showBackButton ? `
                    <div class="flex items-center justify-between mb-4">
                        <button onclick="history.back()" class="btn-secondary px-3 py-2 rounded-xl font-medieval text-xs font-semibold text-dragon-200 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Назад
                        </button>
                        <a href="index.html" class="inline-block">
                            <div class="logo-dragon font-medieval text-3xl font-bold">⚔</div>
                        </a>
                        <div class="w-16"></div>
                    </div>
                    ` : `
                    <a href="index.html" class="inline-block">
                        <div class="logo-dragon font-medieval text-4xl font-bold mb-2">⚔</div>
                    </a>
                    `}
                    <h1 class="font-medieval text-2xl sm:text-3xl font-bold text-glow mb-2">${title}</h1>
                    <div class="h-px bg-gradient-to-r from-transparent via-gold-600 to-transparent mb-2"></div>
                    <p class="font-story text-dragon-300 text-sm">${subtitle}</p>
                </div>
            </div>
        </header>
    `;
}

// Footer component
function createFooter() {
    return `
        <footer class="py-6 px-4 mt-8">
            <div class="max-w-4xl mx-auto text-center">
                <div class="dragon-card rounded-xl p-4">
                    <p class="font-story text-xs text-dragon-300 mb-2">
                        © 2024 Амулет дракона. Все права защищены.
                    </p>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
                        <a href="index.html" class="text-gold-500 hover:text-gold-400 transition-colors">Главная</a>
                        <a href="news.html" class="text-gold-500 hover:text-gold-400 transition-colors">Новости</a>
                        <a href="codex.html" class="text-gold-500 hover:text-gold-400 transition-colors">Кодекс</a>
                        <a href="register.html" class="text-gold-500 hover:text-gold-400 transition-colors">Регистрация</a>
                        <a href="login.html" class="text-gold-500 hover:text-gold-400 transition-colors">Вход</a>
                        <a href="#" class="text-gold-500 hover:text-gold-400 transition-colors">Поддержка</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

// Navigation breadcrumbs
function createBreadcrumbs(items) {
    const breadcrumbItems = items.map((item, index) => {
        const isLast = index === items.length - 1;
        return `
            ${isLast ? 
                `<span class="text-gold-400 font-semibold">${item.name}</span>` :
                `<a href="${item.url}" class="text-dragon-300 hover:text-gold-400 transition-colors">${item.name}</a>`
            }
            ${!isLast ? `<span class="text-dragon-500 mx-2">→</span>` : ''}
        `;
    }).join('');

    return `
        <nav class="px-4 py-2">
            <div class="max-w-4xl mx-auto">
                <div class="flex items-center text-sm font-story">
                    ${breadcrumbItems}
                </div>
            </div>
        </nav>
    `;
}

// Message component
function createMessage(text, type = 'success', autoHide = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `p-3 rounded-xl font-story text-sm ${type === 'success' ? 'success-message' : 'error-message'} transform translate-y-2 opacity-0 transition-all duration-300`;
    messageDiv.textContent = text;
    
    // Animate in
    setTimeout(() => {
        messageDiv.classList.remove('translate-y-2', 'opacity-0');
    }, 10);
    
    if (autoHide) {
        setTimeout(() => {
            messageDiv.classList.add('translate-y-2', 'opacity-0');
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    return messageDiv;
}

// Loading spinner component
function createLoadingSpinner() {
    return `
        <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-400"></div>
            <span class="ml-3 font-story text-dragon-300">Загрузка...</span>
        </div>
    `;
}

// Stats card component
function createStatsCard(title, stats) {
    const statsHtml = stats.map(stat => `
        <div class="text-center">
            <div class="text-xl font-bold ${stat.color || 'text-gold-400'}">${stat.value}</div>
            <div class="text-xs text-dragon-300 font-story">${stat.label}</div>
        </div>
    `).join('');

    return `
        <div class="dragon-card rounded-xl p-4">
            <div class="text-center">
                <h3 class="font-medieval text-lg font-semibold text-gold-400 mb-3">${title}</h3>
                <div class="grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-4">
                    ${statsHtml}
                </div>
            </div>
        </div>
    `;
}

// Modal component
function createModal(id, title, content, buttons = []) {
    const buttonsHtml = buttons.map(btn => `
        <button 
            class="${btn.class || 'btn-secondary'} px-4 py-3 rounded-xl font-medieval font-semibold text-sm"
            onclick="${btn.onclick || ''}"
        >
            ${btn.text}
        </button>
    `).join('');

    return `
        <div id="${id}" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50 p-4">
            <div class="dragon-card rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
                <h3 class="font-medieval text-xl font-semibold text-gold-400 mb-4 text-center">${title}</h3>
                <div class="mb-6">
                    ${content}
                </div>
                <div class="flex gap-3">
                    ${buttonsHtml}
                </div>
            </div>
        </div>
    `;
}

// Form input component
function createFormInput(options) {
    const {
        id,
        type = 'text',
        label,
        placeholder,
        required = false,
        icon = '',
        description = '',
        className = 'form-input'
    } = options;

    return `
        <div>
            <label class="block font-medieval text-gold-400 text-sm font-semibold mb-2">
                ${icon} ${label}
            </label>
            <input 
                type="${type}" 
                id="${id}"
                class="${className} w-full px-4 py-3 rounded-xl font-story text-sm"
                placeholder="${placeholder}"
                ${required ? 'required' : ''}
            >
            ${description ? `<p class="text-xs text-dragon-300 mt-1 font-story">${description}</p>` : ''}
        </div>
    `;
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Auto-inject header and footer if placeholders exist
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
        const title = headerPlaceholder.dataset.title || 'АМУЛЕТ ДРАКОНА';
        const subtitle = headerPlaceholder.dataset.subtitle || 'Текстовая MMORPG';
        const showBack = headerPlaceholder.dataset.showBack === 'true';
        headerPlaceholder.outerHTML = createHeader(title, subtitle, showBack);
    }
    
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = createFooter();
    }
});

// Export functions for use in other scripts
window.DragonComponents = {
    createHeader,
    createFooter,
    createBreadcrumbs,
    createMessage,
    createLoadingSpinner,
    createStatsCard,
    createModal,
    createFormInput
};
