document.addEventListener("DOMContentLoaded", function () {
    console.log("main.js loaded successfully!"); // Debugging

    const qrContainer = document.getElementById("qr");
    if (qrContainer) {
        let pageURL = ""; // Default empty

        // Check which page is open and set the correct URL
        if (window.location.pathname.includes("lapa,1.html")) {
            pageURL = "https://scarletthedragon.github.io/muzeji/src/pages/lapa,1.html";
        } else if (window.location.pathname.includes("lapa,2.html")) {
            pageURL = "https://scarletthedragon.github.io/muzeji/src/pages/lapa,2.html";
        } else {
            console.error("Unknown page: QR code might not work properly.");
            return; // Stop execution if page isn't recognized
        }

        console.log("Generating QR code for:", pageURL); // Debugging

        new QRCode(qrContainer, {
            text: pageURL,
            width: 128,
            height: 128
        });
    } else {
        console.error("QR container NOT found!");
    }
});
