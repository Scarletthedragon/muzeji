document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ main.js loaded!");

    let synth = window.speechSynthesis;
    let utterance = null;
    let isPaused = false; // Track pause state

    function loadVoices(callback) {
        let checkVoices = setInterval(() => {
            let voices = synth.getVoices().filter(v => v.lang === "en-US" || v.lang === "lv-LV");
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
            let selectedVoice = voices.find(v => v.lang === lang);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                console.log("✅ Using voice:", selectedVoice.name, "for", lang);
            } else {
                console.warn("⚠️ No matching voice found. Using default system voice.");
            }

            synth.speak(utterance);
        });

        // Reset pause state when new speech starts
        isPaused = false;
        pauseResumeButton.innerText = "⏸ Pause";
    }

    function togglePauseResume() {
        if (synth.speaking) {
            if (synth.paused) {
                synth.resume();
                console.log("▶️ Speech resumed.");
                pauseResumeButton.innerText = "⏸ Pause";
                isPaused = false;
            } else {
                synth.pause();
                console.log("⏸ Speech paused.");
                pauseResumeButton.innerText = "▶️ Resume";
                isPaused = true;
            }
        }
    }

    const speakButton = document.getElementById("speakButton");
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    const languageSelector = document.getElementById("languageSelector");

    if (speakButton && languageSelector) {
        speakButton.addEventListener("click", function () {
            let text = document.querySelector("h1").innerText + ". " + document.querySelector("p").innerText;
            let selectedLang = languageSelector.value;
            speakText(text, selectedLang);
        });
    }

    if (pauseResumeButton) {
        pauseResumeButton.addEventListener("click", togglePauseResume);
    }
});
