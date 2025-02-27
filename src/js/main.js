document.addEventListener("DOMContentLoaded", function () {
    console.log("main.js loaded successfully!");

    // Text-to-Speech Function with Language Selection
    function speakText(text, lang) {
        if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang; // Set language dynamically
            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Text-to-Speech not supported in this browser.");
        }
    }

    // Handle Speak Button Click
    const speakButton = document.getElementById("speakButton");
    const languageSelector = document.getElementById("languageSelector");

    if (speakButton && languageSelector) {
        speakButton.addEventListener("click", function () {
            let text = document.querySelector("h1").innerText + ". " + document.querySelector("p").innerText;
            let selectedLang = languageSelector.value;
            speakText(text, selectedLang);
        });
    }
});
