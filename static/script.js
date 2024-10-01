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
let RM203 = 1;
let RM205 = 1;
let RM208 = 1;
let RM217 = 1;
let RM218 = 1;
let RM219 = 1;
let RM215 = 1;
let RM220 = 1;
let RM1202 = 1;
let RM1204 = 1;
let RM1206 = 1;
let RM240 = 1;
let RM247 = 1;
let RM245 = 1;
let RM302 = 1;
let RM304 = 1;
let RM319 = 1;
let RM318 = 1;
let RM317 = 1;
let RM316 = 1;
let RM309 = 1;
let RM307 = 1;
let RM305 = 1;
let RM340 = 1;
let RM346 = 1;
let RM345 = 1;





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
    let dot19 = document.getElementById('dot19');
    let dot20 = document.getElementById('dot20');
    let dot21 = document.getElementById('dot21');
    let dot22 = document.getElementById('dot22');
    let dot23 = document.getElementById('dot23');
    let dot24 = document.getElementById('dot24');
    let dot25 = document.getElementById('dot25');
    let dot26 = document.getElementById('dot26');
    let dot27 = document.getElementById('dot27');
    let dot28 = document.getElementById('dot28');
    let dot29 = document.getElementById('dot29');
    let dot30 = document.getElementById('dot30');
    let dot31 = document.getElementById('dot31');
    let dot32 = document.getElementById('dot32');
    let dot33 = document.getElementById('dot33');
    let dot34 = document.getElementById('dot34');
    let dot35 = document.getElementById('dot35');
    let dot36 = document.getElementById('dot36');
    let dot37 = document.getElementById('dot37');
    let dot38 = document.getElementById('dot38');
    let dot39 = document.getElementById('dot39');
    let dot40 = document.getElementById('dot40');
    let dot41 = document.getElementById('dot41');
    let dot42 = document.getElementById('dot42');
    let dot43 = document.getElementById('dot43');
    let dot44 = document.getElementById('dot44');




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
    dot19.style.backgroundColor = RM203 === 1 ? 'green' : 'red';
    dot20.style.backgroundColor = RM205 === 1 ? 'green' : 'red';
    dot21.style.backgroundColor = RM208 === 1 ? 'green' : 'red';
    dot22.style.backgroundColor = RM217 === 1 ? 'green' : 'red';
    dot23.style.backgroundColor = RM218 === 1 ? 'green' : 'red';
    dot24.style.backgroundColor = RM219 === 1 ? 'green' : 'red';
    dot25.style.backgroundColor = RM215 === 1 ? 'green' : 'red';
    dot26.style.backgroundColor = RM220 === 1 ? 'green' : 'red';
    dot27.style.backgroundColor = RM1202 === 1 ? 'green' : 'red';
    dot28.style.backgroundColor = RM1204 === 1 ? 'green' : 'red';
    dot29.style.backgroundColor = RM1206 === 1 ? 'green' : 'red';
    dot30.style.backgroundColor = RM240 === 1 ? 'green' : 'red';
    dot31.style.backgroundColor = RM247 === 1 ? 'green' : 'red';
    dot32.style.backgroundColor = RM245 === 1 ? 'green' : 'red';
    dot33.style.backgroundColor = RM302 === 1 ? 'green' : 'red';
    dot34.style.backgroundColor = RM304 === 1 ? 'green' : 'red';
    dot35.style.backgroundColor = RM319 === 1 ? 'green' : 'red';
    dot36.style.backgroundColor = RM318 === 1 ? 'green' : 'red';
    dot37.style.backgroundColor = RM317 === 1 ? 'green' : 'red';
    dot38.style.backgroundColor = RM316 === 1 ? 'green' : 'red';
    dot39.style.backgroundColor = RM309 === 1 ? 'green' : 'red';
    dot40.style.backgroundColor = RM307 === 1 ? 'green' : 'red';
    dot41.style.backgroundColor = RM305 === 1 ? 'green' : 'red';
    dot42.style.backgroundColor = RM340 === 1 ? 'green' : 'red';
    dot43.style.backgroundColor = RM346 === 1 ? 'green' : 'red';
    dot44.style.backgroundColor = RM345 === 1 ? 'green' : 'red';

}

// Call the function initially to set the colors when the page loads
updateDotColors();



