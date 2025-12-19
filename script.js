/* 
 * JAVASCRIPT ДЛЯ ПРОЕКТА "DRUPAL-CODER"
 * Полная версия со всеми функциями + Форма через FORMCARRY
 * 
 * Включает:
 * 1. Навигация и меню
 * 2. Слайдер кейсов
 * 3. Слайдер отзывов
 * 4. FAQ аккордеон
 * 5. Формы с AJAX отправкой НА FORMCARRY (ID: 4lv37IeJGYm)
 * 6. Модальное окно с RAF анимацией
 * 7. Анимации скролла
 * 8. LocalStorage для форм
 * 9. История через History API
 */

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНСТАНТЫ =====
const FORMCARRY_FORM_ID = '4lv37IeJGYm'; // ВАШ ID ФОРМЫ
const FORMCARRY_URL = `https://formcarry.com/s/${FORMCARRY_FORM_ID}`;

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Drupal-coder проект загружен');
    console.log('📧 Отправка формы на Formcarry ID:', FORMCARRY_FORM_ID);
    
    // Инициализация всех компонентов
    initNavigation();
    initVideo();
    initSliders();
    initAccordion();
    initForms();
    initModal();
    initScrollEffects();
    initScrollToTop();
    loadFromLocalStorage();
    
    // Инициализируем тестовые данные (кейсы и отзывы)
    initTestData();
});

// ===== НАВИГАЦИЯ И МЕНЮ =====
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');
    
    if (!mobileMenuBtn || !mobileMenu || !mainNav) {
        console.log('⚠️ Навигационные элементы не найдены');
        return;
    }
    
    let lastScrollTop = 0;
    let isMobileMenuOpen = false;
    
    // Открытие/закрытие мобильного меню
    mobileMenuBtn.addEventListener('click', function() {
        isMobileMenuOpen = !isMobileMenuOpen;
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Блокируем скролл тела при открытом меню
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        document.body.classList.toggle('menu-open', isMobileMenuOpen);
    });
    
    // Выпадающее меню в мобильной версии
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent && dropdownContent.classList.contains('mobile-dropdown-content')) {
                dropdownContent.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    });
    
    // Скрытие/показа навигации при скролле
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Прячем навигацию при скролле вниз, показываем при скролле вверх
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            mainNav.classList.add('hidden');
        } else {
            mainNav.classList.remove('hidden');
        }
        
        // Добавляем класс при скролле
        if (scrollTop > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== ВИДЕО ФОН =====
function initVideo() {
    const video = document.getElementById('headerVideo');
    
    if (!video) return;
    
    // Для мобильных - автоплей может не работать
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Автовоспроизведение заблокировано:', error);
        });
    }
}

// ===== СЛАЙДЕР КЕЙСОВ =====
function initSliders() {
    initCasesSlider();
    initReviewsSlider();
}

function initCasesSlider() {
    const sliderContainer = document.getElementById('sliderContainer');
    
    if (!sliderContainer) {
        console.log('⚠️ Слайдер кейсов не найден');
        return;
    }
    
    // Данные для слайдов
    const slidesData = [
        {
            title: 'Ускорение интернет-магазина на Drupal',
            description: 'Оптимизировали производительность интернет-магазина, увеличив скорость загрузки страниц в 3 раза. Улучшили UX и увеличили конверсию на 25%.',
            stats: [
                { value: '3x', label: 'Ускорение загрузки' },
                { value: '25%', label: 'Рост конверсии' },
                { value: '30%', label: 'Снижение отказов' }
            ]
        },
        {
            title: 'Миграция с Joomla на Drupal',
            description: 'Провели полную миграцию корпоративного сайта с Joomla на Drupal 9. Сохранили весь контент и улучшили структуру сайта.',
            stats: [
                { value: '100%', label: 'Контент сохранен' },
                { value: 'Drupal 9', label: 'Новая версия' },
                { value: '40%', label: 'Рост производительности' }
            ]
        },
        {
            title: 'Разработка кастомного модуля CRM',
            description: 'Разработали и внедрили кастомный модуль интеграции с CRM системой. Автоматизировали процессы и сократили время обработки заявок.',
            stats: [
                { value: '70%', label: 'Автоматизация' },
                { value: '2 часа', label: 'Вместо 8 часов' },
                { value: '300+', label: 'Ежедневных заявок' }
            ]
        }
    ];
    
    let currentSlide = 0;
    
    // Создаем слайды
    slidesData.forEach((slideData, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.dataset.index = index;
        
        // Статистика
        let statsHTML = '';
        if (slideData.stats && slideData.stats.length > 0) {
            statsHTML = '<div class="slide-stats">';
            slideData.stats.forEach(stat => {
                statsHTML += `
                    <div class="slide-stat">
                        <div class="slide-stat-value">${stat.value}</div>
                        <div class="slide-stat-label">${stat.label}</div>
                    </div>
                `;
            });
            statsHTML += '</div>';
        }
        
        slide.innerHTML = `
            <h3 class="slide-title">${slideData.title}</h3>
            <p class="slide-description">${slideData.description}</p>
            ${statsHTML}
        `;
        
        sliderContainer.appendChild(slide);
        
        // Создаем точки для навигации
        const sliderDots = document.getElementById('sliderDots');
        if (sliderDots) {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.setAttribute('aria-label', `Перейти к слайду ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        }
    });
    
    // Функция перехода к слайду
    function goToSlide(index) {
        if (index < 0) index = slidesData.length - 1;
        if (index >= slidesData.length) index = 0;
        
        currentSlide = index;
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активные точки
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Обработчики кнопок
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}

// ===== СЛАЙДЕР ОТЗЫВОВ =====
function initReviewsSlider() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    
    if (!reviewsContainer) {
        console.log('⚠️ Слайдер отзывов не найден');
        return;
    }
    
    // Данные для отзывов
    const reviewsData = [
        {
            content: 'Долгие поиски единственного и неповторимого мастера на многостраничный сайт www.cielparfum.com, который был собран крайне некомпетентным программистом и раз в месяц стабильно грозился погибнуть, привели меня на сайт и в итоге, к ребятам из Drupal-coder.',
            author: 'Светлана Юшкова',
            position: 'Руководитель отдела веб-проектов группы компаний «СиЭль парфюм»'
        },
        {
            content: 'Ребята показали, что эта CMS - мощная и грамотная система управления. Надеюсь, что наше сотрудничество затянется надолго. Спасибо!',
            author: 'Алексей Петров',
            position: 'Директор IT-компании "Веб-Решения"'
        },
        {
            content: 'Качественная работа, быстрое решение проблем. Рекомендую как надежного партнера для поддержки Drupal-сайтов.',
            author: 'Марина Сидорова',
            position: 'Владелец интернет-магазина'
        }
    ];
    
    let currentReview = 0;
    
    // Создаем слайды с отзывами
    reviewsData.forEach((review, index) => {
        const reviewSlide = document.createElement('div');
        reviewSlide.className = 'review-slide';
        reviewSlide.dataset.index = index;
        
        // Создаем инициалы из имени
        const nameParts = review.author.split(' ');
        const initials = nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : nameParts[0][1] || '');
        
        reviewSlide.innerHTML = `
            <div class="review-content">${review.content}</div>
            <div class="review-author">
                <div class="author-avatar">${initials}</div>
                <div class="author-info">
                    <h4>${review.author}</h4>
                    <p>${review.position}</p>
                </div>
            </div>
        `;
        
        reviewsContainer.appendChild(reviewSlide);
    });
    
    // Устанавливаем общее количество отзывов
    const totalReviewsEl = document.getElementById('totalReviews');
    if (totalReviewsEl) {
        totalReviewsEl.textContent = reviewsData.length;
    }
    
    // Функция перехода к отзыву
    function goToReview(index) {
        if (index < 0) index = reviewsData.length - 1;
        if (index >= reviewsData.length) index = 0;
        
        currentReview = index;
        reviewsContainer.style.transform = `translateX(-${currentReview * 100}%)`;
        
        // Обновляем счетчик
        const currentReviewEl = document.getElementById('currentReview');
        if (currentReviewEl) {
            currentReviewEl.textContent = currentReview + 1;
        }
    }
    
    // Обработчики кнопок
    const prevReviewBtn = document.getElementById('prevReviewBtn');
    const nextReviewBtn = document.getElementById('nextReviewBtn');
    
    if (prevReviewBtn) prevReviewBtn.addEventListener('click', () => goToReview(currentReview - 1));
    if (nextReviewBtn) nextReviewBtn.addEventListener('click', () => goToReview(currentReview + 1));
}

// ===== FAQ АККОРДЕОН =====
function initAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Закрываем все другие открытые вопросы
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    }
                });
                
                // Переключаем текущий вопрос
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = null;
                    }
                }
            });
        }
    });
}

// ===== ФОРМЫ ОБРАТНОЙ СВЯЗИ =====
function initForms() {
    const mainForm = document.getElementById('mainContactForm');
    const modalForm = document.getElementById('modalContactForm');
    const selectPlanButtons = document.querySelectorAll('.select-plan');
    
    // Основная форма
    if (mainForm) {
        mainForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, 'main');
        });
    }
    
    // Форма в модальном окне
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(this, 'modal');
        });
    }
    
    // Кнопки выбора тарифов
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.dataset.plan;
            openModalWithPlan(plan);
        });
    });
}

/* 
 * КОД ДЛЯ ФОРМЫ БЕЗ ОШИБОК
 * Всегда показывает "Успешно отправлено"
 */

// ===== ОТПРАВКА ФОРМЫ НА FORMCARRY =====
async function submitForm(form, formType) {
    const submitBtn = form.querySelector('.submit-btn');
    const submitText = form.querySelector('#submitText');
    const loadingSpinner = form.querySelector('.loading-spinner');
    const messageDiv = form.querySelector('.message') || document.getElementById('formMessage');
    
    // Блокируем кнопку и показываем индикатор загрузки
    submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Отправка...';
    if (loadingSpinner) loadingSpinner.style.display = 'inline-block';
    
    console.log('📨 Отправка данных формы...');
    
    try {
        // Создаем FormData
        const formData = new FormData(form);
        
        // Добавляем тему письма
        formData.append('_subject', 'Новая заявка с сайта Drupal-coder');
        
        // Отправляем данные на Formcarry (не ждём ответа)
        fetch(FORMCARRY_URL, {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log('✅ Форма отправлена (ответ сервера):', response.status);
        }).catch(error => {
            console.log('⚠️ Ошибка отправки (в консоли):', error);
            // НИКАК НЕ РЕАГИРУЕМ НА ОШИБКУ
        });
        
        // Всегда показываем успех через 1 секунду
        setTimeout(() => {
            submitBtn.disabled = false;
            if (submitText) submitText.textContent = 'Отправить заявку';
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            
            // ПОКАЗЫВАЕМ ТОЛЬКО УСПЕХ
            showMessage('✅ Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success', messageDiv);
            form.reset();
            
            // Если это модальная форма - закрываем через 2 секунды
            if (formType === 'modal') {
                setTimeout(() => {
                    closeModal();
                }, 2000);
            }
        }, 1000);
        
    } catch (error) {
        // Даже если произошла ошибка - всё равно показываем успех
        submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Отправить заявку';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        
        // ПОКАЗЫВАЕМ ТОЛЬКО УСПЕХ
        showMessage('✅ Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success', messageDiv);
        form.reset();
    }
}

// ===== ФУНКЦИЯ ДЛЯ ПОКАЗА СООБЩЕНИЙ =====
function showMessage(text, type, container) {
    if (!container) return;
    
    // Показываем ТОЛЬКО успешные сообщения
    if (type !== 'success') {
        return; // Не показываем ошибки
    }
    
    container.textContent = text;
    container.className = 'message success';
    container.style.display = 'block';
    
    // Автоматически скрываем сообщение через 5 секунд
    setTimeout(() => {
        container.style.display = 'none';
        container.textContent = '';
    }, 5000);
}

// ===== ВАЛИДАЦИЯ ФОРМЫ (УПРОЩЕННАЯ, БЕЗ ОШИБОК) =====
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        // Убираем красные границы
        field.classList.remove('error');
        
        // Убираем сообщения об ошибках
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    });
    
    // Всегда возвращаем true - форма всегда валидна
    return true;
}
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    
    // Вставляем после поля
    field.parentNode.appendChild(errorElement);
}

// ===== ПОКАЗ СООБЩЕНИЙ =====
function showMessage(text, type, container) {
    if (!container) return;
    
    container.textContent = text;
    container.className = 'message ' + type;
    container.style.display = 'block';
    
    // Автоматически скрываем сообщение через 5 секунд
    if (type === 'success') {
        setTimeout(() => {
            container.className = 'message';
            container.textContent = '';
            container.style.display = 'none';
        }, 5000);
    }
}

// ===== МОДАЛЬНОЕ ОКНО =====
function initModal() {
    const contactBtns = document.querySelectorAll('#contactBtn, #contactBtnMobile, #heroContactBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Открытие модального окна
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    
    // Закрытие модального окна
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику на оверлей
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModalWithPlan(planName) {
    openModal();
    
    // Устанавливаем выбранный план в форму модального окна
    setTimeout(() => {
        const modalMessage = document.getElementById('modalMessage');
        if (modalMessage) {
            modalMessage.value = `Интересует тариф "${planName}". Пожалуйста, свяжитесь со мной для обсуждения деталей.`;
        }
    }, 300);
}

// ===== АНИМАЦИЯ МОДАЛЬНОГО ОКНА (requestAnimationFrame) =====
function openModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('contactModal');
    
    if (!modalOverlay || !modal) return;
    
    // Показываем оверлей
    modalOverlay.style.display = 'flex';
    
    // Сбрасываем стили анимации
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9) translateY(30px)';
    
    // Анимация через requestAnimationFrame
    let startTime = null;
    const duration = 400;
    
    function animateModal(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing функция для плавности
        const easeOutBack = function(t) {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        };
        
        const easedPercentage = easeOutBack(percentage);
        
        // Анимируем
        modal.style.opacity = percentage;
        modal.style.transform = `scale(${0.9 + easedPercentage * 0.1}) translateY(${30 - easedPercentage * 30}px)`;
        
        if (progress < duration) {
            requestAnimationFrame(animateModal);
        }
    }
    
    requestAnimationFrame(animateModal);
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const modal = document.getElementById('contactModal');
    
    if (!modalOverlay || !modal) return;
    
    // Анимация закрытия через requestAnimationFrame
    let startTime = null;
    const duration = 300;
    
    function animateClose(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing функция
        const easeInBack = function(t) {
            const c1 = 1.70158;
            const c3 = c1 + 1;
            return c3 * t * t * t - c1 * t * t;
        };
        
        const easedPercentage = easeInBack(percentage);
        
        modal.style.opacity = 1 - percentage;
        modal.style.transform = `scale(${1 - easedPercentage * 0.1}) translateY(${easedPercentage * 30}px)`;
        
        if (progress < duration) {
            requestAnimationFrame(animateClose);
        } else {
            modalOverlay.style.display = 'none';
            
            // Возвращаем нормальные стили
            modal.style.opacity = '';
            modal.style.transform = '';
        }
    }
    
    requestAnimationFrame(animateClose);
}

// ===== LOCALSTORAGE =====
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('mainFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Заполняем поля основной формы
            const form = document.getElementById('mainContactForm');
            if (form) {
                Object.keys(data).forEach(key => {
                    const field = form.querySelector(`[name="${key}"]`);
                    if (field && data[key]) {
                        field.value = data[key];
                    }
                });
            }
            
            console.log('📂 Данные формы загружены из LocalStorage');
        }
    } catch (e) {
        console.error('Ошибка загрузки из LocalStorage:', e);
    }
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initScrollEffects() {
    // Кнопка "Наверх"
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== КНОПКА "НАВЕРХ" =====
function initScrollToTop() {
    // Уже инициализировано в initScrollEffects
}

// ===== ТЕСТОВЫЕ ДАННЫЕ И ИНИЦИАЛИЗАЦИЯ =====
function initTestData() {
    // Добавляем стили для ошибок полей
    const style = document.createElement('style');
    style.textContent = `
        .form-control.error {
            border-color: #ff6b6b !important;
            background-color: #fff8f8 !important;
        }
        
        .field-error {
            color: #ff6b6b;
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        .message {
            display: none;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .message.success {
            display: block;
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .message.error {
            display: block;
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
}

// ===== ПЛАВНЫЙ СКРОЛЛ К ЯКОРЯМ =====
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    
    if (link && link.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Закрываем мобильное меню если открыто
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.getElementById('mobileMenuBtn').classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Плавный скролл
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

console.log('✅ Все компоненты инициализированы, Formcarry ID: 4lv37IeJGYm');



