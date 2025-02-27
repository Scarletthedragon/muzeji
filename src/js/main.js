document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ main.js loaded!");

    let synth = window.speechSynthesis;
    let utterance = null;

    function loadVoices(callback) {
        let checkVoices = setInterval(() => {
            let voices = synth.getVoices();
            if (voices.length) {
                clearInterval(checkVoices);
                callback(voices);
            }
        }, 100);
    }

    function speakText(text, lang) {
        if (!synth) {
            console.error("❌ Text-to-Speech not supported.");
            return;
        }

        if (utterance) {
            synth.cancel(); // Stop previous speech
        }

        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;

        loadVoices(function (voices) {
            let selectedVoice = voices.find(v => v.lang.startsWith(lang));

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                console.log("✅ Using voice:", selectedVoice.name, "for", lang);
            } else {
                console.warn("⚠️ No matching voice found. Using default system voice.");
            }

            synth.speak(utterance);
        });
    }

    function pauseSpeech() {
        if (synth.speaking && !synth.paused) {
            synth.pause();
            console.log("⏸ Speech paused.");
        }
    }

    function resumeSpeech() {
        if (synth.paused) {
            synth.resume();
            console.log("▶️ Speech resumed.");
        }
    }

    function stopSpeech() {
        if (synth.speaking) {
            synth.cancel();
            console.log("⏹ Speech stopped.");
        }
    }

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

    if (pauseButton) pauseButton.addEventListener("click", pauseSpeech);
    if (resumeButton) resumeButton.addEventListener("click", resumeSpeech);
    if (stopButton) stopButton.addEventListener("click", stopSpeech);
});
