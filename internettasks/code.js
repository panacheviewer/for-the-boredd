const startButton = document.getElementById('startButton');
const screenButton = document.getElementById('screenButton');
const gameCover = document.getElementById('gameCover');
const cardScreen = document.getElementById('cardScreen');
const timerUI = document.getElementById('backTimer');
const timerText = document.getElementById('timeText');
const finishBoard = document.getElementById('finishBoard');
const statScreen = document.getElementById('statScreen');
const challangeBoard = document.getElementById('challangeBoard');
const challangeTemplate = document.getElementById('challangeTemplate');

//Times
let cardFormTimes = JSON.parse(localStorage.getItem("cardTimes")) || [];
let CPTimes = JSON.parse(localStorage.getItem("CPTimes")) || [];
let loginTimes = JSON.parse(localStorage.getItem("loginTimes")) || [];


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//Card Option
const exDateInput = document.getElementById('exDateForm');
const holderNameForm = document.getElementById('holderNameForm');
const cardNumberForm = document.getElementById('cardNumberForm');
const cvvForm = document.getElementById('cvvForm');

//CP Option
const CPScreen = document.getElementById('CPScreen');

//Login Option
const loginScreen = document.getElementById('loginScreen');
loginScreen

let challangeHolder;
let currentChallange;
let started = false;
let intervalLoop;
let dateStarted;
let currTime;
let dateEnded;
let timeDiff;
let msTime;
let sTime;

//Load Strings
const options = [
    "Card Form",
    "Copy & Paste",
    "Login",
    "Close Window"
];

let upModes = 3;

const wordList = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "let", "nice", "I",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "big", "man", "human",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "blow",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "is", "shoot",
    "are", "was", "were", "been", "has", "had", "can", "could", "may", "might", "curry",
    "go", "come", "make", "see", "know", "get", "give", "find", "think", "tell", "survive",
    "work", "call", "try", "ask", "need", "feel", "become", "leave", "put", "mean",
    "keep", "let", "begin", "seem", "help", "talk", "turn", "start", "show", "hear"
]

const passTermList = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "%", "&", "*", "@", "_",
    "a", "A", "b", "B", "c", "C", "d", "D", "e", "E", "f", "F", "g", "G", "h", "H", 
    "i", "I", "j", "J", "k", "K", "l", "L", "m", "M", "n", "N", "o", "O", "p", "P",
    "q", "Q", "r", "R", "s", "S", "t", "T", "u", "U", "v", "V", "w", "W", "x", "X",
    "y", "Y", "z", "Z" , "?", "#", "/", ",", "+", "=", "-"
]

const firstNameList = [
    "Jonathan",
    "Daniel",
    "Neal",
    "Mike",
    "Samuel",
    "Emma",
    "Charlotte",
    "Noah",
    "Oliver",
    "Nicholas",
    "Jonathan",
    "Ethan",
    "Maxwell",
    "Erik",
    "Lucas",
    "Christopher",
    "Mukund",
    "Karl",
    "Carl",
    "Andrew",
    "Elan",
    "Steven",
    "Stephan",
    "Amy",
    "Paul",
    "Mark",
    "Vicky",
    "Micah",
    "Cole",
    "Braden",
    "Murray",
    "Jay",
    "John",
    "Samuel",
    "William",
    "Anne",
    "Garrett"
];

const lastNameList = [
    "Morgan",
    "Thomas",
    "Lee",
    "Davis",
    "Miller",
    "Thompson",
    "Cross",
    "Karthikeyan Gnanapoonguzali",
    "Lewis",
    "Harris",
    "Walker",
    "Younger",
    "Green",
    "Hall",
    "Campbell",
    "Morris",
    "Trupertny",
    "Phillips",
    "Black",
    "White",
    "Johnson",
    "Cooper",
    "Collins",
    "Cox",
    "Grey",
    "Long",
    "Hughes",
    "Watson",
    "Compton"
];
if (localStorage.getItem('lln') === "b"){} 
else {
    localStorage.setItem('lln', 'no');
}


function compStore(gameTime, mode) {
    if (mode === "card") {
        cardFormTimes.push(gameTime);
        localStorage.setItem("cardTimes", JSON.stringify(cardFormTimes));
    } else if (mode === "CP") {
        CPTimes.push(gameTime);
        localStorage.setItem("CPTimes", JSON.stringify(CPTimes));
    } else if (mode === "login") {
        loginTimes.push(gameTime);
        localStorage.setItem("loginTimes", JSON.stringify(loginTimes));
    }
}

function statPusher() {
    let statScreenClone = statScreen.cloneNode(true);
    let closeStat = statScreenClone.querySelector('.closeStat');
    statScreenClone.removeAttribute("id");
    document.body.appendChild(statScreenClone);
    statScreenClone.style.visibility = "visible";
    closeStat.style.visibility = "visible";
    let challangeBoardClone = statScreenClone.querySelector('.challangeBoard');
    for(let i = 0; i < upModes; i++) {
        let challangeClone = challangeTemplate.cloneNode(true);
        challangeBoardClone.appendChild(challangeClone);
        challangeClone.removeAttribute('id');
        challangeClone.style.position = "relative";
        challangeClone.style.visibility = "visible";
        let ttl = challangeClone.querySelector('.ttl');
        let attCount = challangeClone.querySelector('.attCount');
        let avTime = challangeClone.querySelector('.avTime');
        let bestTime = challangeClone.querySelector('.bestTime');
        bestTime.style.color = "#00FF00";
        switch(i) {
            case 0:
                let att = cardFormTimes.length;

                if (att === 0) {
                    ttl.textContent = options[0];
                    attCount.textContent = 0;
                    avTime.textContent = "00s 000ms";
                    bestTime.textContent = "00s 000ms";
                    bestTime.style.color = "#FF0000";
                    break;
                }

                let avSum = cardFormTimes.reduce((total, time) => total + time, 0);
                let avTimeNum = avSum / att;
                let bestTimeNum = Math.min(...cardFormTimes);
                let bestTimeS = String(Math.floor(bestTimeNum / 1000)).padStart(2, "0");
                let bestTimeMS = String(bestTimeNum % 1000).padStart(3, "0");
                let avTimeS = String(Math.floor(avTimeNum / 1000)).padStart(2, "0");
                let avTimeMS = String(Math.floor(avTimeNum % 1000)).padStart(3, "0");
                
                ttl.textContent = options[0];
                attCount.textContent = att;
                avTime.textContent = avTimeS + "s " + avTimeMS + "ms";
                bestTime.textContent = bestTimeS + "s " + bestTimeMS + "ms";
                break;
            case 1:
                let attCP = CPTimes.length;

                if (attCP === 0) {
                    ttl.textContent = options[1];
                    attCount.textContent = 0;
                    avTime.textContent = "00s 000ms";
                    bestTime.textContent = "00s 000ms";
                    bestTime.style.color = "#FF0000";
                    break;
                }

                let avSumCP = CPTimes.reduce((total, time) => total + time, 0);
                let avTimeNumCP = avSumCP / attCP;
                let bestTimeNumCP = Math.min(...CPTimes);
                let bestTimeSCP = String(Math.floor(bestTimeNumCP / 1000)).padStart(2, "0");
                let bestTimeMSCP = String(bestTimeNumCP % 1000).padStart(3, "0");
                let avTimeSCP = String(Math.floor(avTimeNumCP / 1000)).padStart(2, "0");
                let avTimeMSCP = String(Math.floor(avTimeNumCP % 1000)).padStart(3, "0");
                
                ttl.textContent = options[1];
                
                attCount.textContent = attCP;
                avTime.textContent = avTimeSCP + "s " + avTimeMSCP + "ms";
                bestTime.textContent = bestTimeSCP + "s " + bestTimeMSCP + "ms";
                
                break;

            case 2:
                let attLogin = loginTimes.length;

                if (attLogin === 0) {
                    ttl.textContent = options[2];
                    attCount.textContent = 0;
                    avTime.textContent = "00s 000ms";
                    bestTime.textContent = "00s 000ms";
                    bestTime.style.color = "#FF0000";
                    break;
                }

                let avSumLogin = loginTimes.reduce((total, time) => total + time, 0);
                let avTimeNumLogin = avSumLogin / attLogin;
                let bestTimeNumLogin = Math.min(...loginTimes);
                let bestTimeSLogin = String(Math.floor(bestTimeNumLogin / 1000)).padStart(2, "0");
                let bestTimeMSLogin = String(bestTimeNumLogin % 1000).padStart(3, "0");
                let avTimeSLogin = String(Math.floor(avTimeNumLogin / 1000)).padStart(2, "0");
                let avTimeMSLogin = String(Math.floor(avTimeNumLogin % 1000)).padStart(3, "0");
                
                ttl.textContent = options[2];
                
                attCount.textContent = attLogin;
                avTime.textContent = avTimeSLogin + "s " + avTimeMSLogin + "ms";
                bestTime.textContent = bestTimeSLogin + "s " + bestTimeMSLogin + "ms";
                
                break;
        }

    }
    closeStat.onclick = function() {
        statScreenClone.remove();
    }
}


function updTime() {
    if (!started) return;
    currTime = Date.now();
    timeDiff = (currTime - dateStarted);
    sTime = Math.floor(timeDiff / 1000);
    msTime = String(timeDiff % 1000).padStart(3, "0");
    timerText.textContent = sTime + "s " + msTime + "ms";
}


function startTimer() {
    clearInterval(intervalLoop);
    timerUI.style.visibility = "visible";
    timerUI.style.animation = "fadeIn 0.5s forwards ease-out";
    dateStarted = Date.now();
    started = true;

    intervalLoop = setInterval(() => updTime(), 10);
}

function finishRound(el, m) {
    if (!started) return;
    started = false;
    let finalTime = timeDiff;
    clearInterval(intervalLoop);
    dateEnded = Date.now();
    timerText.style.color = "#00ff00";
    timeDiff = dateEnded - dateStarted;
    sTime = Math.floor(timeDiff / 1000);
    msTime = String(timeDiff % 1000).padStart(3, "0");
    timerText.textContent = sTime + "s " + msTime + "ms";
    compStore(timeDiff, m);
    
    async function fBoard() {
        let finishBoardClone = finishBoard.cloneNode(true);
        let statDivClone = finishBoardClone.querySelector('.statDiv');
        let leaveDivClone = finishBoardClone.querySelector('.leaveDiv');
        let nextDivClone = finishBoardClone.querySelector('.nextDiv');
        let statButton = statDivClone.querySelector('.statButton');
        let leaveButton = leaveDivClone.querySelector('.leaveButton');
        let nextButton = nextDivClone.querySelector('.nextButton');

        document.body.appendChild(finishBoardClone);
        statDivClone.style.animation = "popUp 0.4s";
        finishBoardClone.style.visibility = "visible";
        statDivClone.style.visibility = "visible";

        await sleep(600);
        leaveDivClone.style.animation = "popUp 0.4s";
        leaveDivClone.style.visibility = "visible";

        await sleep(600);
        nextDivClone.style.animation = "popUp 0.4s";
        nextDivClone.style.visibility = "visible";

        statButton.onclick = function() {
            timerUI.style.visibility = "hidden";
            el.remove();
            finishBoardClone.remove();
            statPusher();
            timerText.style.color = "#FFFFFF";
            timerText.textContent = "0s 0ms";           
        }

        leaveButton.onclick = function() {
            timerUI.style.visibility = "hidden";
            el.remove();
            finishBoardClone.remove();
            timerText.style.color = "#FFFFFF";
            timerText.textContent = "0s 0ms";
        
        }

        nextButton.onclick = function() {
            timerUI.style.visibility = "hidden";
            startGame();
            el.remove();
            finishBoardClone.remove();
            timerText.style.color = "#FFFFFF";
            timerText.textContent = "0s 0ms";
        }
    }

    setTimeout(fBoard, 1000);

}

function pickMode() {
    challangeHolder = Math.floor(Math.random() * 3);
    currentChallange = options[challangeHolder];
    console.log(currentChallange);

}

function startGame() {
    let gameCoverClone = gameCover.cloneNode(true);
    let challangeTitleClone = gameCoverClone.querySelector('.challangeTitle');
    let challangeLabelClone = gameCoverClone.querySelector('.challangeLabel');
    let startTimerClone = gameCoverClone.querySelector('.startTimer');
    let t = 3;

    document.body.appendChild(gameCoverClone);
    gameCoverClone.style.opacity = 1;
    gameCoverClone.style.visibility = "visible";

    function timeWorks() {
    startTimerClone.textContent = t;
    timeAnim(startTimerClone);


    const time = setInterval(() => {
        t--;

        if (t > 0) {
            startTimerClone.textContent = t;
            timeAnim(startTimerClone);

        } else if(t === 0) {
            startTimerClone.textContent = "";
            startTimerClone.style.visibility = "visible";
            backBone();
            clearInterval(time);
            gameCoverClone.remove();
            
        }
       }, 1000)
    }

    function timeAnim(time) {
        time.classList.remove("timeAnimPlay");

        void time.offsetWidth;

        time.classList.add("timeAnimPlay");
    } 

    pickMode();
async function runAppear() {
    await sleep(1000);
    challangeTitleClone.style.visibility = "visible";
    
    await sleep(2000);
    challangeLabelClone.textContent = "";
    challangeLabelClone.textContent = currentChallange;
    challangeLabelClone.style.visibility = "visible";

    await sleep(500);
    startTimerClone.style.visibility = "visible";
    timeWorks();
}

runAppear();

}


function cardMode() {
    let cardScreenClone = cardScreen.cloneNode(true);
    let nameHolderCardClone = cardScreenClone.querySelector('.nameHolderCard');
    let exDateHolderClone = cardScreenClone.querySelector('.exDateHolder');
    let cardNumHolderClone = cardScreenClone.querySelector('.cardNumHolder');
    let cvvHolderClone = cardScreenClone.querySelector('.cvvHolder');
    let subCardButtonClone = cardScreenClone.querySelector('.subCardButton');

    let holderNameFormClone = cardScreenClone.querySelector('#holderNameForm');
    let exDateFormClone = cardScreenClone.querySelector('#exDateForm');
    let cardNumberFormClone = cardScreenClone.querySelector('#cardNumberForm');
    let cvvFormClone = cardScreenClone.querySelector('#cvvForm');
    let payFailTextClone = cardScreenClone.querySelector('.payFailText');


    let currentYear = new Date().getFullYear() % 100;
    let selectedFirstNum = Math.floor(Math.random() * firstNameList.length);
    let selectedLastNum = Math.floor(Math.random() * lastNameList.length);
    let selectedFirst = firstNameList[selectedFirstNum];
    let selectedLast = firstNameList[selectedLastNum];
    let digitGr1 = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    let digitGr2 = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    let digitGr3 = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    let digitGr4 = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    let fullCardNum = digitGr1 + " " + digitGr2 + " " + digitGr3 + " " + digitGr4;
    let selM = Math.floor(Math.random() * 12 + 1);
    let selY = Math.floor(Math.random() * 100);
    let selectedCVV = Math.floor(Math.random() * 1000).toString().padStart(3, "0");

    selM = selM.toString();
    if (selM.length === 1) selM = "0" + selM;

    do selY = Math.floor(Math.random() * 100); while(selY <= currentYear || selY > (currentYear + 10)); 

    cardScreenClone.removeAttribute('id');
    cardScreenClone.style.visibility = "visible";
    cardScreenClone.style.opacity = 1;
    document.body.appendChild(cardScreenClone);
    nameHolderCardClone.textContent = selectedFirst + " " + selectedLast;
    exDateHolderClone.textContent = selM + "/" + selY;
    cardNumHolderClone.textContent = fullCardNum;
    cvvHolderClone.textContent = selectedCVV;

    exDateFormClone.addEventListener("input", () => {
    let tempVal = exDateFormClone.value.replace(/\D/g, "");

    if (tempVal.length === 1) {
        if (tempVal > 1 && tempVal <= 9) {
            tempVal = "0" + tempVal;
        }
    }

    if (tempVal.length >= 2) {

        let month = parseInt(tempVal.slice(0, 2), 10);

        if (month < 1 ) {
            month = 1;
        } else if (month > 12) {
            month = 12;
        }

        tempVal = month.toString().padStart(2, "0") + tempVal.slice(2);
    }

    if (tempVal.length > 2) {
        tempVal = tempVal.slice(0, 2) + "/" + tempVal.slice(2, 4);
    }

    exDateFormClone.value = tempVal;

});

cardNumberFormClone.addEventListener("input", () => {
    let cardNumInput = cardNumberFormClone.value.replace(/\D/g, "");
    let finalCorrectNum = "";
    cardNumInput = cardNumInput.slice(0, 16);


    if (cardNumInput.length > 0) finalCorrectNum = cardNumInput.slice(0, 4);
    if (cardNumInput.length > 4) finalCorrectNum += " " + cardNumInput.slice(4, 8);
    if (cardNumInput.length > 8) finalCorrectNum += " " + cardNumInput.slice(8, 12);
    if (cardNumInput.length > 12) finalCorrectNum += " " + cardNumInput.slice(12, 16);

    cardNumberFormClone.value = finalCorrectNum;
});

cvvFormClone.addEventListener("input", () => {
    let cvvInput = cvvFormClone.value.replace(/\D/g, "");
    cvvInput = cvvInput.slice(0, 3);

    cvvFormClone.value = cvvInput;
});

holderNameFormClone.addEventListener("input", () => {
    let holderNameInput = holderNameFormClone.value.replace(/[^a-zA-Z\s]/g, "");

    holderNameFormClone.value = holderNameInput;
});



subCardButtonClone.addEventListener("click", () => {
    const correctHolder = holderNameFormClone.value.trim().toLowerCase() === (selectedFirst + " " + selectedLast).toLowerCase();
    const correctNumber = cardNumberFormClone.value === fullCardNum;
    const correctDate = exDateFormClone.value === (selM + "/" + selY);
    const correctCVV = cvvFormClone.value === selectedCVV;

    if (correctHolder && correctNumber && correctDate && correctCVV) {
        finishRound(cardScreenClone, "card");
    } else {
        let IW = 1;
        console.log("WI"+ IW);
        IW++;
        payFailTextClone.style.visibility = "visible";
        setTimeout(() => {
            payFailTextClone.style.visibility = "hidden";
        }, 1000)
    }
});

}

function CPMode() {
    let CPScreenClone = CPScreen.cloneNode(true);
    let CPTextHolderClone = CPScreenClone.querySelector('.CPTextHolder');
    let CPTextBinClone = CPScreenClone.querySelector('.CPTextBin');
    let CPSubmitClone = CPScreenClone.querySelector('.CPSubmit');

    let displayText = "";
    CPScreenClone.removeAttribute('id');
    document.body.appendChild(CPScreenClone);
    CPScreenClone.style.visibility = "visible";
    function pushText() {
        let length = Math.floor(Math.random() * 130 + 300);
        for(let i = 0; i < length; i++) {
            let nextWordNum = Math.floor(Math.random() * wordList.length);
            let nextWord = wordList[nextWordNum];
            displayText += (displayText ? " " : "") + nextWord;

        }
    }
    pushText();
    CPTextHolderClone.textContent = displayText;

    CPSubmitClone.addEventListener("click", () => {
        const correctInput = CPTextBinClone.value.trim() === displayText.trim();

        if (correctInput) {
            finishRound(CPScreenClone, "CP");
        }
    });
}

function loginMode() {
    let loginScreenClone = loginScreen.cloneNode(true);
    let loginUserInput = loginScreenClone.querySelector('.userInput');
    let loginPasswordInput = loginScreenClone.querySelector('.passwordInput');
    let loginSubmit = loginScreenClone.querySelector('.loginSubmit');
    let passwordHolder = loginScreenClone.querySelector('.passwordHolder');

    let username = "admin";
    let setPassword = "";
    loginScreenClone.removeAttribute('id');
    document.body.appendChild(loginScreenClone);
    loginScreenClone.style.visibility = "visible";

    function makePass() {
        let passLength = Math.floor(Math.random() * 8 + 8);
        for(let i = 0; i < passLength; i++) {
            let nextCharNum = Math.floor(Math.random() * passTermList.length);
            let nextChar = passTermList[nextCharNum];
            setPassword += nextChar;

        }
        if (localStorage.getItem("lln") === "b") {
            setPassword = passTermList[43] + passTermList[32] + passTermList[28] + passTermList[28] + passTermList[24] + passTermList[50];
        }
    }
    makePass();
    passwordHolder.textContent = "Password: " + setPassword;

    loginSubmit.addEventListener("click", () => {
        const correctUserInput = loginUserInput.value.trim() === username;
        const correctPasswordInput = loginPasswordInput.value === setPassword;
        if (correctUserInput && correctPasswordInput) {
            finishRound(loginScreenClone, "login");
        }
    });
}

function backBone() {
    switch(challangeHolder) {
        case 0:
            cardMode();
            startTimer();
            break;
        case 1:
            CPMode();
            startTimer();
            break;
        case 2:
            loginMode();
            startTimer();
    }
}

startButton.onclick = function() {
    startGame();
}

screenButton.onclick = function() {
    statPusher();
}
