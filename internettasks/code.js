const startButton = document.getElementById('startButton1');
const gameCover = document.getElementById('gameCover');
const cardScreen = document.getElementById('cardScreen');
const timerUI = document.getElementById('backTimer');
const timerText = document.getElementById('timeText');
const finishBoard = document.getElementById('finishBoard');

//Times

let cardFormTimes = JSON.parse(localStorage.getItem("cardTimes")) || [];
let CPTimes = JSON.parse(localStorage.getItem("CPTimes")) || [];


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//Card Option
const exDateInput = document.getElementById('exDateForm');
const holderNameForm = document.getElementById('holderNameForm');
const cardNumberForm = document.getElementById('cardNumberForm');
const cvvForm = document.getElementById('cvvForm');

//CP Option
const CPScreen = document.getElementById('CPScreen');

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
const option1 = "Card Form";
const option2 = "Copy & Paste";
const option3 = "Login";
const option4 = "Close Window";

const wordList = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their", "is",
    "are", "was", "were", "been", "has", "had", "can", "could", "may", "might",
    "go", "come", "make", "see", "know", "get", "give", "find", "think", "tell",
    "work", "call", "try", "ask", "need", "feel", "become", "leave", "put", "mean",
    "keep", "let", "begin", "seem", "help", "talk", "turn", "start", "show", "hear"
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
    "Lucas",
    "Christopher",
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

function compStore(gameTime, mode) {
    if (mode === "card") {
        cardFormTimes.push(gameTime);
        localStorage.setItem("cardTimes", JSON.stringify(cardFormTimes));
    } else if (mode === "CP") {
        CPTimes.push(gameTime);
        localStorage.setItem("CPTimes", JSON.stringify(CPTimes));
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
    challangeHolder = Math.floor(Math.random() * 2 + 1);
    
    switch(challangeHolder) {
        case 1:
            currentChallange = option1;
            break;
        case 2:
            currentChallange = option2;
            break;
    }

    return 0;
}

function startGame() {
    let gameCoverClone = gameCover.cloneNode(true);
    let challangeTitleClone = gameCoverClone.querySelector('.challangeTitle');
    let challangeLabelClone = gameCoverClone.querySelector('.challangeLabel');
    let startTimerClone = gameCoverClone.querySelector('.startTimer');
    let t = 3;

    console.log({
  challangeTitleClone,
  challangeLabelClone,
  startTimerClone
});

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
    let selectedLast = lastNameList[selectedLastNum];
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

function backBone() {
    switch(challangeHolder) {
        case 1:
            startTimer();
            cardMode();
            break;
        case 2:
            CPMode();
            startTimer();
    }
}

startButton.onclick = function() {
    startGame();
}


