document.addEventListener("DOMContentLoaded", function () {
    console.log("main.js loaded successfully!"); // Debugging

    const qrContainer = document.getElementById("qr");
    if (qrContainer) {
        let baseURL = window.location.origin + "/muzeji/src/pages/"; // GitHub Pages base URL
        let pageName = window.location.pathname.split("/").pop(); // Get the file name

        // Construct the full GitHub link
        let pageURL = baseURL + pageName;
        
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
