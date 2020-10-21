'use strict'

// 1. startbutton click -> create random + started (true) / count , score, started. 
// 2. timer & carrot_count = score
// 3. starbutton change (if started(ture) > stopGame(finish, stopTimer ...))

const CARROT_COUNT = 6;
const BUG_COUNT = 5;
const CARROT_SIZE = 80; 

let score = 0;
let started = false;

const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();
const startBtn = document.querySelector('.start__btn');
const icon=startBtn.querySelector('.fas');
const gameScore = document.querySelector('.game__score');
const popup = document.querySelector('.popup');
const popupRefresh = document.querySelector('.popup__refresh');
const popupMessage = document.querySelector('.pop__message');
const timer = document.querySelector('.game__timer');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');

const randomNumber = function(min,max){
    const ranNum = Math.floor(Math.random()*(max-min+1))+ min;
    return ranNum;
}

//위임

field.addEventListener('click', onClickEvent);

popupRefresh.addEventListener('click', onReStartGame);

startBtn.addEventListener('click',() => {
   startedClick();
   gameScoreAdd();
   gameTimer();   
   stopButton();
});

function onReStartGame(){
hidePopUp();
}


function changeButton(){    
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    
}

function startedClick(){
    if(started){
        started=false;
        playSound(alertSound);
    } else{
        CarrotAndBugAdd('carrot',CARROT_COUNT,'img/carrot.png');   
        CarrotAndBugAdd('bug',BUG_COUNT,'img/bug.png'); 
        changeButton();
        started = true;
        playSound(bgSound);
    }


}

function stopButton(){
    if(started === false){
        showPopup();
        timer.innerHTML = `0:0`;
        changePopupMessage('restart!');
        }
}

function gameScoreAdd(){
    gameScore.innerText = CARROT_COUNT;
}



function CarrotAndBugAdd(className, count, imgName){  

    
const x1 = 0;
const y1 = 0;
const x2 = fieldRect.width - CARROT_SIZE;
const y2 = fieldRect.height -CARROT_SIZE;

for(let i = 0; i <count; i++){
    const item = document.createElement('div');
    item.setAttribute('class',className);
    item.style.transform = `translate(${randomNumber(x1,x2)}px,${randomNumber(y1,y2)}px)`
    item.innerHTML= `<img src="${imgName}" alt="carrot">`       
    field.appendChild(item);  
}

}

function onClickEvent(event){
    const target = event.target;
    const targetParent = target.parentNode;
 
    if(targetParent.matches('.carrot')){
        targetParent.remove();
        score++;
        updateScoreBoard();
        playSound(carrotSound);
          if(CARROT_COUNT == score){
            showPopup();
              started = false;
              changePopupMessage('you won!!🎈');
              playSound(gameWinSound);
          }
    } else if(targetParent.matches('.bug')){
        showPopup();
        changePopupMessage('you lose... 💣');
        started = false;
        playSound(bugSound);
            }
 }

function playSound(sound){
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}

function showPopup(){
    popup.classList.add('on');
    stopSound(bgSound);
}

function changePopupMessage(text){
    popupMessage.innerText = text;
}


function hidePopUp(){
    popup.classList.remove('on');
    window.location.reload();
};

function gameTimer(){
    let time = 5;
    let min = "";
    let sec = "";

    let t = setInterval(function(){
        min = parseInt(time/60);
        sec = time%60;
    
        timer.innerHTML = `${min}:${sec}`;
        time--;

        if(started === false){
            clearInterval(t);
            timer.innerHTML = `0:0`;
        }

        if(time < 0){
            clearInterval(t);
            showPopup();
            changePopupMessage('you lose... 💣');
        }
    },1000);
}