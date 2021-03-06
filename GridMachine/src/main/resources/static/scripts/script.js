console.log("Welcome to EyeTech Automation machine...");

let dragged;
let inHangar = true;

// ***********************************************************
// ***** Event Listener cell Elements *****
// ***********************************************************
const cells = document.querySelectorAll(".cell");
for (const cell of cells) {
    cell.addEventListener("click", clickCellEvent);
}

// ***********************************************************
// ***** Event Listeners drag&drop Element *****
// ***********************************************************
const vehicle = document.querySelector(".vehicle");
document.addEventListener("dragstart", dragStartEvent);
document.addEventListener("drop", dropEvent);
document.addEventListener("dragover", dragOverEvent);

// ***********************************************************
// ***** Event Listeners drag&drop Element *****
// ***********************************************************
const start = document.querySelector("form");
start.addEventListener("submit", submitEvent);

/**
 * This method will start to move the machine all along the desk grid
 * 
 * @param {*}
 *            event
 */
function submitEvent(event) {
    event.preventDefault();
    // Check if the machines is in the Hangar
    if (inHangar) {
        alert("Machine in Hangar");
        return;
    }
    const vehicle = document.querySelector(".vehicle");
    const parent = vehicle.parentElement;
    if (parent.className != "cell") {
        alert("Machine in missing");
        return;
    }
    
    const steps = document.querySelector("#steps").value;
    console.log("Steps:" + steps);

    // Set delay for each step
    var delayInMilliseconds = 5000; // 1 second
      
    for (var i = 0; i < steps; i++) {
    	const y = parent.getAttribute("coord-y");
    	const x = parent.getAttribute("coord-x");
    	const color = (parent.style.backgroundColor == "" || parent.style.backgroundColor == "white") ? "white" : "black";
    	
    	const cell = {
    			"x": x,
    			"y": y,
    			"color": color
    	};
    	console.log(cell);	
    	
    	$.ajax({
    		async: true,
    		type: 'PUT',
    		url: 'http://localhost:8080/machine/update',
    		contentType: 'application/json',
    		data: JSON.stringify(cell),
    	}).done(function (coordinate) {
    		console.log('SUCCESS');
    		console.log(coordinate);
    		moveVehicle(coordinate);
    	}).fail(function (msg) {
    		console.log('FAIL');
    	}).always(function (msg) {
    		console.log('ALWAYS');
    	});
    	 sleep(2000);
	}
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

/**
 * This method will create the effect to move the vehicle all along the dash
 * [Source](http://jsfiddle.net/pascalockert/jp9gr48f/)
 * 
 * @param {*}
 *            coordinate new direction which the vehicle has to move in
 */
function moveVehicle(coordinate) {
    console.log("moving vehicle...");

    const currentRotation = getCurrentRotation("vehicle");
    const newRotation = calculateNewRotation(currentRotation, coordinate["rotation"]);
    
    // Get node elements
    const vehicle = document.getElementById("vehicle");
    const previousCell = vehicle.parentElement;
    const nextCell = getNextCell(previousCell, newRotation, coordinate["distance"]);

    vehicle.style.webkitTransform = 'rotate(' + newRotation + 'deg)';
    nextCell.appendChild(vehicle);


}

/**
 * 
 * @param {*}
 *            previousCell
 * @param {*}
 *            newRotation
 * @param {*}
 *            distance
 */
function getNextCell(previousCell, newRotation, distance) {
    console.log("getNextCell...");
    
    const y = previousCell.getAttribute("coord-y");
    const x = previousCell.getAttribute("coord-x");

    let idCell = "y0x0";
    switch (newRotation) {
        case 0:
            // Up
            if (y == 0)
                idCell = "y3x" + x;
            else
                idCell = "y" + (y - distance) + "x" + x;
            break;
        case 90:
            // Right
            if (x == 3)
                idCell = "y" + y + "x0";
            else
                idCell = "y" + y + "x" + (1 * x + distance);
            break;
        case 180:
            // Down
            if (y == 3)
                idCell = "y0x" + x;
            else
                idCell = "y" + (1 * y + distance) + "x" + x;
            break;
        case 270:
            // Left
            if (x == 0)
                idCell = "y" + y + "x3";
            else
                idCell = "y" + y + "x" + (x - distance);
            break;    
        default:
            break;
    }
    
    return document.getElementById(idCell);;
}

/**
 * This method calculate the rotation.
 * 
 * It controls that never exceed the limits 0-360.
 * 
 * @param {*}
 *            currentRotation
 * @param {*}
 *            degreeToAdd
 */
function calculateNewRotation(currentRotation, degreeToAdd) {
    let newAngle = currentRotation + degreeToAdd;
    // Never negative
    // -90deg = 270deg
    if (newAngle < 0)
        newAngle = 270;
    // Never let bigger than 360 (which is equal to 0deg)
    // 360deg = 0deg
    if (newAngle == 360)
        newAngle = 0;
    console.log("new rotation: " + newAngle);
    return newAngle;
}

/**
 * This method will get the current rotation in degrees for the Node element
 * with that id.
 * 
 * [Source](https://codepen.io/jjeaton/pen/bzolH)
 * 
 * @param {*}
 *            id
 */
function getCurrentRotation(id) {
    var el = document.getElementById(id);
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    if (tr !== "none") {
        // console.log('Matrix: ' + tr);

        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        var radians = Math.atan2(b, a);
        var angle = Math.round(radians * (180 / Math.PI));

    } else
        var angle = 0;

    console.log('Current rotation: ' + angle + 'deg');

    return angle;
}

/**
 * This method will make the element draggable
 * 
 * @param {*}
 *            event
 */
function dragStartEvent(event) {
    console.log("dragStart...");
    event.dataTransfer.setData("text", event.target.id);
    dragged = event.target;
}

/**
 * This method will: - Drop the vehicle in the location - Update the status of
 * the hangar
 * 
 * @param {*}
 *            event
 */
function dropEvent(event) {
    console.log("drop...");
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "cell" || event.target.className == "hangar") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
    }
    inHangar = (event.target.className == "hangar") ? true : false;
}

/**
 * 
 * @param {*}
 *            event
 */
function dragOverEvent(event) {
    console.log("dragOver...");
    event.preventDefault();
}

/**
 * This method will: - Update the background color for that node element. -
 * Display by console if the vehicle is in the Hangar or not.
 * 
 * @param {*}
 *            event
 */
function clickCellEvent(event) {
    event.preventDefault();
    let cell = event.target;

    if (cell.tagName.toLowerCase() == "img") {
        cell = cell.parentElement;
    }

    cell.style.backgroundColor = (cell.style.backgroundColor == "" || cell.style.backgroundColor == "white") ? "black" : "white";

    console.log("Is in Hangar? " + inHangar);
}

/**
 * This method will update the background color for that node element
 * 
 * @param {*}
 *            event
 */
function dropCellEvent(event) {
    console.log("Color: " + $(this).css("background-color"));
    if ($(this).css("background-color") == "rgb(255, 255, 255)")
        $(this).css("background-color", "rgb(0, 0, 0)");
    else
        $(this).css("background-color", "rgb(255, 255, 255)");
}