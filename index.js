// Define variables for playerDeck and computerDeck
// Use let since playerDeck && computerDeck might change
let playerDeck 
let computerDeck 

// QuerySelect each of the classes below to call on once the game begins to function
// playerDeck && computerDeck has already been defined, define another variable below
const computerCardPosition = document.querySelector(".computer-card-position")
const playerCardPosition = document.querySelector(".player-card-position")
const computerDeckJS = document.querySelector(".computer-deck")
const playerDeckJS = document.querySelector(".player-deck")
const gameText = document.querySelector(".text")

// Define SUITS/VALUES in the global scope
// Reference back later for suits and values
// Will only use one time so use all CAPS for recognition
// Need to convert face value since they don't have a number
// 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 
// 9=9 10=10, J=11, Q=12, K=13, A=14
const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10","J", "Q", "K"]

// Deck class for game usage(similar to Canvas?)
// Define the deck of cards
// Pass the cards into the constructor parameter
// Pass in newDeck to show the cards and suits
// Make sure to call newDeck using () or the array will not show up!!
class Deck {
    constructor(cards = newDeck()) {
        // Maybe start with an empty array?
        this.cards = cards
    }
    // Create a getter method that will help with not having to rewrite 
    // the index card legnth each time
    // Getter method to access it in the for loop
    get numOfCards() {
        return this.cards.length
      }
        
// Shuffle function to randomize  cards
// Math.floor(Math.random()) will return random integer between 0 & 1
// The same way Tim declared function in a class in CanvasCrawler
shuffleCards = function () {
    for (let i = this.numOfCards -1; i > 0; i--) {
        // Random index at before the current card
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = this.cards[newIndex]
        this.cards[newIndex] = this.cards[i]
        this.cards[i] = oldValue
        }
    }

// Function for pushing the first card in the deck up
    popCard = function () {
        return this.cards.shift()
    }
// Function for pushing the winner card to the bottom of each deck
    pushCard = function (card) {
        this.cards.push(card)
    }

}

// Define for individual card
// Suit and value for each card
// Pass in the suit and value
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
}

// Define a getter method for color-coded suits
// Use for defining suit (red or black)
// Either spade || clover && heart || diamond
// Will reference back when grabing the "div"
get color() {
    // This works!! Maybe play around with if statement...
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red"
}

// The same way Tim declared function in a class in CanvasCrawler
getHTMLDiv = function () {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

// Function for fresh deck of cards
// Map will bring back arrays within arrays
// Use flatMap instead of map to condense the array of cards(MDN source)
// Map will return 4 different arrays of card
// FlatMap used on VALUES brings back the same result
const newDeck = () => {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}
// newDeck()




// Global variable
let duringRound = false
let gameOver
// Need to define a way to compare face-value cards since they do not have number value
// Let 2 = lowest && A = highest
const cardValueObject = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}
    

// Add an eventListener for flipping card each round
document.addEventListener("click", function(event) {
    if (gameOver) {
        beginGame()
        return
    }
    if (duringRound) {
        cleanUpRound()
    } else {
        turnOverCard()
    }
})

// Function for the start of the game
// Need to split the deck in half (26/26) before the game starts
// Math.ceil rounds number up to next largest integer(MDN)
// May not even need Math.ceil since deck is 52/2 = 26 (even number)
const beginGame = () => {
    // Check to see if the array of cards show up in the console
    const deck1 = new Deck()
    // console.log(deck1.cards)
    deck1.shuffleCards()

    const deckMiddlePoint = Math.ceil(deck1.numOfCards / 2)
    // From deck1 = new Deck
    // Need to split the deck in half for playerDeck && computerDeck
    // Splice did not work
    // Found slice on MDN, will split deck in half
    // Start from 0-deckMiddlePoint(first 26 cards)
    // deckMiddlePoint to deck1.numOfCards length(last 26 cards)
    playerDeck = new Deck(deck1.cards.slice(0, deckMiddlePoint))
    computerDeck = new Deck(deck1.cards.slice(deckMiddlePoint, deck1.numOfCards))
    duringRound = false
    gameOver = false
    // console.log(playerDeck)
    // console.log(computerDeck)

}
// Ensure to invoke beginGame function! I forget to do this a lot!
beginGame()

// Create a function for the default state of game
// How the game should be after each round game
const cleanUpRound = () => {
    duringRound = false
    computerCardPosition.innerText = ""
    playerCardPosition.innerText = ""
    gameText.innerText = ""
    // console.log(cleanUpRound)
}

const turnOverCard = () => {
    duringRound = true
    
    const playerCard = playerDeck.popCard()
    const computerCard = computerDeck.popCard()

    playerCardPosition.appendChild(playerCard.getHTMLDiv())
    computerCardPosition.appendChild(computerCard.getHTMLDiv())

    newDeckCount()

// Need to make conditional statements to decide winner of each round [if, else if, else]
// Start with player condition
// Then computer condition
// Do draw condition last
// Player round condition
    if (roundWon(playerCard, computerCard)) {
        gameText.innerText = "All I DO IS WIN!"
        playerDeck.pushCard(playerCard)
        playerDeck.pushCard(computerCard)
// Computer round condition
    } else if (roundWon(computerCard, playerCard)) {
        gameText.innerText = "LOSER LOSER DOUBLE LOSER!"
        computerDeck.pushCard(playerCard)
        computerDeck.pushCard(computerCard)
// Tie condition
    } else {
        gameText.innerText = "TIE! TRY AGAIN!"
        playerDeck.pushCard(playerCard)
        computerDeck.pushCard(computerCard)
    }
    if (checkGameWinner(playerDeck)) {
        gameText.innerText = "YOU HAVE BEEN DEFEATED!!!"
        gameOver = true
    } else if (checkGameWinner(computerDeck)) {
        Text.innerText = "YOU ARE THE CHAMPION!!!"
        gameOver = true
    }
}


// Function for updating the deck count as each round passes
const newDeckCount = () => {
    playerDeckJS.innerText = playerDeck.numOfCards
    computerDeckJS.innerText = computerDeck.numOfCards
}
// newDeckCount()


// Need a function to decide the winner of round
// Arrow function coming up as error in console?
const roundWon = (card1, card2) => {
    return cardValueObject[card1.value] > cardValueObject[card2.value]
    // console.log("is round won", roundWon)
}

// Need a function to checkGameWinner
// Deck needs to === 0
// If not game will keep going
const checkGameWinner = (deck) => {
    return deck.numOfCards === 0
}





// Deck reference
// computerCardPosition.appendChild(deck1.cards[0].getHTMLDiv())




// // Restart button to restart game whenever
// restart.addEventListener("click", function (event) {
//     location.reload()
//     console.log("reload page!")
// })

