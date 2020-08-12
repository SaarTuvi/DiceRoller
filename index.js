let firstResult;
let secondResult;
var areDiceCreated = false;
var dotUnicode = "&#11044";
let btn = document.querySelector('#rollBtn')
let isTimeout = false;
let interval;
function rollDices() {
    //alert("DiceRolled");
    if (!areDiceCreated) {
        createDices();
    }
    else {
        clearDices();
    }
    btn.disabled = true;
    roll().then(differentResult).catch(sameResult);
}

function roll() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            clearInterval(interval);
            btn.disabled = false;
            if (firstResult != secondResult) {
                resolve([firstResult, secondResult]);
            }
            else {
                reject(firstResult);
            }
        }, 3000);
            interval= setInterval(() => {
                clearDices();
                firstResult = Math.floor(Math.random() * 6) + 1;
                secondResult = Math.floor(Math.random() * 6) + 1;
                populate('dice_0', firstResult);
                populate('dice_1', secondResult);
            }, 150);
    });
}
function differentResult(result){
    alert(`The Numbers Are Different! \r\n--Number 1 Is: ${result[0]}\r\n--Number 2 Is: ${result[1]}`)
}
function sameResult(result){
    alert(`The Numbers Are The Same! \r\n--Number Is: ${result}`)
    
}

function createDices() {
    createTables();
}

function createTables() {
    let dicesDiv = document.getElementById('dicesDiv');
    for (let tableIndex = 0; tableIndex < 2; tableIndex++) {
        let table = `<table id="dice_${tableIndex}" class="dice">`
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            let row = `<tr id="row_${rowIndex + 1}">`
            for (let cellIndex = 1; cellIndex <= 3; cellIndex++) {
                let cell = `<td id="cell_${rowIndex * 3 + cellIndex - 1}"></td>`
                row += cell;
            }
            row += "</tr>"
            table += row;
        }
        table += "</table>";
        dicesDiv.innerHTML += table;
    }
    areDiceCreated = true;
}

function populate(diceId, result) {
    let dice = document.getElementById(diceId)
    switch (result) {
        case 1:
            populateCell('#cell_4', dice);
            break;
        case 2:
            populateCell('#cell_1', dice);
            populateCell('#cell_7', dice);
            break;
        case 3:
            populateCell('#cell_2', dice);
            populateCell('#cell_4', dice);
            populateCell('#cell_6', dice);
            break;
        case 4:
            populateCell('#cell_0', dice);
            populateCell('#cell_2', dice);
            populateCell('#cell_6', dice)
            populateCell('#cell_8', dice);
            break;
        case 5:
            populateCell('#cell_0', dice);
            populateCell('#cell_2', dice);
            populateCell('#cell_4', dice);
            populateCell('#cell_6', dice);
            populateCell('#cell_8', dice);
            break;
        case 6:
            populateCell('#cell_0', dice);
            populateCell('#cell_2', dice);
            populateCell('#cell_3', dice);
            populateCell('#cell_5', dice);
            populateCell('#cell_6', dice);
            populateCell('#cell_8', dice);
            break;
    }
}

function populateCell(cellString, dice) {
    dice.querySelector(cellString).innerHTML = dotUnicode;
}

function clearDices() {
    for (let index = 0; index < 2; index++) {
        let dice = document.getElementById(`dice_${index}`)
        for (let index = 0; index < 9; index++) {
            dice.querySelector(`#cell_${index}`).innerHTML = "";
        }
    }
}
