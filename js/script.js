document.addEventListener("DOMContentLoaded", function () {
    // Анимация шапки при скролле
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Анимация появления элементов при скролле
    const animateElems = document.querySelectorAll('.animate-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {threshold: 0.15});

    animateElems.forEach(elem => {
        observer.observe(elem);
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            console.log(target);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Имитация загрузки для демо
    setTimeout(() => {
        document.querySelector('.hero h1').style.opacity = '1';
        document.querySelector('.hero p').style.opacity = '1';
        document.querySelector('.hero-btns').style.opacity = '1';
    }, 300);

    // Фокус на поле поиска при клике на карту
    const mapSearchInput = document.querySelector('.map-search-input');
    const mapContent = document.querySelector('.map-content');

    if (mapContent && mapSearchInput) {
        mapContent.addEventListener('click', () => {
            console.log(mapContent);
            mapSearchInput.focus();
        });
    }

// Работа с картой.
// Загрузка всех адресов.  
    async function loadAddresses() {
        try {
            const response = await fetch('assets/locations.json');
            return await response.json();
        } catch (error) {
            console.error('Ошибка загрузки', error);
            return [];
        }
    }

    // Отображаем карту со всеми адресами. 
    async function initMap() {
        const addresses = await loadAddresses();
        const myMap = new ymaps.Map("yandex-map", {
            center: [60.0, 30.0],
            zoom: 5,
            controls: ['zoomControl', 'fullscreenControl']
        });

        addresses.forEach(location => {
            const placemark = new ymaps.Placemark(location.coordinates, {
                balloonContent: location.balloonContent
            });
            myMap.geoObjects.add(placemark);
        });

        if (addresses.length > 0) {
            myMap.setCenter(addresses[0].coordinates, 12);
        }
    }

    ymaps.ready(initMap);
});


// Находим адрес и показываем его пользователю на карте.
const searchInput = document.querySelector('.map-search-input');

searchInput.addEventListener('change', function () {
    const address = this.value;
    console.log(address);
});


