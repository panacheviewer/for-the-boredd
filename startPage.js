let currentCountdownDate = new Date("Feb 1, 2026 00:00:00").getTime();
let specialSub = document.getElementById("specialSub");

function time() {
    let todayDate = new Date().getTime();
    let timeDiff = currentCountdownDate - todayDate;
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    specialSub.textContent = "Available For: " + days + "d " + String(hours).padStart(2, "0") + "h " + String(minutes).padStart(2, "0") + "m " + String(seconds).padStart(2, "0") + "s";; 
}
time();

setInterval(time, 1000);
