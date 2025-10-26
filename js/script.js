document.addEventListener("DOMContentLoaded", function () {

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


