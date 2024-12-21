"use strict"

const segmentAngles = [180, 90, 45, 45]; // 180 degrees for the first segment, smaller ones for the others
let myWheel

function creerRoue(){
    myWheel = new Winwheel({
        'canvasId': 'wheelCanvas',
        'numSegments': segmentAngles.length, // Number of segments
        'segments': [
            { 'fillStyle': '#eae56f', 'text': 'Large Prize', 'angle': segmentAngles[0] }, // Large segment (180 degrees)
            { 'fillStyle': '#89f26e', 'text': 'Small Prize 1', 'angle': segmentAngles[1] },
            { 'fillStyle': '#7de6ef', 'text': 'Small Prize 2', 'angle': segmentAngles[2] },
            { 'fillStyle': '#e7706f', 'text': 'Small Prize 3', 'angle': segmentAngles[3] }
        ],
        'animation': {
            'type': 'spinToStop',  // Spin animation
            'duration': 5,         // Duration in seconds
            'spins': 8,            // Number of spins
            'callbackFinished': alertPrize  // Function when spinning ends
        },
        'outerRadius': 212,        // Set the outer radius
        'textFontSize': 16,        // Set text size
        'textMargin': 10          // Margin between text and segment edge
    });
    myWheel.draw();
}


// Function to start spinning the wheel
function startSpin() {
    myWheel.startAnimation();
}

// Function to display the winning prize
function alertPrize(indicatedSegment) {
    alert(`You won: ${indicatedSegment.text}!`);
}

function envoyerMailQE() {
    emailjs.send("service_4q5ap02", "template_flr4wic", {
        nom_client: nom.value,
        prenom_client: prenom.value,
        tel_client : telephone.value,
        courriel_client : email.value,
        offre_client : offre
    })
    .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
    }, (error) => {
        console.log("FAILED...", error);
    });
}

function envoyerMailClient() {
    emailjs.send("service_4q5ap02", "template_alfns7o", {
        nom_client: nom.value,
        prenom_client: prenom.value,
        courriel_client: email.value,
        offre_client : offre
    })
    .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
    }, (error) => {
        console.log("FAILED...", error);
    });
}

function initialisation(){
    creerRoue();
}

window.addEventListener("load", initialisation)