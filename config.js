// Game Configuration
window.GameConfig = {
    // Tailwind CSS Configuration
    tailwindConfig: {
        theme: {
            extend: {
                colors: {
                    dragon: {
                        50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8',
                        400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46',
                        800: '#27272a', 900: '#18181b',
                    },
                    blood: {
                        50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
                        400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
                        800: '#991b1b', 900: '#7f1d1d',
                    },
                    gold: {
                        50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
                        400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
                        800: '#92400e', 900: '#78350f',
                    }
                },
                fontFamily: { 'medieval': ['serif'] },
                screens: { 'xs': '475px' }
            }
        }
    },
    
    // Game Data
    gameData: {
        player: {
            name: 'КровавыйКлинок',
            level: 15,
            class: 'Воин',
            health: 85,
            maxHealth: 100,
            mana: 45,
            maxMana: 60,
            exp: 2340,
            maxExp: 3000,
            gold: 1250,
            guild: 'Стальные Волки'
        },
        location: 'tavern',
        locations: {
            'tavern': {
                name: '🍺 Таверна "Пьяный Дракон"',
                type: 'Общественное место',
                danger: '🟢 Безопасно',
                description: 'Уютная таверна в центре города, где собираются путешественники и местные жители.'
            },
            'square': {
                name: '🏛 Городская площадь',
                type: 'Улица',
                danger: '🟡 Умеренно',
                description: 'Центральная площадь города с фонтаном и торговыми лотками.'
            },
            'rooms': {
                name: '🛏 Комнаты для постояльцев',
                type: 'Отдых',
                danger: '🟢 Безопасно',
                description: 'Уютные комнаты для отдыха путешественников.'
            },
            'cellar': {
                name: '🕳 Подвал таверны',
                type: 'Подземелье',
                danger: '🔴 Опасно',
                description: 'Темный подвал с таинственными звуками.'
            }
        }
    },
    
    // Common Functions
    utils: {
        // Format number with commas
        formatNumber: (num) => num.toLocaleString(),
        
        // Get location info
        getLocationInfo: (locationId) => {
            return window.GameConfig.gameData.locations[locationId] || window.GameConfig.gameData.locations['tavern'];
        },
        
        // Add message to location journal
        addLocationJournal: (message, icon = '📋') => {
            const journal = document.getElementById('locationJournal');
            if (!journal) return;
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'text-dragon-300';
            messageDiv.innerHTML = `${icon} ${message}`;
            journal.appendChild(messageDiv);
            
            // Keep only last 5 messages
            while (journal.children.length > 5) {
                journal.removeChild(journal.firstChild);
            }
            
            // Scroll to bottom
            journal.scrollTop = journal.scrollHeight;
        },
        
        // Update location display
        updateLocationDisplay: (locationId) => {
            const info = window.GameConfig.utils.getLocationInfo(locationId);
            const locationElement = document.getElementById('currentLocation');
            if (locationElement) {
                locationElement.textContent = info.name;
            }
        }
    }
};

// Initialize Tailwind with config
if (typeof tailwind !== 'undefined') {
    tailwind.config = window.GameConfig.tailwindConfig;
}
