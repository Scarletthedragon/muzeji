document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ main.js loaded!");

    const speakButton = document.getElementById("speakButton");
    const pauseResumeButton = document.getElementById("pauseResumeButton");
    const languageSelector = document.getElementById("languageSelector");
    const audioPlayer = document.getElementById("audioPlayer");

    let isPaused = false;

    function playAudio(lang) {
        let audioSrc = "";
        if (lang === "en-US") {
            audioSrc = "../audio/en-US/welcome.mp3"; // Path to English audio file
        } else if (lang === "lv-LV") {
            audioSrc = "../audio/lv-LV/welcome.mp3"; // Path to Latvian audio file
        }

        if (audioSrc) {
            audioPlayer.src = audioSrc;
            audioPlayer.play();
            console.log("🔊 Playing audio:", audioSrc);
        } else {
            console.error("❌ No audio file found for the selected language.");
        }
    }

    function togglePauseResume() {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            console.log("⏸ Audio paused.");
            isPaused = true;
        } else {
            audioPlayer.play();
            console.log("▶️ Audio resumed.");
            isPaused = false;
        }
        updatePauseResumeButton();
    }

    function updatePauseResumeButton() {
        if (pauseResumeButton) {
            pauseResumeButton.innerText = isPaused ? "▶️ Resume" : "⏸ Pause";
        }
    }

    if (speakButton && languageSelector) {
        speakButton.addEventListener("click", function () {
            let selectedLang = languageSelector.value;
            playAudio(selectedLang);
        });
    }

    if (pauseResumeButton) {
        pauseResumeButton.addEventListener("click", togglePauseResume);
    }
});