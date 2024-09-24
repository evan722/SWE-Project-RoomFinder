document.addEventListener('DOMContentLoaded', () => {
    const maps = ['map1.jpg', 'map2.jpg', 'map3.jpg'];
    let currentMapIndex = 0;

    const mapElement = document.getElementById('map');
    const nextMapButton = document.getElementById('next-map-btn');
    const mapContainer = document.querySelector('.map-container');

    // Dot data: percentage positions relative to the map, color (0 = red, 1 = green), and mapIndex
    const dots = [
        { xPercent: 150, yPercent: 50, color: 1, mapIndex: 0 },  // Appears on map1
        { xPercent: 30, yPercent: 40, color: 1, mapIndex: 1 },  // Appears on map2
        { xPercent: 50, yPercent: 60, color: 0, mapIndex: 2 }   // Appears on map3
    ];

    // Function to create dot elements
    function createDot(dot, index) {
        const dotElement = document.createElement('div');
        dotElement.classList.add('dot');
        dotElement.style.position = 'absolute';
        dotElement.style.width = '10px';
        dotElement.style.height = '10px';
        dotElement.style.borderRadius = '50%';
        dotElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        dotElement.style.backgroundColor = dot.color === 0 ? 'red' : 'green';
        dotElement.dataset.mapIndex = dot.mapIndex;  // Store which map this dot belongs to
        dotElement.dataset.dotIndex = index;         // Store the index to reference in the dots array
        dotElement.style.display = 'none';           // Hide initially
        mapContainer.appendChild(dotElement);

        return dotElement;
    }

    // Create dots and store references to them
    const dotElements = dots.map((dot, index) => createDot(dot, index));

    // Function to update dot positions based on map size and keep them centered
    function updateDotPositions() {
        const mapRect = mapElement.getBoundingClientRect();
        dotElements.forEach((dotElement, index) => {
            const dotData = dots[index];
            if (parseInt(dotElement.dataset.mapIndex) === currentMapIndex) {
                // Calculate position as percentage of map size
                const xPosition = mapRect.width * (dotData.xPercent / 100);
                const yPosition = mapRect.height * (dotData.yPercent / 100);

                // Offset dot to ensure it stays centered (considering the dot's size)
                const dotSize = parseInt(dotElement.style.width);  // Assuming the dot is a square
                const xOffset = dotSize / 2;
                const yOffset = dotSize / 2;

                dotElement.style.left = `${xPosition - xOffset}px`;
                dotElement.style.top = `${yPosition - yOffset}px`;
                dotElement.style.display = 'block';  // Show if assigned to current map
            } else {
                dotElement.style.display = 'none';   // Hide otherwise
            }
        });
    }

    // Switch map and update dot visibility and positions
    nextMapButton.addEventListener('click', () => {
        currentMapIndex = (currentMapIndex + 1) % maps.length;
        mapElement.src = `/static/${maps[currentMapIndex]}`;
        updateDotPositions();
    });

    // Update dot positions initially and on window resize
    window.addEventListener('resize', updateDotPositions);

    // Initial update of dot positions when the page loads
    updateDotPositions();
});
