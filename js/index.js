"use strict"

const email = document.getElementById("email");
export const courriel = email
const telephone = document.getElementById("telephone");
export const tel = telephone
const nom = document.getElementById("nom");
export const name = nom
const prenom = document.getElementById("prenom");
export const pren = prenom
const codePostal = document.getElementById("codePostal")
export const codeP = codePostal
const confirmation = document.getElementById("chkbEmail");
export const conf = confirmation
const btnSoumettre = document.getElementById("btnSoumettre")
const typeTravaux = document.getElementById("travaux")
export const trav = typeTravaux
const codesValides = ["G0A", "G3B", "G2A", "G3E", "G3B", "G3C"]

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexTelephone = /^\d{3}-\d{3}-\d{4}$/;

function verifier_email(){
    if (regexEmail.test(email.value.trim())){
        email.classList.remove("is-invalid");
        document.getElementById("erreurEmail").setAttribute("style", "display: none;");
        return true;
    }
    email.classList.add("is-invalid");
    document.getElementById("erreurEmail").setAttribute("style", "display: block;");
    return false;
}

function verifier_telephone(){
    if (regexTelephone.test(telephone.value.trim())){
        telephone.classList.remove("is-invalid");
        document.getElementById("erreurTelephone").setAttribute("style", "display: none;");
        return true;
    }
    telephone.classList.add("is-invalid");
    document.getElementById("erreurTelephone").setAttribute("style", "display: block;");
    return false;
}

function verifier_nom(){
    if (nom.value.trim().length > 0){
        nom.classList.remove("is-invalid");
        document.getElementById("erreurNom").setAttribute("style", "display: none;");
        return true;
    }
    nom.classList.add("is-invalid");
    document.getElementById("erreurNom").setAttribute("style", "display: block;");
    return false;
}

function verifier_prenom(){
    if (prenom.value.trim().length > 0){
        prenom.classList.remove("is-invalid");
        document.getElementById("erreurPrenom").setAttribute("style", "display: none;");
        return true;
    }
    prenom.classList.add("is-invalid");
    document.getElementById("erreurPrenom").setAttribute("style", "display: block;");
    return false;
}

function verifier_code_postal() {
    const postalCode = codePostal.value.toUpperCase();
    if (codesValides.some(code => postalCode.includes(code))) {
        codePostal.classList.remove("is-invalid");
        document.getElementById("erreurCodePostal").setAttribute("style", "display: none;");
        return true;
    }
    alert("Désolé, mais ce service n'est pas disponible pour ce code postal. Veuillez vous référer au site de Qualité Étudiants pour connaître votre représentant.");
    codePostal.classList.add("is-invalid");
    document.getElementById("erreurCodePostal").setAttribute("style", "display: block;");
    return false;
}

function verifier_confirmation_par_courriel(){
    if (confirmation.checked)
        return true;
    return false;
}

function verifier_type_travaux(){
    if (typeTravaux.value.trim().length > 0){
        typeTravaux.classList.remove("is-invalid");
        document.getElementById("erreurTravaux").setAttribute("style", "display: none;");
        return true;
    }
    typeTravaux.classList.add("is-invalid");
    document.getElementById("erreurTravaux").setAttribute("style", "display: block;");
    return false;
}

function authentifier(){
    let email_valide = verifier_email();
    let telephone_valide = verifier_telephone();
    let nom_valide = verifier_nom();
    let prenom_valide = verifier_prenom();
    let code_postal_valide = verifier_code_postal();
    let travaux = verifier_type_travaux();
    let confirmation_par_courriel = verifier_confirmation_par_courriel();
    if (email_valide && telephone_valide && nom_valide && prenom_valide && code_postal_valide && travaux){
        console.log(confirmation.checked)
        console.log(typeTravaux.value)
        const params = new URLSearchParams({
            email: email.value,
            telephone: telephone.value,
            nom: nom.value,
            prenom: prenom.value,
            codePostal: codePostal.value,
            confirmation: confirmation.checked ? 'true' : 'false',
            typeTravaux: typeTravaux.value
        });
        window.location.href = `../roue.html?${params.toString()}`;
    }
    
}


function initialisation() {
    email.addEventListener("focusout", verifier_email);
    telephone.addEventListener("focusout", verifier_telephone);
    nom.addEventListener("focusout", verifier_nom);
    prenom.addEventListener("focusout", verifier_prenom);
    codePostal.addEventListener("focusout", verifier_code_postal);
    btnSoumettre.addEventListener("click", authentifier)
}

window.addEventListener("load", initialisation);