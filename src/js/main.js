document.addEventListener("DOMContentLoaded", function () {
    const qrContainer = document.getElementById("qr");
    if (qrContainer) {
        new QRCode(qrContainer, {
            text: window.location.href,
            width: 128,
            height: 128
        });
    }
});

console.log("main.js loaded!");
