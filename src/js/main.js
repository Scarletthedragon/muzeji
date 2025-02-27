document.addEventListener("DOMContentLoaded", function () {
    console.log("main.js loaded successfully!");

    let synth = window.speechSynthesis;
    let utterance = null;

    // Function to Ensure Voices are Loaded
    function loadVoices(callback) {
        let voices = synth.getVoices();
        if (voices.length) {
            callback(voices);
        } else {
            synth.onvoiceschanged = function () {
                callback(synth.getVoices());
            };
        }
    }

    // Function to Speak Text
    function speakText(text, lang) {
        if (!synth) {
            console.error("Text-to-Speech not supported.");
            return;
        }

        if (utterance) {
            synth.cancel(); // Stop previous speech
        }

        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;

        // Ensure voices are loaded before speaking
        loadVoices(function (voices) {
            let availableVoices = voices.filter(v => v.lang.startsWith(lang));
            if (availableVoices.length) {
                utterance.voice = availableVoices[0]; // Use the first matching voice
                console.log("Using voice:", utterance.voice.name);
            } else {
                console.warn("No specific voice found, using default system voice.");
            }
            synth.speak(utterance);
        });
    }

    // Button Click Event
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
