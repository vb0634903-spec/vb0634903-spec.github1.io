// ========================================
// ДАННЫЕ
// ========================================

// 10 комплиментов
const compliments = [
    'Ты самый хороший котёнок! 🌸',
    'Ты самая прекрасная девушка на свете! 🌸',
    'Твоя улыбка освещает этот мир! ✨',
    'Я тебя очень люблю! ✨',
    'Ты невероятно талантлива и умна! 💫',
    'Твоя доброта согревает сердца! 💝',
    'Ты настоящая звезда! ⭐',
    'Твой стиль и вкус безупречны! 👗',
    'Ты вдохновляешь всех вокруг! 🌟',
    'Ты сильная и смелая! 💪',
    'Твоя энергия заряжает позитивом! ⚡',
    'Ты лучшая версия себя! 🌺'
];

// 10 картинок (используем бесплатные изображения)
const images = [
    {
        url: 'images.jfif'
    },
     {
        url: 'images (1).jfif'
    },
     {
        url: 'images (2).jfif'
    },
     {
        url: 'images (3).jfif'
    },
     {
        url: 'images (4).jfif'
    },
     {
        url: 'images (5).jfif'
    },
     {
        url: 'images (6).jfif'
    },
     {
        url: 'images (7).jfif'
    },
     {
        url: 'images (8).jfif'
    },
     {
        url: 'images (9).jfif'
    },
   
];

// ========================================
// РАБОТА С ПОЖЕЛАНИЯМИ (СОХРАНЕНИЕ)
// ========================================

// Ключ для localStorage
const STORAGE_KEY = 'nastya_wishes';

// Получить все пожелания
function getWishes() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Ошибка загрузки пожеланий:', error);
        return [];
    }
}

// Сохранить пожелания
function saveWishes(wishes) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (error) {
        console.error('Ошибка сохранения пожеланий:', error);
    }
}

// Добавить пожелание
function addWish(text) {
    const wishes = getWishes();
    const wish = {
        id: Date.now(),
        text: text.trim(),
        date: new Date().toLocaleString('ru-RU'),
        timestamp: Date.now()
    };
    wishes.unshift(wish);
    saveWishes(wishes);
    return wishes;
}

// Удалить пожелание
function deleteWish(id) {
    let wishes = getWishes();
    wishes = wishes.filter(wish => wish.id !== id);
    saveWishes(wishes);
    return wishes;
}

// ========================================
// МЕНЮ
// ========================================

function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

// Закрываем меню при клике вне его
document.addEventListener('click', function(e) {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// ========================================
// КОМПЛИМЕНТЫ
// ========================================

function showCompliment() {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const compliment = compliments[randomIndex];
    
    document.getElementById('complimentText').textContent = compliment;
    document.getElementById('complimentModal').classList.add('active');
    
    // Закрываем меню
    document.querySelector('.nav-menu').classList.remove('active');
}

function closeComplimentModal() {
    document.getElementById('complimentModal').classList.remove('active');
}

// ========================================
// КАРТИНКИ
// ========================================

function showRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageData = images[randomIndex];
    
    document.getElementById('modalImage').src = imageData.url;
    document.getElementById('modalText').textContent = imageData.text;
    document.getElementById('imageModal').classList.add('active');
    
    // Закрываем меню
    document.querySelector('.nav-menu').classList.remove('active');
}

function openImageModal() {
    // Выбираем случайную картинку
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageData = images[randomIndex];
    
    document.getElementById('modalImage').src = imageData.url;
    document.getElementById('modalText').textContent = imageData.text;
    document.getElementById('imageModal').classList.add('active');
}

function closeImageModal() {
    document.getElementById('imageModal').classList.remove('active');
}

// ========================================
// ПОЖЕЛАНИЯ
// ========================================

function showWishInput() {
    document.getElementById('wishModal').classList.add('active');
    document.querySelector('.nav-menu').classList.remove('active');
    
    // Обновляем список пожеланий
    renderWishes();
}

function closeWishModal() {
    document.getElementById('wishModal').classList.remove('active');
}

function saveWish() {
    const input = document.getElementById('wishInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('💝 Пожалуйста, напишите пожелание!');
        return;
    }
    
    // Добавляем пожелание
    addWish(text);
    
    // Очищаем поле ввода
    input.value = '';
    
    // Обновляем список
    renderWishes();
    
    // Показываем уведомление
    showNotification('💝 Спасибо за пожелание! Оно сохранено.');
}

function deleteWishHandler(id) {
    if (confirm('Удалить это пожелание?')) {
        deleteWish(id);
        renderWishes();
        showNotification('🗑️ Пожелание удалено');
    }
}

function renderWishes() {
    const container = document.getElementById('wishesContainer');
    const wishes = getWishes();
    
    if (wishes.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; color: #999; padding: 30px;">
                <p style="font-size: 48px; margin-bottom: 10px;">💫</p>
                <p>Пока нет пожеланий. Будь первой!</p>
                <p style="font-size: 14px; margin-top: 10px;">Напиши что-нибудь тёплое для Насти</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    wishes.forEach(wish => {
        html += `
            <div class="wish-item">
                <p class="wish-item-text">${escapeHtml(wish.text)}</p>
                <span class="wish-item-date">📅 ${wish.date}</span>
                <button class="wish-item-delete" onclick="deleteWishHandler(${wish.id})">×</button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Простая функция для экранирования HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// УВЕДОМЛЕНИЯ
// ========================================

function showNotification(message) {
    // Создаём уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 30px;
        border-radius: 15px;
        font-size: 18px;
        font-weight: 600;
        z-index: 9999;
        animation: fadeInUp 0.5s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 90%;
        text-align: center;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// ========================================
// ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН ПО ESC
// ========================================

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
        closeComplimentModal();
        closeWishModal();
    }
});

// ========================================
// ЗАКРЫТИЕ ПО КЛИКУ НА ФОН
// ========================================

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================

// Выводим приветствие в консоль
console.log('🌟 Привет, Настя! Добро пожаловать на сайт!');
console.log('💝 Все пожелания сохраняются в localStorage');

// Показываем приветственное уведомление
setTimeout(() => {
    const wishes = getWishes();
    if (wishes.length > 0) {
        showNotification(`💝 Уже ${wishes.length} пожеланий для Насти!`);
    } else {
        showNotification('💫 Привет, Настя! Оставь своё пожелание!');
    }
}, 1000);
