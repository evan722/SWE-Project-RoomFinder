document.addEventListener('DOMContentLoaded', () => {
    const maps = ['map1.jpg', 'map2.jpg', 'map3.jpg'];
    let currentMapIndex = 0;

    const mapElement = document.getElementById('map');
    const nextMapButton = document.getElementById('next-map-btn');
    const dotElements = document.querySelectorAll('.dot');

    // Function to update dot visibility based on the current map
    function updateDotVisibility() {
        dotElements.forEach(dot => {
            const mapIndex = parseInt(dot.dataset.mapIndex);
            dot.style.display = (mapIndex === currentMapIndex) ? 'block' : 'none';
        });
    }

    // Switch map and update dot visibility
    nextMapButton.addEventListener('click', () => {
        currentMapIndex = (currentMapIndex + 1) % maps.length;
        mapElement.src = `/static/${maps[currentMapIndex]}`;
        updateDotVisibility();
    });

    // Initial update of dot visibility when the page loads
    updateDotVisibility();

    // Function to update dot colors based on room status
    async function fetchRoomStatusAndUpdateDots() {
        try {
            const response = await fetch('/get_room_status');
            const roomStatuses = await response.json();
            //roomStatuses = {} // testing frontend responses
            //roomStatuses["dot1"] = 1

            // Loop through each dot and update color based on room status
            dotElements.forEach(dot => {
                const roomId = dot.id.replace('dot-', 'RM_'); // Adjust ID format as needed
                if (roomStatuses[roomId] !== undefined) { // Check if the room exists in the response
                    dot.style.backgroundColor = (roomStatuses[roomId] === 1) ? 'red' : 'green'; // Red for occupied, green for empty
                }
            });
        } catch (error) {
            console.error("Error fetching room status:", error);
        }
    }

    // Initial call to fetch room statuses and update dots
    fetchRoomStatusAndUpdateDots();

    // Set interval to update dots every 15 minutes
    setInterval(fetchRoomStatusAndUpdateDots, 900000);  // 15 minutes in milliseconds
});
