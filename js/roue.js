"use strict"

const urlParams = new URLSearchParams(window.location.search);
const formData = {
    courriel: urlParams.get('email'),
    tel: urlParams.get('telephone'),
    name: urlParams.get('nom'),
    pren: urlParams.get('prenom'),
    codeP: urlParams.get('codePostal'),
    conf: urlParams.get('confirmation') === "on",
    typeTravaux: urlParams.get('typeTravaux')
};

let myWheel
let offre

const courrielEsteban = "egagnon@qualiteetudiants.com"
const courrielCharles = "chcorriveau17@gmail.com"
const courrielJustine = "jpichette@qualiteetudiants.com"
const codesEsteban = ["G2A", "G3E", "G3B", "G3C"]
const codesJustine = ["G0A", "G3B"]

function creerRoue(){
    myWheel = new Winwheel({
        'canvasId': 'wheelCanvas',
        'numSegments': 12,
        'segments': [
            { 'fillStyle': '#08c7ba', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#17c90e', 'text': '10%'},
            { 'fillStyle': '#08c7ba', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#17c90e', 'text': '10%'},
            { 'fillStyle': '#08c7ba', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#d9ff00', 'text': '15%'},
            { 'fillStyle': '#08c7ba', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#17c90e', 'text': '10%'},
            { 'fillStyle': '#08c7ba', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#17c90e', 'text': '10%'},
            { 'fillStyle': '#08c7ba', 'text': '5% et lavage à pression'},
            { 'fillStyle': '#d9ff00', 'text': '15%'}
        ],
        'animation': {
            'type': 'spinToStop',  // Spin animation
            'duration': 5,         // Duration in seconds
            'spins': 8,            // Number of spins
            'callbackFinished': alertPrize  // Function when spinning ends
        },
        'outerRadius': 250,        // Set the outer radius
        'textFontSize': 18,        // Set text size
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
    let courrielCC = ""
    const postalCode = formData.codeP.toUpperCase();
    if (postalCode.includes("G3B")){
        courrielQE = courrielEsteban
        courrielCC = `${courrielJustine}, ${courrielCharles}`
    }
    else if (codesEsteban.some(code => postalCode.includes(code))){
        courrielQE = courrielEsteban
        courrielCC = courrielCharles
    }
    else if (codesJustine.some(code => postalCode.includes(code)))
        courrielQE = courrielJustine
    envoyerMailQE(courrielQE, courrielCC)
    if (formData.conf)
        envoyerMailClient()
    alert(`Félicitations ! Vous avez gagné ${offre} de rabais!`);
}

function envoyerMailQE(courrielQE, courrielCC) {
    emailjs.send("service_4q5ap02", "template_flr4wic", {
        nom_client: formData.name,
        prenom_client: formData.pren,
        tel_client: formData.tel,
        courriel_client: formData.courriel,
        courriel_qe: courrielQE,
        courriel_cc: courrielCC,
        offre_client: offre,
        type_travaux: formData.typeTravaux
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