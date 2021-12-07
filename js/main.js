'use strict'

var gStart;
var gNums = [];
var countCorrect = 0;
var gIntervalId;
var gLevel = 4;

function init() {
    gNums = createArray(gLevel);
    gNums = shuffle(gNums);
    // console.log('gNums', gNums);
    renderTable();
}


function setLevel(level) {
    gLevel = level;
    init();
}

// return sore array with given lenth
function createArray(gLevel) {
    var nums = []
    for (var i = 0; i < gLevel ** 2; i++) {
        nums[i] = i + 1;
    }
    return nums;
}


function renderTable() {
    var str = `<tbody>`
    for (var i = 0; i < gLevel; i++) {
        str += `<tr>`;
        for (var j = 0; j < gLevel; j++) {
            var num = drawNum();
            str += `<td onclick = "cellClicked(this,${num})">${num}</td>`
        }
        str += `</tr>`
    }
    str += `</tbody>`
    console.log('str', str);

    var elTable = document.querySelector('.table');
    elTable.innerHTML = str;
}


function cellClicked(elTd, num) {
    if (num === 1) {
        timer();
        countCorrect++
        elTd.style.backgroundColor = 'rgb(135, 170, 170)';
    }
    if (num - countCorrect === 1) {
        countCorrect++
        victory();
        console.log('countCorrect', countCorrect);
        elTd.style.backgroundColor = 'rgb(135, 170, 170)';
    }
}


function victory() {
    if (countCorrect === gLevel ** 2) {
        clearInterval(gIntervalId);
    }
}

function timer() {
    gStart = Date.now();
    console.log('gStart', gStart);

    gIntervalId = setInterval(function () {
        var elTimer = document.querySelector('.timer')
        var miliSecs = Date.now() - gStart

        elTimer.innerText = ((miliSecs) / 1000).toFixed(3)
    }, 10)
}




function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        // randIdx = getRandomInt(0, items.length);
        randIdx = getRandomInt(0, i + 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}


function drawNum() {
    return gNums.pop()
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}