document.addEventListener('DOMContentLoaded', () => {
    const maps = ['map1.jpg', 'map2.jpg', 'map3.jpg'];
    let currentMapIndex = 0;

    const mapElement = document.getElementById('map');
    const nextMapButton = document.getElementById('next-map-btn');
    const dotElements = document.querySelectorAll('.dot');
    const infoContainer = document.getElementById('infoContainer');
    // const resButton = document.getElementById('reserve-btn');
    const roomListElement = document.getElementById('roomList');
    
    let isActive = false; // Track the active state

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
        const response = await fetch('/get_all_av');
        const roomStatuses = await response.json();

        // Loop through each dot and update color based on room status
        dotElements.forEach(dot => {
            const roomId = dot.id.replace('dot-', ''); // Adjust ID format as needed
            if (roomStatuses[roomId] !== undefined) { // Check if the room exists in the response
                dot.style.backgroundColor = (roomStatuses[roomId] === 1) ? 'green' : 'red'; // Red for occupied, green for empty
            }
        });
    }
        ///////////////////
    
    async function sortRoomsList() {
        const listResponse = await fetch('/get_all_list_message');
        const listRoomStatuses = await listResponse.json();

        const rooms = Object.keys(listRoomStatuses).map(room => ({
            name: room,
            available_for: listRoomStatuses[room]
        }));

        // Sort rooms by availability 
        rooms.sort((a, b) => {
            if (a.available_for < 0) return 1;  // Move unavailable rooms down
            if (b.available_for < 0) return -1; // Move unavailable rooms down
            
            // Sort available rooms by the available time in descending order (higher availability at the top)
            return b.available_for - a.available_for;
        });

        // Clear existing list
        roomListElement.innerHTML = '';

        // Add sorted rooms to the list
        rooms.forEach(room => {
            const roomItem = document.createElement('div');
            roomItem.classList.add('room-item');

            // SET MESSAGE
            let message = `nothing`;
            if (room.available_for===10000) {
                message = `<span style="color: green;">Available</span>`;
            } else if (room.available_for===-1) {
                message= `<span style="color: red;">Unavailable</span>`;
            } else {
                message = `Available for <span style="color: green;">${room.available_for}</span> min`;
            }

            // ROOM NAVIGATORS
            roomItem.innerHTML = `<strong>${room.name}:</strong> ${message}`

            // NAVIGATOR
            roomItem.addEventListener('click', () => {
                const dotName = document.getElementById(room.name);
                const dotIndex = dotName.getAttribute('data-map-index');

                currentMapIndex = (dotIndex) % maps.length;
                mapElement.src = `/static/${maps[currentMapIndex]}`;
                updateDotVisibility();            

                dotName.click(); // Simulate click on the dot

                // document.getElementById('searchInput').addEventListener('input', function() {
                //     const searchTerm = this.value.toLowerCase();                   
                //     const theInnerHTML = item.innerHTML
                //     const roomName = theInnerHTML.match(/<strong>(.*?)<\/strong>/)[1].replace(':', '').trim();
            // 
                    // getAddlInfo(roomName)().then(infos => {
                    //     skibiddy = infos["room_name"] + infos["activity"];
                    //     const allMatch = [...searchTerm].every(char => skibbidy.includes(char));
        
                    //     if (allMatch) {
                    //         roomItem.style.display = '';  // Show the item if all characters match
                    //     } else {
                    //         roomItem.style.display = 'none';  // Hide the item if not all characters match
                    //     }
                    // });
                // });    
            

            });

            roomListElement.appendChild(roomItem);

        });
    }
    
    async function getAddlInfo(name_of_room) {
        const roomIDName = name_of_room;
        const response = await fetch(`/update_av/${roomIDName}`);
        const addl_data = await response.json();
        return addl_data;
    }
    
    let hideTimeout;

    dotElements.forEach(dot => {
        dot.addEventListener('click', async (event) => {
            const roomID = dot.getAttribute('id');
            const data = await getAddlInfo(roomID);
    
            // Update the info container with new text
            document.getElementById('row1').textContent = 'Room ' + data['room_name'];
            document.getElementById('row2').textContent = data['message'];
            document.getElementById('row3').textContent = data['activity'];

            const rect = dot.getBoundingClientRect();

            infoContainer.style.left = `${rect.right}px`; // 10px to the right
            infoContainer.style.top = `${rect.top-25}px`; // Align with click position
            infoContainer.classList.add('active'); // Show
            isActive = true;

            // resButton.innerHTML = `RESERVE`;

            // Clear any existing timeout
            clearTimeout(hideTimeout);

            // Set a timeout to hide the infoContainer after 1 second
            hideTimeout = setTimeout(() => {
                infoContainer.classList.remove('active'); // Hide the info container
                isActive = false; // Update active state
            }, 3000);

        });
    });

    // Hide the info container when clicking elsewhere
    document.addEventListener('click', (event) => {
        if (isActive && !infoContainer.contains(event.target) && !event.target.matches('.dot')) {
            infoContainer.classList.remove('active'); // Hide
            isActive = false;
        }
    });

    document.getElementById('searchInput').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const items = roomListElement.querySelectorAll('.room-item');
       
        items.forEach(item => {
            const theInnerHTML = item.innerHTML;
            const roomName = theInnerHTML.match(/<strong>(.*?)<\/strong>/)[1].replace(':', '').trim();

            getAddlInfo(roomName).then(infos => {
                const skibiddy = (infos["room_name"] + " " + infos["activity2"]).toLowerCase();
                if (skibiddy.includes(searchTerm) === true) {
                    item.style.display = '';  
                } else {
                    item.style.display = 'none';  
                };
    
                });
        });
    });    

    // Initial call to fetch room statuses and update dots
    fetchRoomStatusAndUpdateDots();
    sortRoomsList();
    searchBar();

    // Set interval to update dots every minute
    setInterval(fetchRoomStatusAndUpdateDots, 900000/15);  // minute in milliseconds
});
