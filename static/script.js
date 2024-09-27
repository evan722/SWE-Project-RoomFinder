document.addEventListener('DOMContentLoaded', () => {
    const maps = ['map1.jpg', 'map2.jpg', 'map3.jpg'];
    let currentMapIndex = 0;

    const mapElement = document.getElementById('map');
    const nextMapButton = document.getElementById('next-map-btn');
    const mapContainer = document.querySelector('.map-container');
    const dotElements = document.querySelectorAll('.dot');  // Select all dot elements

    // Function to update dot visibility based on current map
    function updateDotVisibility() {
        dotElements.forEach(dot => {
            const mapIndex = parseInt(dot.dataset.mapIndex);
            if (mapIndex === currentMapIndex) {
                dot.style.display = 'block';  // Show dot if it's for the current map
            } else {
                dot.style.display = 'none';   // Hide dot if it's for another map
            }
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
});





//dots var

let RM101 = 0; // Initially green
let RM103 = 0; // Initially green
let RM106 = 0; // Initially red
let RM117 = 0;
let RM1103 = 0;
let RM1106 = 0;
let RM1108 = 0;
let RM1109 = 0;
let RM1105 = 0;
let RM1102 = 0;
let RM115 = 0;
let RM114 = 0;
let RM113 = 0;
let RM112 = 0;
let Cafe = 0;
let C175 = 0;
let B175 = 1;
let A175 = 1;





// Function to update dot colors
function updateDotColors() {
    // Access dots by their IDs
    let dot1 = document.getElementById('dot1');
    let dot2 = document.getElementById('dot2');
    let dot3 = document.getElementById('dot3');
    let dot4 = document.getElementById('dot4');
    let dot5 = document.getElementById('dot5');
    let dot6 = document.getElementById('dot6');
    let dot7 = document.getElementById('dot7');
    let dot8 = document.getElementById('dot8');
    let dot9 = document.getElementById('dot9');
    let dot10 = document.getElementById('dot10');
    let dot11 = document.getElementById('dot11');
    let dot12 = document.getElementById('dot12');
    let dot13 = document.getElementById('dot13');
    let dot14 = document.getElementById('dot14');
    let dot15 = document.getElementById('dot15');
    let dot16 = document.getElementById('dot16');
    let dot17 = document.getElementById('dot17');
    let dot18 = document.getElementById('dot18');




    // Update the colors of the dots based on their individual variables
    dot1.style.backgroundColor = RM101 === 1 ? 'green' : 'red';
    dot2.style.backgroundColor = RM103 === 1 ? 'green' : 'red';
    dot3.style.backgroundColor = RM106 === 1 ? 'green' : 'red';
    dot4.style.backgroundColor = RM117 === 1 ? 'green' : 'red';
    dot5.style.backgroundColor = RM1103 === 1 ? 'green' : 'red';
    dot6.style.backgroundColor = RM1106 === 1 ? 'green' : 'red';
    dot7.style.backgroundColor = RM1108 === 1 ? 'green' : 'red';
    dot8.style.backgroundColor = RM1109 === 1 ? 'green' : 'red';
    dot9.style.backgroundColor = RM1105 === 1 ? 'green' : 'red';
    dot10.style.backgroundColor = RM1102 === 1 ? 'green' : 'red';
    dot11.style.backgroundColor = RM115 === 1 ? 'green' : 'red';
    dot12.style.backgroundColor = RM114 === 1 ? 'green' : 'red';
    dot13.style.backgroundColor = RM113 === 1 ? 'green' : 'red';
    dot14.style.backgroundColor = RM112 === 1 ? 'green' : 'red';
    dot15.style.backgroundColor = Cafe === 1 ? 'green' : 'red';
    dot16.style.backgroundColor = C175 === 1 ? 'green' : 'red';
    dot17.style.backgroundColor = B175 === 1 ? 'green' : 'red';
    dot18.style.backgroundColor = A175 === 1 ? 'green' : 'red';


}

// Call the function initially to set the colors when the page loads
updateDotColors();



