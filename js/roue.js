"use strict"

let myWheel

const courrielEsteban = "egagnon@qualiteetudiants.com"
const courrielJustine = "jpichette@qualiteetudiants.com"


function creerRoue(){
    myWheel = new Winwheel({
        'canvasId': 'wheelCanvas',
        'numSegments': 11,
        'segments': [
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#7de6ef', 'text': '15%'},
            { 'fillStyle': '#7de6ef', 'text': '15%'}
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
    document.getElementById("btnSpin").disabled = true;
    myWheel.startAnimation();
}

// Function to display the winning prize
function alertPrize(indicatedSegment) {
    alert(`You won: ${indicatedSegment.text}!`);
}

function envoyerMailQE(courriel) {
    emailjs.send("service_4q5ap02", "template_flr4wic", {
        nom_client: nom.value,
        prenom_client: prenom.value,
        tel_client : telephone.value,
        courriel_client : email.value,
        courriel_qe: courriel,
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