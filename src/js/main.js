document.addEventListener("DOMContentLoaded", function () {
    console.log("main.js loaded successfully!");

    // QR Code Generation
    const qrContainer = document.getElementById("qr");
    if (qrContainer) {
        let baseURL = window.location.origin + "/muzeji/src/pages/";
        let pageName = window.location.pathname.split("/").pop();
        let pageURL = baseURL + pageName;

        console.log("Generating QR code for:", pageURL);

        new QRCode(qrContainer, {
            text: pageURL,
            width: 128,
            height: 128
        });
    } else {
        console.error("QR container NOT found!");
    }

    // Text-to-Speech Function
    function speakText(text) {
        if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US"; // Change language if needed
            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Text-to-Speech not supported in this browser.");
        }
    }

    // Button Click Event to Read Page Content
    const speakButton = document.getElementById("speakButton");
    if (speakButton) {
        speakButton.addEventListener("click", function () {
            let text = document.querySelector("h1").innerText + ". " + document.querySelector("p").innerText;
            speakText(text);
        });
    }
});
