// Mobile Navigation System
window.MobileNav = {
    // Tab switching
    switchTab: function(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all nav buttons
        document.querySelectorAll('.nav-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        const tabElement = document.getElementById(tabName + 'Tab');
        if (tabElement) {
            tabElement.classList.add('active');
        }
        
        // Add active class to clicked button
        if (event && event.target) {
            const navButton = event.target.closest('.nav-tab');
            if (navButton) {
                navButton.classList.add('active');
            }
        }
    },
    
    // Action sheet system
    showActionSheet: function(type, id) {
        const overlay = document.getElementById('actionSheetOverlay');
        const sheet = document.getElementById('actionSheet');
        const title = document.getElementById('actionSheetTitle');
        const content = document.getElementById('actionSheetContent');
        
        if (!overlay || !sheet || !title || !content) return;
        
        // Generate content based on type
        let sheetHTML = '';
        let sheetTitle = '';
        
        switch(type) {
            case 'npc':
                sheetTitle = '🧔 Действия с NPC';
                sheetHTML = `
                    <button onclick="MobileNav.talkToNPC('${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">💬 Поговорить</button>
                    <button onclick="MobileNav.showInfo('${type}', '${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">👁 Осмотреть</button>
                    <button onclick="MobileNav.tradeWithNPC('${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">🛒 Торговать</button>
                `;
                break;
                
            case 'player':
                sheetTitle = '👤 Действия с игроком';
                sheetHTML = `
                    <button onclick="MobileNav.talkToPlayer('${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">💬 Сказать</button>
                    <button onclick="MobileNav.showInfo('${type}', '${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">👁 Осмотреть</button>
                    <button onclick="MobileNav.attackPlayer('${id}')" class="w-full btn-dragon px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">⚔ Атаковать</button>
                    <button onclick="MobileNav.inviteToGroup('${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">👥 В группу</button>
                `;
                break;
                
            case 'enemy':
                sheetTitle = '🐀 Действия с врагом';
                sheetHTML = `
                    <button onclick="MobileNav.attackEnemy('${id}')" class="w-full btn-dragon px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">⚔ Атаковать</button>
                    <button onclick="MobileNav.showInfo('${type}', '${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">👁 Осмотреть</button>
                    <button onclick="MobileNav.castSpellOn('${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">🔮 Заклинание</button>
                `;
                break;
                
            case 'item':
                sheetTitle = '📦 Действия с предметом';
                sheetHTML = `
                    <button onclick="MobileNav.takeItem('${id}')" class="w-full btn-dragon px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">📦 Взять</button>
                    <button onclick="MobileNav.showInfo('${type}', '${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">👁 Осмотреть</button>
                    <button onclick="MobileNav.useItem('${id}')" class="w-full btn-secondary px-4 py-3 rounded-lg font-medieval text-sm mb-2 min-h-[50px]">✨ Использовать</button>
                `;
                break;
        }
        
        title.textContent = sheetTitle;
        content.innerHTML = sheetHTML;
        
        // Show action sheet
        overlay.classList.add('show');
        sheet.classList.add('show');
    },
    
    hideActionSheet: function() {
        const overlay = document.getElementById('actionSheetOverlay');
        const sheet = document.getElementById('actionSheet');
        if (overlay) overlay.classList.remove('show');
        if (sheet) sheet.classList.remove('show');
    },
    
    // Action handlers
    talkToNPC: function(id) {
        this.hideActionSheet();
        const responses = {
            'barman': 'Добро пожаловать в мою таверну! У нас лучший эль в городе и горячая еда. Что желаете?'
        };
        window.GameConfig.utils.addLocationJournal('Вы говорите с барменом', '💬');
    },
    
    talkToPlayer: function(id) {
        this.hideActionSheet();
        window.GameConfig.utils.addLocationJournal(`Вы обращаетесь к игроку ${id}`, '💬');
    },
    
    attackPlayer: function(id) {
        this.hideActionSheet();
        window.GameConfig.utils.addLocationJournal(`Начался PvP бой с игроком ${id}`, '⚔');
    },
    
    attackEnemy: function(id) {
        this.hideActionSheet();
        const enemies = {
            'rat1': 'Наглую крысу',
            'rat2': 'Жирную крысу'
        };
        window.GameConfig.utils.addLocationJournal(`Вы атакуете ${enemies[id]}`, '⚔');
    },
    
    takeItem: function(id) {
        this.hideActionSheet();
        const items = {
            'coin': 'Золотую монету (+5 золота)',
            'dagger': 'Старый кинжал'
        };
        window.GameConfig.utils.addLocationJournal(`Вы подбираете ${items[id]}`, '📦');
    },
    
    showInfo: function(type, id) {
        this.hideActionSheet();
        window.GameConfig.utils.addLocationJournal(`Вы осматриваете ${type} ${id}`, '👁');
    },
    
    // Placeholder functions
    tradeWithNPC: function(id) {
        this.hideActionSheet();
        window.GameConfig.utils.addLocationJournal('Открывается торговое окно', '🛒');
    },
    
    inviteToGroup: function(id) {
        this.hideActionSheet();
        window.GameConfig.utils.addLocationJournal(`Приглашение в группу отправлено игроку ${id}`, '👥');
    },
    
    castSpellOn: function(id) {
        this.hideActionSheet();
        window.GameConfig.utils.addLocationJournal(`Заклинание применено к ${id}`, '🔮');
    },
    
    useItem: function(id) {
        this.hideActionSheet();
        window.GameConfig.utils.addLocationJournal(`Предмет ${id} использован`, '✨');
    }
};
