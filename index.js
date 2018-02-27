//Require necessary npm packages
var inquirer = require('inquirer');
var isLetter = require('is-letter');
//require objects/exports
var Word = require('./word.js');
var List = require('./list.js');

var wordBank = List.newWord.wordList
var guessesLeft = 10
//Empty Array. This will hold letters that have been guessed already.
var guessedLets = []
var display = 0
var currentWord

startGame();

function startGame() {
   
    console.log('Color Hangman!')
    


    if (guessedLets.length > 0) {
        guessedLets = []
    }
    inquirer.prompt([{
        name: "play",
        type: "confirm",
        message: "Wanna Play?"
    }]).then(function (answer) {
        if (answer.play) {
            newGame()
        } else {
            console.log("Oh...ok then");
        }
    })
}

function newGame() {
    if (guessesLeft === 10) {
        
        console.log("GO!")

        var randNum = Math.floor(Math.random() * wordBank.length);
        currentWord = new Word(wordBank[randNum]);
        currentWord.getLetters(); //initiat get letters function
        console.log(currentWord.wordDisplay());
        userPrompts();
    } else {
        resetguessesLeft();
        newGame();
    }
}

function resetguessesLeft() {
    guessesLeft = 10;
}
function userPrompts() {
    inquirer.prompt([{
        name: "chosenLetter",
        type: "input",
        message: "Choose a letter:",
        validate: function (value) {
            if (isLetter(value)) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (ltr) {
        var letterRet = (ltr.chosenLetter);
        var guessedAlready = false;
        for (var i = 0; i < guessedLets.length; i++) {
            if (letterRet === guessedLets[i]) {
                guessedAlready = true;
            }
        }

        if (guessedAlready === false) {
            guessedLets.push(letterRet);

            var found = currentWord.letterCheck(letterRet);

            if (found === 0) {
                console.log("Wrong!");
                guessesLeft--;
                display++;
                console.log("Guesses left: " + guessesLeft);
                

                console.log("\n**");
                console.log(currentWord.wordDisplay());
                console.log("\n**");

                console.log("Letters guessed: " + guessedLets);
            } else {
                console.log("You guessed correctly!");

                    if (currentWord.wordCheck() === true) {
                        console.log(currentWord.wordDisplay());
                        console.log("You won!");
                    } else {
                        console.log("Guesses remianing: " + guessesLeft);
                        console.log(currentWord.wordDisplay());
                        console.log("\n**");
                        console.log("Letters guessed: " + guessedLets);
                    }
                }
                if (guessesLeft > 0 && currentWord.wordFound === false) {
                    userPrompts();
                } else if (guessesLeft === 0) {
                    console.log("Game over!");
                    console.log("The word is: " + currentWord.word);
                }
            } else {
                console.log("Try again.");
                userPrompts();
            }
        })
}