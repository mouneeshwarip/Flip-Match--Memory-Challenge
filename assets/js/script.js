document.addEventListener('DOMContentLoaded', function(){
//References to the buttons and other dom elements
const startgamebtn= document.getElementById('startgamebtn');
const playagainbtn=document.getElementById('playagainbtn');
const cardcontainer=document.querySelector('.card-container');
const cards=document.querySelectorAll('.card');
const endgamebtn=document.getElementById('endgamebtn');
let score=0;
let timer=360; //timer set to 6 mins(6 mins * 60 secs)
let isvolumeon=false; //default volume is set to off
let gamestarted = false; // variable to track if the game has started

//Functions to update score, timer and to turn the vol on
function updatescore(){
      
}

function updatetimer(){
    const timerdisplay=document.getElementById('timer');
    timerdisplay.textContent=formatTime(timer);
}

function togglevol(){
    isvolumeon=!isvolumeon;
    const volumeonbutton=document.getElementById('vol-btn');
    volumeonbutton.innerText=isvolumeon ? 'Turn-Off' : 'Turn-On';
}

function formatTime(seconds) {
    // Format the time as mm:ss
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//Function to start the timer
function updatetimeinterval(){
    if (timer>0) {
          timer--;
          updatetimer();
    }
    else{
        //Game over when timer reaches 0
        clearInterval(intervalId);
        endgame();
    }
}

// Function to create and set the backside image for each card
function setBacksideImage(cardElement) {
    const backsideImage = document.createElement('img');
    backsideImage.src = 'assets/images/backside.jpg'; 
    backsideImage.alt = 'Football'; 
    backsideImage.classList.add('back'); // class for styling or CSS targeting
    // Append the backside image to the card element
    cardElement.appendChild(backsideImage);
}

// Loop through each card and set the backside image
cards.forEach(function(card) {
    setBacksideImage(card);
});

// Function to handle card clicks
function handlecardclick() {
    // Check if the game has started
    if (!gamestarted) {
        return; // If the game hasn't started, do nothing
    }
    this.classList.toggle('flipped');
    // Toggle back to backside after 6 seconds
    setTimeout(() => {
        this.classList.toggle('flipped');
    }, 2000);
}

// Function to start the game
function startgame() {
    // Enable click event listeners on the cards
    cards.forEach(function(card) {
        card.addEventListener('click', handlecardclick);
    });
    // to show the back side of the cards
    cards.forEach(function(card) {
        card.classList.remove('flipped');
    });
    // Start the timer
    intervalId = setInterval(updatetimeinterval, 1000);
    gamestarted = true; 
}

//Function to playagain
function playagain(){

}

//Function to end the game
function endgame(){

}

//Event listener for startgame,endgame, playagain, cardflips and toggle vol
startgamebtn.addEventListener('click',function(){
    startgame();
    startgamebtn.disabled = true; // Disable the start game button
});    
//endgamebtn.addEventListener('click',endgame);
//cards.forEach(function(card){
  //  card.addEventListener('click',handlecardclick);
//})
//playagainbtn.addEventListener('click',playagain);
//document.getElementById('vol-btn').addEventListener('click',togglevol);
});

