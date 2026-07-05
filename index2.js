// ========================================
// ДАННЫЕ
// ========================================

// 10 комплиментов
const compliments = [
    'Ты самая прекрасная девушка на свете! 🌸',
    'Твоя улыбка освещает этот мир! ✨',
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

// Массив для хранения пожеланий
let wishes = [];

// Загружаем сохранённые пожелания из localStorage
function loadWishes() {
    const saved = localStorage.getItem('wishes');
    if (saved) {
        wishes = JSON.parse(saved);
    }
}

// Сохраняем пожелания в localStorage
function saveWishesToStorage() {
    localStorage.setItem('wishes', JSON.stringify(wishes));
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
        alert('Пожалуйста, напиши пожелание!');
        return;
    }
    
    // Добавляем пожелание
    const wish = {
        text: text,
        date: new Date().toLocaleString('ru-RU')
    };
    
    wishes.unshift(wish); // Добавляем в начало массива
    saveWishesToStorage();
    
    // Очищаем поле ввода
    input.value = '';
    
    // Обновляем список
    renderWishes();
    
    // Показываем уведомление
    alert('💝 Спасибо, я все почитаю');
}

function renderWishes() {
    const container = document.getElementById('wishesContainer');
    
    if (wishes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Пока нет пожеланий. Будь первой! 💫</p>';
        return;
    }
    
    let html = '';
    wishes.forEach(wish => {
        html += `
            <div class="wish-item">
                <p class="wish-item-text">${escapeHtml(wish.text)}</p>
                <span class="wish-item-date">📅 ${wish.date}</span>
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

// Загружаем пожелания
loadWishes();

// Выводим приветствие в консоль
console.log('🌟 Привет, Настя! Добро пожаловать на сайт!');

// Показываем приветственное сообщение через 1 секунду
setTimeout(() => {
    console.log('💫 Наслаждайся сайтом!');
}, 1000);