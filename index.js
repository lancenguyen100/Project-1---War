// Define SUITS/VALUES in the global scope
// Reference back later for suits and values
// Will only use one time so use all CAPS for recognition
// 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 
// 9=9 10=10, J=11, Q=12, K=13, A=14
const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10","J", "Q", "K"]

// Deck functions for game usage
// Maybe not the best way to organize functions?
// Define the deck of cards
// Pass the cards into the constructor parameter
// Pass in freshDeck to show the cards and suits
// Make sure to call freshDeck using () or the array will not show up!!
class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    }
}

// 


// Define deck for individual card
// Suit and value for each card
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

// Function for fresh deck of cards
// Map will bring back arrays within arrays
// Use flatMap instead of map to condense the array of cards(MDN source)
// flatMap used on VALUES brings back the same result
const freshDeck = () => {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}

// Create a function that will help with not having to rewrite the index card legnth each time
const numberofCards = () => {
    return this.cards.length
}

// Shuffle function to randomize  cards
// Math.floor(Math.random()) will return random integer between 0 & 1
const shuffleCards = () => {
    for (let i = this.numberOfCards -1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = this.cards[newIndex]
        this.cards[newIndex] = this.cards[i]
        this.cards[i] = oldValue
        console.log(shuffleCards)
    }
}

const deck = new Deck()
console.log(deck.cards)





















restart.addEventListener("click", function (event) {
    location.reload()
    console.log("reload page!")
})

