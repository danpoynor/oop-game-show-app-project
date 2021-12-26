/**
 * @class Phrase
 */
class Phrase {
  /**
   * @constructor
   * @param {string} phrase
   */
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  // This method adds letter placeholders to the gameboard
  addPhraseToDisplay() {
    // Split phrase into words then add each word to the
    // #phrase section as separate <ul> elements
    const words = this.phrase.split(' ');
    const phrase = document.getElementById('phrase');
    words.forEach(word => {
      const ul = document.createElement('ul');
      for (let i = 0; i < word.length; i++) {
        const li = document.createElement('li');
        li.className = 'hide letter';
        li.textContent = word[i];
        ul.appendChild(li);
      }
      phrase.appendChild(ul);
    });
  }

  /**
   * @method checkLetter - Checks to see if a letter is in the phrase
   * @param {string} letter
   * @returns boolean
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  // This method reveals the letter(s) on the gameboard that match the users selection
  showMatchedLetter(letter) {
    const letters = document.querySelectorAll('#phrase li');
    for (let i = 0; i < letters.length; i++) {
      if (letters[i].textContent === letter) {
        letters[i].className = 'show letter animate__animated animate__flipInY';
      }
    }
  }
}
