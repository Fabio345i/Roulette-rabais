"use strict"

const urlParams = new URLSearchParams(window.location.search);
const formData = {
    courriel: urlParams.get('email'),
    tel: urlParams.get('telephone'),
    name: urlParams.get('nom'),
    pren: urlParams.get('prenom'),
    codeP: urlParams.get('codePostal'),
    conf: urlParams.get('confirmation') === 'true'
};

let myWheel
let offre

const courrielEsteban = "egagnon@qualiteetudiants.com"
const courrielJustine = "jpichette@qualiteetudiants.com"
const codesEsteban = ["G2A", "G3E", "G3B", "G3C"]
const codesJustine = ["G0A", "G3B"]

function creerRoue(){
    myWheel = new Winwheel({
        'canvasId': 'wheelCanvas',
        'numSegments': 12,
        'segments': [
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#7de6ef', 'text': '15%'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#89f26e', 'text': '10%'},
            { 'fillStyle': '#eae56f', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#7de6ef', 'text': '15%'}
        ],
        'animation': {
            'type': 'spinToStop',  // Spin animation
            'duration': 5,         // Duration in seconds
            'spins': 8,            // Number of spins
            'callbackFinished': alertPrize  // Function when spinning ends
        },
        'outerRadius': 212,        // Set the outer radius
        'textFontSize': 14,        // Set text size
        'textMargin': 10          // Margin between text and segment edge
    });
    myWheel.draw();
}

window.startSpin = function() {
    document.getElementById("btnSpin").disabled = true;
    myWheel.startAnimation();
}

// Function to display the winning prize
function alertPrize(indicatedSegment) {
    offre = indicatedSegment.text;
    let courrielQE
    const postalCode = formData.codeP.toUpperCase();
    if (codesEsteban.some(code => postalCode.includes(code))) 
        // courrielQE = courrielEsteban
        courrielQE = "maliceultime@gmail.com"
    else if (codesJustine.some(code => postalCode.includes(code)))
        // courrielQE = courrielJustine
    courrielQE = "dussault.gagnons@gmail.com"
    envoyerMailQE(courrielQE)
    if (formData.conf)
        envoyerMailClient()
    alert(`Félicitions ! Vous avez gagné ${offre} de rabais!`);
}

function envoyerMailQE(courrielQE) {
    emailjs.send("service_4q5ap02", "template_flr4wic", {
        nom_client: formData.name,
        prenom_client: formData.pren,
        tel_client: formData.tel,
        courriel_client: formData.courriel,
        courriel_qe: courrielQE,
        offre_client: offre
    })
    .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
    }, (error) => {
        console.log("FAILED...", error);
    });
}

function envoyerMailClient() {
    emailjs.send("service_4q5ap02", "template_alfns7o", {
        nom_client: formData.name,
        prenom_client: formData.pren,
        courriel_client: formData.courriel,
        offre_client: offre
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