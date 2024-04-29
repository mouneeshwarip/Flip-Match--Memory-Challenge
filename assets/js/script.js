//References to the buttons and other elements
const startgamebtn= document.getElementById('startgamebtn');
const playagainbtn=document.getElementById('playagainbtn');
const cardcontainer=document.querySelector('.card-container');
const cards=document.querySelectorAll('.card');
const endgamebtn=document.getElementById('endgamebtn');
let score=0;
let timer=360; //timer set to 6 mins(6 mins * 60 secs)
let isvolumeon=false; //default volume is set to off

//Functions to update score, timer and to turn the vol on
function updatescore{
      
}

function updatetimer{
    const timerdisplay=document.getElementById('timer');
    timerdisplay.textContent=formattimer(timer);
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
const intervalId=setInterval(updatetimeinterval,1000);

//Function to start the game
function startgame(){
    const images = [
        "davidraya.jpg",
        "haaland.jpg",
        "harrykane.jpg",
        "Kroos.jpg",
        "mbappe.jpg",
        "messi.jpeg",
        "neuer.jpg",
        "robertlew.jpg",
        "ronaldo.jpg",
        "xavi.jpg"
    ];

    // Shuffle the array
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }

    console.log("Shuffled cards:", images);

    // Clear the card container
    cardcontainer.innerHTML = "";

    // Append the shuffled cards to the card container
    images.forEach(image => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="assets/images/${image}" alt="Player">`;
        cardcontainer.appendChild(card);
    });
   
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


