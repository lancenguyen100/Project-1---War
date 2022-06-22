// Define SUITS/VALUES in the global scope
// Reference back later for suits and values
// Will only use one time so use all CAPS for recognition
// 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 
// 9=9 10=10, J=11, Q=12, K=13, A=14
const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10","J", "Q", "K"]


// Deck constructor for game usage
// Define the deck of cards
// Pass the cards into the constructor parameter
// Pass in newDeck to show the cards and suits
// Make sure to call newDeck using () or the array will not show up!!
class Deck {
    constructor(cards = newDeck()) {
        // Maybe start with an empty array
        this.cards = cards
    }

    // Create a function that will help with not having to rewrite the index card legnth each time
    // Getter method to access it in the for loop
get numberOfCards() {
    return this.cards.length
}

// Shuffle function to randomize  cards
// Math.floor(Math.random()) will return random integer between 0 & 1
shuffleCards() {
    for (let i = this.numberOfCards -1; i > 0; i--) {
        // Random index at before the current card
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = this.cards[newIndex]
        this.cards[newIndex] = this.cards[i]
        this.cards[i] = oldValue
        
    }
}

}

// Define for individual card
// Suit and value for each card
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
 }

// Define a getter method for reference
// Use for defining suit value
// Will reference back when grabing the "div"
get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red"
}

// Since getHTML is in a class, 
// We know it is already a function(no need for function key word)
getHTML() {
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
// FlatMap used on VALUES brings back the same result
const newDeck = () => {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })

}




// Check to see if the array of cards show up in the console
const deck1 = new Deck()
deck1.shuffleCards()
console.log(deck1.cards)





















// Restart button to restart game whenever
// restart.addEventListener("click", function (event) {
//     location.reload()
//     console.log("reload page!")
// })

