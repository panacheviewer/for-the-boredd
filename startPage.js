const currentCountdownDate = new Date("Jan 28, 2026 09:20:00").getTime();
const specialSub = document.getElementById("specialSub");
const ITPlay = document.getElementById('ITPlay');
const devTag = document.getElementById('devTag');
let kp = localStorage.getItem('kp') || "false";


function time() {
    let todayDate = new Date().getTime();
    let timeDiff = currentCountdownDate - todayDate;
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    specialSub.textContent = "Available In: " + days + "d " + String(hours).padStart(2, "0") + "h " + String(minutes).padStart(2, "0") + "m " + String(seconds).padStart(2, "0") + "s";
}
time();

setInterval(time, 1000);

ITPlay.onclick = function() {
    if (kp === true) {
        kp = true;
        localStorage.setItem('kp', kp);
        window.location.href = './InternetTasks';
    } else {
        let pr;
        pr = window.prompt('Enter Early Access Code: ');
        if (pr === "00000000000001") {
            kp = "true";
            localStorage.setItem('kp', kp);
            window.location.href = './InternetTasks';
        } else {
            window.alert('Failed To Access');
        }

    }

}
if (kp === true) {
    devTag.style.visibility = "visible";
} else {
    devTag.style.visibility = "hidden";    
}
