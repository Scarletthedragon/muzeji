document.addEventListener("DOMContentLoaded", function () {
    console.log("main.js loaded successfully!");

    let synth = window.speechSynthesis;
    let utterance = null; // Store the speech object

    // Function to Speak Text
    function speakText(text, lang) {
        if (!synth) {
            console.error("Text-to-Speech not supported in this browser.");
            return;
        }

        if (utterance) {
            synth.cancel(); // Stop previous speech if playing
        }

        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        synth.speak(utterance);
    }

    // Function to Pause Speech
    function pauseSpeech() {
        if (synth.speaking && !synth.paused) {
            synth.pause();
            console.log("Speech paused.");
        }
    }

    // Function to Resume Speech
    function resumeSpeech() {
        if (synth.paused) {
            synth.resume();
            console.log("Speech resumed.");
        }
    }

    // Function to Stop Speech
    function stopSpeech() {
        if (synth.speaking) {
            synth.cancel();
            console.log("Speech stopped.");
        }
    }

    // Button Click Event
    const speakButton = document.getElementById("speakButton");
    const pauseButton = document.getElementById("pauseButton");
    const resumeButton = document.getElementById("resumeButton");
    const stopButton = document.getElementById("stopButton");
    const languageSelector = document.getElementById("languageSelector");

    if (speakButton && languageSelector) {
        speakButton.addEventListener("click", function () {
            let text = document.querySelector("h1").innerText + ". " + document.querySelector("p").innerText;
            let selectedLang = languageSelector.value;
            speakText(text, selectedLang);
        });
    }

    // Pause, Resume, and Stop Buttons
    if (pauseButton) pauseButton.addEventListener("click", pauseSpeech);
    if (resumeButton) resumeButton.addEventListener("click", resumeSpeech);
    if (stopButton) stopButton.addEventListener("click", stopSpeech);
});
