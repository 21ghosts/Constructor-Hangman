var Letter = require('./letter.js')

function Word(wrd) {
    this.word = wrd
    //collection of letter objects
    this.letters = []
    this.wordFound = false

    this.getLetters = () => {
        //populate the collection above with new Letter objects
        for (var i = 0; i < this.word.length; i++) {
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    }

    this.wordCheck = function () {
        if (this.letters.every((lttr) => {
            return lttr.appear === true;
        })) {
            this.wordFound = true;
            return true;
        }
    }

    this.letterCheck = (guessedLet) => {
        var whatToReturn = 0
        this.letters.forEach((lttr) => {
            if (lttr.letter === guessedLet) {
                lttr.appear = true
                whatToReturn++
            }
        })
        return whatToReturn
    }

    this.wordDisplay = () => {
        var display = ''
        this.letters.forEach(function (lttr) {
            var currentLetter = lttr.letterDisplay()
            display += currentLetter
        })
        return display
    }
}

module.exports = Word
