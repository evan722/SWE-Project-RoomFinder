document.addEventListener('DOMContentLoaded', () => {
    const maps = ['map1.jpg', 'map2.jpg', 'map3.jpg'];
    let currentMapIndex = 0;

    const mapElement = document.getElementById('map');
    const nextMapButton = document.getElementById('next-map-btn');

    nextMapButton.addEventListener('click', () => {
        currentMapIndex = (currentMapIndex + 1) % maps.length;
        mapElement.src = `/static/${maps[currentMapIndex]}`;
    });
});
