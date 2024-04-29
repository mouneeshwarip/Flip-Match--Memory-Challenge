//References to the buttons and other elements
const startgamebtn= document.getElementById('startgamebtn');
const playagainbtn=document.getElementById('playagainbtn');
const cardcontainer=document.querySelector('.card-container');
const cards=document.querySelectorAll('.card');
const endgamebtn=document.getElementById('endgamebtn');
let score=0;
let timer=0;
let isvolumeon=false; //default volume is set to off

//Functions to update score, timer and to turn the vol on
function updatescore{
      
}

function updatetimer{

}
function togglevol{
    isvolumeon=!isvolumeon;
    const volumeobutton=document.getElementById('vol-btn');
    volumeobutton.innerText=isvolumeon ? 'Turn-Off' : 'Turn-On';
}

function formatTime(seconds) {
    // Format the time as mm:ss
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


//Function to start the game
function startgame{

}

//Function to playagain
function playagain{

}

//Function to handle card-flipping
function handlecardclick{

}

//Function to end the game
function endgame{

}

//Event listener for startgame,endgame, playagain, cardflips and toggle vol
startgamebtn.addEventlistener('click',startgame);
endgamebtn.addEventListener('click',endgame);
cards.forEach(function(card){
    card.addEventListener('click',handlecardclick);
})
playagainbtn.addEventListener('click',playagain);
document.getElementById('vol-btn').addEventListener('click',togglevol);


