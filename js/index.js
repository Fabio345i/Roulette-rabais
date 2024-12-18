"use strict"

const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const codePostal = document.getElementById("codePostal")
const confirmation = document.getElementById("chkbEmail");
const btnSoumettre = document.getElementById("btnSoumettre")

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexTelephone = /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,4}\)?[-.\s]?){1,5}\d{1,4}$/;
const regexCodePostal = /^[GHJ]\d[A-Za-z] \d[A-Za-z]\d$/;

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
    if (nom.value.trim() > 0){
        nom.classList.remove("is-invalid");
        document.getElementById("erreurNom").setAttribute("style", "display: none;");
        return true;
    }
    nom.classList.add("is-invalid");
    document.getElementById("erreurNom").setAttribute("style", "display: block;");
    return false;
}

function verifier_prenom(){
    if (prenom.value.trim() > 0){
        prenom.classList.remove("is-invalid");
        document.getElementById("erreurPrenom").setAttribute("style", "display: none;");
        return true;
    }
    prenom.classList.add("is-invalid");
    document.getElementById("erreurPrenom").setAttribute("style", "display: block;");
    return false;
}

function verifier_code_postal(){
    if (regexCodePostal.test(codePostal.value.trim())){
        codePostal.classList.remove("is-invalid");
        document.getElementById("erreurCodePostal").setAttribute("style", "display: none;");
        return true;
    }
    codePostal.classList.add("is-invalid");
    document.getElementById("erreurCodePostal").setAttribute("style", "display: block;");
    return false;
}

function verifier_confirmation_par_courriel(){
    if (confirmation.checked)
        return true;
    return false;
}

function authentifier(){
    let email_valide = verifier_email();
    let telephone_valide = verifier_telephone();
    let nom_valide = verifier_nom();
    let prenom_valide = verifier_prenom();
    let code_postal_valide = verifier_code_postal();
    let confirmation_par_courriel = verifier_confirmation_par_courriel();
    if (email_valide && telephone_valide && nom_valide && prenom_valide && code_postal_valide){
        if (confirmation_par_courriel){
            // TODO :
            // Code pour envoyer un courriel de confirmation
        }
        window.location.href = "../roue.html"
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