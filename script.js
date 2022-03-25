const gameContainer = document.getElementById("game");
let card1, card2 = null;
let matchedCards = 0;
let blockClicks = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("faceDown");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  //if 2 cards are clicked or if the user clicks a card that is already clicked return
  if(blockClicks) return;
  if(event.target.classList.contains('faceUp')) return;
  
  //set first click as clicked card
  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  
  //set card1 and card2 accordingly
  if(!card1 || !card2){
    clickedCard.classList.add("faceUp");
    card1 = card1 || clickedCard;
    card2 = clickedCard === card1 ? null : clickedCard;
  }

  //compare the cards if both exist
  if(card1 && card2){
    //prevent user from clicking 3 or more cards
    blockClicks = true;
    //check for match
    if(card1.classList[0] === card2.classList[0]){
      matchedCards += 2;
      card1.removeEventListener('click',handleCardClick);
      card2.removeEventListener('click',handleCardClick);
      card1 = null;
      card2 = null;
      blockClicks = false;
    }else{
      setTimeout(function(){
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove('faceUp');
        card2.classList.remove('faceUp');
        card1 = null;
        card2 = null;
        blockClicks = false;
      },1000);
    }
    setTimeout(function(){
      if (matchedCards === COLORS.length) alert("Congrats! You won!");
      },1000);
      return;
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
