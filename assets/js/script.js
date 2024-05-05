/*jshint esversion: 6 */

document.addEventListener('DOMContentLoaded', function(){
    //References to the buttons and other dom elements
    const startgamebtn= document.getElementById('startgamebtn');
    const playagainbtn=document.getElementById('playagainbtn');
    const cardcontainer=document.querySelector('.card-container');
    const cards=document.querySelectorAll('.card');
    const endgamebtn=document.getElementById('endgamebtn');
    const howToPlaybtn = document.getElementById('howToPlaybtn');
    const instructions = document.getElementById('instructions');
    let score=0;
    let timer=120; //setting initial timer to 2 mins(2 mins * 60 secs)
    let gamestarted = false; // variable to track if the game has started
    let flippedCards = []; // Array to store flipped cards
    let intervalId;
    
    //shuffling an array using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }

    // Converting NodeList to array
    const cardsArray = Array.from(cards);

    // Shuffling the array of cards
    shuffle(cardsArray);

    // Appending shuffled cards back to the card container
    cardsArray.forEach(card => {
        cardcontainer.appendChild(card);
    });

    //Functions to update score, timer 
    function updatescore() {
        const scoreDisplay = document.getElementById('score');
        scoreDisplay.textContent = score;
    }
    
    function updatetimer(){
        const timerdisplay=document.getElementById('timer');
        timerdisplay.textContent=formatTime(timer);
    }
    
    function formatTime(seconds) {
        // Formatting the time as mm:ss
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
        backsideImage.classList.add('back'); 
        cardElement.appendChild(backsideImage);
    }
    
    // Looping through each card and set the backside image
    cards.forEach(function(card) {
        setBacksideImage(card);
    });
    
    // Function to handle card clicks
    function handlecardclick(event) {
        // do nothing  if the game has not started
        if (!gamestarted) {
            return; 
        }
        // Flipping the clicked card
        event.currentTarget.classList.toggle('flipped');
         // Remove the event listener for this card
        event.currentTarget.removeEventListener('click', handlecardclick);
    
        // HTML content of the clicked card
        let cardContent = event.currentTarget.innerHTML;
    
        // Adding the HTML content of the clicked card to the array of flipped cards
        flippedCards.push({ element: event.currentTarget, content: cardContent });
    
        // Checking if two cards are flipped
        if (flippedCards.length === 2) {
            // Disabling further card clicks until the match is checked
            cards.forEach(function(card) {
                card.removeEventListener('click', handlecardclick);
            });
    
            // to get the contents of the two flipped cards
            let content1 = flippedCards[0].content;
            let content2 = flippedCards[1].content;
    
            // if the contents of the two flipped cards match
            if (content1 === content2) {
                //class to indicate that they should not flip back  if the cards match
                flippedCards.forEach(function(card) {
                    card.element.classList.add('matched');
                    // Re-enabling card clicks after flipping back
                    cards.forEach(function (card) {
                        if (!card.classList.contains('matched')) {
                            card.addEventListener('click', handlecardclick);
                        }
                    });
                    // Clearing the array of flipped cards
                     flippedCards = [];
                });
                score++;
                updatescore(); 

                //ending the game if the score is 10
                if (score === 10) {
                    endgame();
                }
            } 
            else {
                // flipping back the cards if the cards don't match
                setTimeout(() => {
                    flippedCards.forEach(function(card) {
                        card.element.classList.toggle('flipped');
                    });
    
                    // Re-enabling card clicks after flipping back
                    cards.forEach(function (card) {
                        if (!card.classList.contains('matched')) {
                            card.addEventListener('click', handlecardclick);
                        }
                    });
    
                    // Clearing the array of flipped cards
                    flippedCards = [];
                }, 1000); 
            }    
        }
    }
    
    // Function to start the game
    function startgame() {
        // Enabling click event listeners on the cards
        cards.forEach(function(card) {
            card.addEventListener('click', handlecardclick);
        });
        // to show the back side of the cards
        cards.forEach(function(card) {
            card.classList.remove('flipped');
        });
        endgamebtn.addEventListener('click', function(){
            endgame();
        });
        // Starting the timer
        intervalId = setInterval(updatetimeinterval, 1000);
        gamestarted = true; 
    }
    
    function playagain(){
        
        instructions.style.display = 'none';
        endgamebtn.style.display = 'none';
        howToPlaybtn.style.display = 'none';
        
    }
    
    //Function to end the game
    function endgame(){
        //Hiding the timer
        const timerDisplay = document.getElementById('timer');
        timerDisplay.style.display = 'none';

        cardcontainer.style.display = 'none';
        // Hiding the instructions
        const instructions = document.getElementById('instructions');
        instructions.style.display = 'none';
        // Showing the "Play Again" button
        playagainbtn.style.display = 'block';
        howToPlaybtn.style.display = "none";
        // Hiding the "End Game" button
        endgamebtn.style.display = 'none';
    
    }

    
    //Event listener for startgame,endgame, playagain, cardflips
    startgamebtn.addEventListener('click',function(){
        startgame();
        startgamebtn.style.display = 'none'; // Hide the start game button
    });    
    cards.forEach(function(card){
        card.addEventListener('click',handlecardclick);
    });
   
    howToPlaybtn.addEventListener('click', function() {
        instructions.classList.toggle('hidden');
    });

    endgamebtn.removeEventListener('click', function(){
        endgame();
    });
    playagainbtn.addEventListener('click', function(){
        // Reloading the page to go back to the start page
        location.reload();
        playagain();
    });

});

