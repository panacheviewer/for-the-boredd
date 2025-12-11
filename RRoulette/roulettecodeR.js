// Elements in HTML
let statBoard = document.getElementById('statsBoard');
let currentBalance = document.getElementById('currentBalanceV');
let roundsWon = document.getElementById('roundsWonV');
let roundsLost = document.getElementById('roundsLostV');
let netProfit = document.getElementById('netProfitV');
let rouletteBoard = document.getElementById('rouletteBoard');

//Player Stats
let balance = Number(localStorage.getItem('balance1')) || 100;
let wins = localStorage.getItem('wins1') || 0;
let losses = localStorage.getItem('losses1') || 0;
let profit = balance - 100;

//Buttons
const numberButtons = document.querySelectorAll('#rowHolder button');
let betEven = document.getElementById('betEven');
let betOdd = document.getElementById('betOdd');
let bet18 = document.getElementById('bet18');
let bet36 = document.getElementById('bet36');
let betBlack = document.getElementById('blackSelected');
let betRed = document.getElementById('redSelected');
let betSection1 = document.getElementById('betSection1');
let betSection2 = document.getElementById('betSection2');
let betSection3 = document.getElementById('betSection3');
let rowSelect1 = document.getElementById('rowSelect1');
let rowSelect2 = document.getElementById('rowSelect2');
let rowSelect3 = document.getElementById('rowSelect3');

let oneZero = document.getElementById('oneZero');
let twoZero = document.getElementById('twoZero');

let gameOverText = document.getElementById('gameOverText');
let overStatus = document.getElementById('overStatus');
let finalGain = document.getElementById('finalGain');
let closePrompt = document.getElementById('closePrompt');

let add5 = document.getElementById('add5');
let add10 = document.getElementById('add10');
let add50 = document.getElementById('add50');
let add100 = document.getElementById('add100');
let add1000 = document.getElementById('add1000');
let clearButton = document.getElementById('clearButton');

//Bet System
let betButton = document.getElementById('betButton');

//Error
let errorText = document.getElementById('errorText');
let errorPopup = document.getElementById('errorPopup');

//Look Elements
let betTitle = document.getElementById('betTitle');
let betSet = document.getElementById('betSet'); 
let betNumber = document.getElementById('betNumber');
let rollSetter = document.getElementById('rollSetter');
let rollBox = document.getElementById('rollBox');
let mainCover = document.getElementById('mainCover'); 
let blurScreen = document.getElementById('blurScreen');

//Clone Chips 
let chip5 = document.getElementById('chip5');
let chip10 = document.getElementById('chip10');
let chip50 = document.getElementById('chip50');
let chip100 = document.getElementById('chip100');
let chip1000 = document.getElementById('chip1000');


//Sets
const numberHolder = ["0","00","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"];

const redHolder = ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"];
const blackHolder = ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"];
const evenHolder = ["2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36"];
const oddHolder = ["1","3","5","7","9","11","13","15","17","19","21","23","25","27","29","31","33","35"];
const bet18Holder = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"];
const bet36Holder = ["19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"];

const section1Holder = ["1","2","3","4","5","6","7","8","9","10","11","12"];
const section2Holder = ["13","14","15","16","17","18","19","20","21","22","23","24"];
const section3Holder = ["25","26","27","28","29","30","31","32","33","34","35","36"];

const row1Holder = ["3","6","9","12","15","18","21","24","27","30","33","36"];
const row2Holder = ["2","5","8","11","14","17","20","23","26","29","32","35"];
const row3Holder = ["1","4","7","10","13","16","19","22","25","28","31","34"];

//Game Function
let colourRolled;
let numberRolled;
let betAmount = 0;
let exitOut = false;
let winStat = false;
let payMultiple = 1;
let lossHolder = betAmount;
let addReady = true;

//Player Choice
let betHolder = '';
let errorCode = 0;
let winGain = betAmount;

//Settings
let settingButton = document.getElementById('settingButton');
let settingScreen = document.getElementById('settingScreen');
let cacheCheckbox = document.getElementById('cacheCheckbox'); 
let resetButton = document.getElementById('resetButton');
let settingClose = document.getElementById('settingClose');

let checked = JSON.parse(localStorage.getItem('checked1'));

if (checked === null) {
    checked = true;
}

cacheCheckbox.checked = checked;

//All-In
let allInReady = true;
let allInCoverBox = document.getElementById('allInCoverBox');
let allInCover = document.getElementById('allInCover');
let allInButton = document.getElementById('allInButton');
let allInSection = document.getElementById('allInSection');

//Repeat Functions
function statUpdate() {
    profit = balance - 100
    betNumber.textContent = "Your Bet: $" + betAmount;
    currentBalance.textContent = "$" + balance;
    roundsWon.textContent = wins;
    roundsLost.textContent = losses;
    netProfit.textContent = "$" + profit;
    localStorage.setItem('balance1', balance);
    localStorage.setItem('wins1', wins);
    localStorage.setItem('losses1', losses);
    cacheCheckbox.checked = checked;
}

function displayError() {
    let errorTextHolder = "Error";
    if(errorCode === 1) {
        errorTextHolder = "Bet Amount ~= 0";   
    } else if (errorCode === 2) {
        errorTextHolder = "You can't afford to bet $" + betAmount;
    } else if (errorCode === 3) {
        errorTextHolder = "You aren't betting on anything"
    }

    let newError = errorPopup.cloneNode(true);
    newError.style.visibility = 'visible';
    errorPopup.parentNode.appendChild(newError);
    newError.querySelector('#errorText').textContent = "Error: " + errorTextHolder + " (code " + errorCode + ")";
    
    setTimeout(() => {
         newError.remove();
    }, 3000);
}

function clickXHandler(click) {
    
}



function rollSets() {
    let forcedLossFound = false;
    
    while (!forcedLossFound) {
        
        numberRolled = Math.floor(Math.random() * 38);
        if (numberRolled == 37) numberRolled = "00";
        numberRolled = numberRolled.toString();

        if (redHolder.includes(numberRolled)) {
            colourRolled = "Red";
        } else if (numberRolled == 0 || numberRolled == "00") {
            colourRolled = "Green";
        } else {
            colourRolled = "Black";
        }

        let potentialWin = false;

        if (numberHolder.includes(betHolder)) {
            if (betHolder === numberRolled) potentialWin = true;
        } else if (betHolder === 'bet18') {
            if (bet18Holder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'bet36') {
            if (bet36Holder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'odd') {
            if (oddHolder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'even') {
            if (evenHolder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'black') {
            if (blackHolder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'red') {
            if (redHolder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'section1') {
            if (section1Holder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'section2') {
            if (section2Holder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'section3') {
            if (section3Holder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'row1') {
            if (row1Holder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'row2') {
            if (row2Holder.includes(numberRolled)) potentialWin = true;
        } else if (betHolder === 'row3') {
            if (row3Holder.includes(numberRolled)) potentialWin = true;
        }

        if (potentialWin === false) {
            forcedLossFound = true;
        }
    }
}    

function rollAnimation() {
     let rollBoxClone = rollBox.cloneNode(true);
    document.body.appendChild(rollBoxClone);

    let rollSetterClone = rollBoxClone.querySelector('.rollSetter2');
    let closePromptClone = rollBoxClone.querySelector('.closePrompt2');

    rollBoxClone.removeAttribute('id');
    rollSetterClone.removeAttribute('id');
    closePromptClone.removeAttribute('id');

    let reds = ["1","3","5","7","9","12","14","16","19","21","23","25","27","30","32","34","36"];
    let rollTime = 50000;
    let currentRole = 0;
    let finalResult = numberRolled;
    let currentColour = "Green";
    if(numberRolled === "00" || numberRolled === "0") {
        rollTime = 10000;
    } else {
        rollTime = Math.floor(Math.random() * 8000 + 3000)
    }

    mainCover.style.visibility = 'visible';

setTimeout(()=> {
    rollBoxClone.style.visibility = 'visible';
    rollBoxClone.style.animation = 'raiseSlight 1s  ease-out forwards';
}, 1000)
    let intervalRoller = setInterval(() => {
        currentRole = Math.floor(Math.random()*38);
        currentRole = currentRole.toString()
        if (currentRole == "37") {currentRole = "00"}
        if (reds.includes(currentRole)) currentColour = "Red";
        else if (currentRole == "0" || currentRole == "00") currentColour = "Green";
        else currentColour = "Black";

        rollSetterClone.style.animation = 'none';
        void rollSetterClone.offsetWidth;
        rollSetterClone.style.animation = 'slightPull 0.2s ease-out';

        if (currentColour === "Red") {
            rollSetterClone.style.backgroundColor = '#E0080B';
        } else if (currentColour === "Green") {
            rollSetterClone.style.backgroundColor = '#00ce4bff'
        } else if (currentColour === "Black") {
            rollSetterClone.style.backgroundColor = '#000000';
        }
        if (currentColour == "Green") {
            rollSetterClone.textContent = currentRole;
        } else {
            rollSetterClone.textContent = currentRole;
        }

    }, 100)

    setTimeout(() => {
        clearInterval(intervalRoller);

        if (colourRolled === "Red") {
            rollSetterClone.style.backgroundColor = '#E0080B';
        } else if (colourRolled === "Green") {
            rollSetterClone.style.backgroundColor = '#00ce4bff'
        } else if (colourRolled === "Black") {
            rollSetterClone.style.backgroundColor = '#000000';
        }

        const clickFunct = () => {
            winStat = false;
                if(numberHolder.includes(betHolder)) {
                    payMultiple = 35;
                    if(betHolder === numberRolled) {
                    winStat = true;
                } else {
                    winStat = false;
                }
                } else if(betHolder === 'bet18') {
                    payMultiple = 2;
                    if(bet18Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'bet36') {
                    payMultiple = 2;
                    if(bet36Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    } 
                } else if(betHolder === 'odd') {
                    payMultiple = 2;
                    if(oddHolder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'even') {
                    payMultiple = 2;
                    if(evenHolder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'black') {
                    payMultiple = 2;
                    if(blackHolder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'red') {
                    payMultiple = 2;
                    if(redHolder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'section1') {
                    payMultiple = 3;
                    if(section1Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'section2') {
                    payMultiple = 3;
                    if(section2Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'section3') {
                    payMultiple = 3;
                    if(section3Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'row1') {
                    payMultiple = 3;
                    if(row1Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'row2') {
                    payMultiple = 3;
                    if(row2Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                } else if(betHolder === 'row3') {
                    payMultiple = 3;
                    if(row3Holder.includes(numberRolled)) {
                        winStat = true;
                    } else {
                        winStat = false;
                    }
                }
            }

        rollSetterClone.style.animation = 'none';
        void rollSetterClone.offsetWidth;
        rollSetterClone.style.animation = 'slightPull 0.2s ease-out forwards';

        clickFunct();

            if (winStat === true) {
                winGain = lossHolder * payMultiple;
                balance = balance + winGain;
                wins++;
                statUpdate()
            } else {
                losses++;
            }
        rollSetterClone.textContent = finalResult;
        exitOut = true;
        closePromptClone.style.visibility = 'visible';
        closePromptClone.style.zIndex = 990;
        rollBoxClone.style.transform = 'translateX(-50%) scale(1.1)';
        rollBoxClone.style.boxShadow = '0 0 100px 100px rgba(243, 198, 32, 0.5)';

        const clickLogic = () => {
            if (exitOut === true) {

            document.removeEventListener('keydown', clickX);

            rollSetterClone.textContent = "";
            rollBoxClone.style.scale = 1;
            rollBoxClone.style.boxShadow = 'none';
            exitOut = false;
            closePromptClone.style.visibility = 'hidden';
            rollBoxClone.remove();
            setTimeout(() => {
                
                if (winStat === true) {
                winGain = lossHolder * payMultiple;
                winFunction()
                statUpdate()
            } else {
                looseFunction()
                statUpdate()
            }
            }, 100)

        } else {

        }
        };

        const clickX = (click) => {
            if(click.key === "x" || click.key === "X") {
            clickLogic();
    }
}

    closePromptClone.onclick = function() {
        if (exitOut === true) {
            clickLogic();
    }
    }
        document.addEventListener('keydown', clickX);
    }, rollTime)
}

function winFunction() {
    let gameOverTextClone = gameOverText.cloneNode(true);
    let overStatusClone = gameOverTextClone.querySelector('.overStatus');
    let finalGainClone = gameOverTextClone.querySelector('.finalGain');

    gameOverText.parentNode.appendChild(gameOverTextClone);
    gameOverTextClone.removeAttribute('id');
    overStatusClone.removeAttribute('id');
    finalGainClone.removeAttribute('id');

    gameOverTextClone.classList.add('gameOverText');
    overStatusClone.classList.add('overStatus');
    finalGainClone.classList.add('finalGain');


    overStatusClone.textContent = "Winner!";
    finalGainClone.style.color = '#22ff00';
    finalGainClone.textContent = "+$" + winGain;

    gameOverTextClone.style.animation = 'none';
    void gameOverTextClone.offsetWidth;

    overStatusClone.style.animation = 'none';
    void overStatusClone.offsetWidth;

    finalGainClone.style.animation = 'none';
    void finalGainClone.offsetWidth;

    gameOverTextClone.style.visibility = 'visible';
    gameOverTextClone.style.animation = 'slam 0.5s forwards';
    overStatusClone.style.animation = 'slamOverStatus 0.5s forwards';
    finalGainClone.style.animation = 'slamFinalGain 0.5s forwards'; 

    setTimeout (() => {
        gameOverTextClone.remove();
        mainCover.style.visibility = 'hidden';
    }, 2000);

}

function looseFunction() {
    let gameOverTextClone = gameOverText.cloneNode(true);
    let overStatusClone = gameOverTextClone.querySelector('.overStatus');
    let finalGainClone = gameOverTextClone.querySelector('.finalGain');

    gameOverText.parentNode.appendChild(gameOverTextClone);
    gameOverTextClone.removeAttribute('id');
    overStatusClone.removeAttribute('id');
    finalGainClone.removeAttribute('id');

    gameOverTextClone.classList.add('gameOverText');
    overStatusClone.classList.add('overStatus');
    finalGainClone.classList.add('finalGain');


    overStatusClone.textContent = "Looser!";
    finalGainClone.style.color = '#E0080B';
    finalGainClone.textContent = "-$" + lossHolder;
    statUpdate()

    gameOverTextClone.style.animation = 'none';
    void gameOverTextClone.offsetWidth;

    overStatusClone.style.animation = 'none';
    void overStatusClone.offsetWidth;

    finalGainClone.style.animation = 'none';
    void finalGainClone.offsetWidth;

    gameOverTextClone.style.visibility = 'visible';
    gameOverTextClone.style.animation = 'slam 0.5s forwards';
    overStatusClone.style.animation = 'slamOverStatus 0.5s forwards';
    finalGainClone.style.animation = 'slamFinalGain 0.5s forwards'; 

    setTimeout (() => {
        gameOverTextClone.remove();
        mainCover.style.visibility = 'hidden';
    }, 2000);

}



statUpdate()

betEven.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Even';
    betHolder = 'even';
}
betOdd.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Odd';
    betHolder = 'odd';
}
bet18.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Numbers 1 - 18';
    betHolder = 'bet18';
}

bet36.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Numbers 19 - 36';
    betHolder = 'bet36';
}

betRed.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Red';
    betHolder = 'red';
}

betBlack.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Black';
    betHolder = 'black';
}

betSection1.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Section 1';
    betHolder = 'section1';
}

betSection2.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Section 2';
    betHolder = 'section2';
}

betSection3.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Section 3';
    betHolder = 'section3';
}

rowSelect1.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Row 1';
    betHolder = 'row1';
}

rowSelect2.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Row 2';
    betHolder = 'row2';
}

rowSelect3.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = 'Row 3';
    betHolder = 'row3';
}

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const number = btn.id;
        const isRed = btn.classList.contains('red');
        betTitle.textContent = 'You are betting on:';
        betSet.textContent = `${number} (${isRed ? 'Red' : 'Black'})`;
        betHolder = number;
        betHolder = betHolder.toString();
    });
});

oneZero.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = '0';
    betHolder = '0';
}

twoZero.onclick = function() {
    betTitle.textContent = 'You are betting on:';
    betSet.textContent = '00';
    betHolder = '00';
}

betButton.onclick = function() {
    statUpdate()
    if(betAmount === 0) {
        errorCode = 1;
        displayError()
    } else if(betAmount > balance) {
        errorCode = 2;
        displayError()
    } else if(betHolder === '') {
        errorCode = 3;
        displayError()
    } else {
        winStat = false;
        lossHolder = betAmount;
        balance = balance - betAmount;
    if (addReady === false) {
        allInSection.style.animation = 'allCover2 1s forwards';
        addReady = true;
    }
        let placedChip = document.querySelectorAll('.placedChip');

        placedChip.forEach(chip =>{
        chip.remove();
        });

        errorCode = 0;
        betAmount = 0; 
        payMultiple = 1;
        statUpdate() 
        rollSets()
        rollAnimation()
    }
}

clearButton.onclick = function() {
    let placedChip = document.querySelectorAll('.placedChip');

    placedChip.forEach(chip =>{
        chip.remove();
    });

    betAmount = 0;
    statUpdate()
    if (addReady === false) {
        allInSection.style.animation = 'allCover2 1s forwards';
        addReady = true;
    }
    
    clearButton.style.animation = 'none';
    void clearButton.offsetWidth;
    clearButton.style.animation = 'pull 0.5s';

}

function restackChips(parentHolder) {
    const rChips = parentHolder.querySelectorAll('.placedChip');
    if (rChips.length === 0) {
        return;
    }

    rChips.forEach((chip, index) => {
        const reHeight = index + 1;
        chip.style.transform = `translateY(-${reHeight * 4}px)`;
        chip.style.zIndex = 10 + reHeight;
        if (index === rChips.length - 1) {
            chip.style.pointerEvents = 'auto'; 
        } else {
            chip.style.pointerEvents = 'none'; 
        }
    });
}


function addChips(cValue) {
    if(addReady === true) {
        const cloneElement = 'chip' + cValue;
        const cloneHolder = document.getElementById(cloneElement);
        const parentHolder = cloneHolder.parentNode;
        const oldTop = parentHolder.querySelector('.placedChip:last-child');

        if (oldTop) {
            oldTop.style.pointerEvents = 'none';
        }

        const cloneChip = cloneHolder.cloneNode(true);
        cloneChip.removeAttribute('id');
        cloneChip.classList.add(cloneElement);
        cloneChip.classList.add('chipGeneral');
        cloneChip.classList.add('placedChip');  

        let placedChipL = cloneHolder.parentNode.querySelectorAll('.placedChip').length;

        parentHolder.appendChild(cloneChip);
        mainCover.style.visibility = 'visible';
        cloneChip.style.visibility = 'visible';

    
        cloneChip.style.scale = 5;
        if (cValue >= 6) {
            cloneChip.style.zIndex = 4 + placedChipL;
        } if (cValue === 5) {
            cloneChip.style.zIndex = 5 + placedChipL;
        }
    

        cloneChip.style.transform = `translateY(-${(placedChipL + 1) * 4}px)`;

        cloneChip.style.animation = 'chipSmash 0.3s linear forwards';

        cloneChip.onclick = function() {
            betAmount -= cValue; 
            cloneChip.remove();
            statUpdate();
            restackChips(parentHolder);
        };
        cloneChip.style.pointerEvents = 'auto';

        setTimeout(() => {
            mainCover.style.visibility = 'hidden';
        }, 300);
        } else {

        }
}

add5.onclick = function() {
    if (addReady === true) {
        betAmount += 5;
        addChips(5);
        statUpdate();
    }
    
}
add10.onclick = function() {
    if (addReady === true) {
        betAmount += 10;
        addChips(10); 
        statUpdate();
    }
}
add50.onclick = function() {
    if (addReady === true) {
        betAmount += 50;
        addChips(50);
        statUpdate();
    }
}
add100.onclick = function() {
    if (addReady === true) {
        betAmount += 100;
        addChips(100);
        statUpdate();
    }
}
add1000.onclick = function() {
    if (addReady === true) {
        betAmount += 1000;
        addChips(1000);
        statUpdate();
    }
}

allInButton.onclick = function() {
    if (allInReady === true) {
        if (betAmount != balance) {
            allInReady = false;
            mainCover.style.visibility = 'visible';
            betAmount = balance;
            statUpdate()
            const placedChips = document.querySelectorAll('.placedChip');
            placedChips.forEach(chip => {
                chip.remove();
            });
            
            allInSection.style.animation = 'allCover 1s forwards';
            addReady = false;

            let allInCoverBoxClone = allInCoverBox.cloneNode(true);
            let allInCoverClone = allInCoverBoxClone.querySelector('#allInCover');
            allInCoverBox.appendChild(allInCoverBoxClone);

            allInCoverBoxClone.removeAttribute('id');
            allInCoverClone.removeAttribute('id');
            allInCoverBoxClone.classList.add('allInCoverBox');
            allInCoverClone.classList.add('allInCover');

            allInCoverBoxClone.style.visibility = 'visible';
            allInCoverClone.style.animation = 'textIncrease 5s ease-out';
            allInCoverBoxClone.style.animation = 'textIncreaseBox 5s ease-out';
    
            setTimeout (() => {
                allInCoverBoxClone.remove();
                allInReady = true;
                mainCover.style.visibility = 'hidden';
            }, 5000)
        }
    
    
    
    } else {

    }
}

settingButton.onclick = function() {
    settingScreen.style.visibility = 'visible';
    mainCover.style.visibility = 'visible';
    blurScreen.style.visibility = 'visible';
    blurScreen.style.opacity = 1;
    console.log('work');
}

settingClose.onclick = function() {
    settingScreen.style.visibility = 'hidden';
    mainCover.style.visibility = 'hidden';
    blurScreen.style.visibility = 'hidden';
    blurScreen.style.opacity = 0;
}

resetButton.onclick = function() {
    balance = 100;
    wins = 0;
    losses = 0;
    statUpdate()

}

cacheCheckbox.addEventListener('change', () => {
    checked = cacheCheckbox.checked;
    localStorage.setItem('checked1', checked)

    if (!checked) {
        localStorage.removeItem('balance');
        localStorage.removeItem('wins');
        localStorage.removeItem('losses');
    }
})
