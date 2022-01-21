/**
 * @class Game
 * @classdesc The main game class.
 */
class Game {
  /**
   * @constructor
   * @param {string} missed - The HTML element that is used to display the number of missed guesses
   * @param {Array.<string>} phrases - Array of phrases that can be used in the game
   * @param {string} activePhrase - The active phrase that is being used by the game
   */
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase('Hello World'),
      new Phrase('I am a developer'),
      new Phrase('I am a ninja'),
      new Phrase('I am a programmer'),
      new Phrase('I am a ninja warrior')
    ];
    this.activePhrase = this.getRandomPhrase();
  }

  /**
   * Gets a random phrase from the phrases property
   * @return {string} Phrase string chosen to be the current phrase
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Initializes game
   */
  startGame() {
    this.header = document.getElementsByTagName('header')[0];
    this.startGameButton = document.getElementsByTagName('button')[0];
    this.keys = document.querySelectorAll('#qwerty button');
    this.hearts = document.querySelectorAll('#scoreboard img');
    this.maxGuesses = this.hearts.length;

    // Remove the game over message if it exists
    document.querySelector('header h2')?.remove();

    // Remove win/lose class from header if it exists
    this.header.removeAttribute('class');

    // Make header appear above game board
    this.header.style.position = 'relative';

    // Hide the start button
    this.startGameButton.style.display = 'none';

    // Add phrase to the game board
    this.activePhrase.addPhraseToDisplay();

    // Get all the letters in the added phrase
    this.letters = document.querySelectorAll('#phrase li');

    // Set game status so events can be disregarded after game ends
    this.isPlaying = true;
  }

  /**
   * Resets the game to its initial state
   */
  resetGame() {
    // Delete the game object and create a new one so getRandomPhrase() gets called again
    game = new Game();

    // Reset the header/overlay
    this.header.removeAttribute('style');

    // Reset the start button
    this.startGameButton.textContent = 'Play Again';
    this.startGameButton.removeAttribute('style');

    // Reset the missed count
    this.missed = 0;

    // Clear each word in the phrase from the board, but leave the h2 element
    for (const word of document.querySelectorAll('#phrase ul')) {
      word.remove();
    }

    // Reset the hearts
    this.hearts.forEach(heart => {
      heart.src = 'images/liveHeart.png';
    });

    // Reset the keyboard
    this.keys.forEach(key => {
      key.className = 'key';
      key.disabled = false;
    });
  }

  /**
   * Displays the start screen overlay (<header>), and styles it depending on the outcome of the game
   * @param {boolean} isWinner - Boolean value indicating whether the game has been won (true) or not (false)
   */
  gameOver(isWinner) {
    this.isPlaying = false;

    /**
     * Create <h2> element with a win or loss message and insert after <h1> element
     */
    const gameOverMessage = document.createElement('h2');
    if (isWinner) {
      gameOverMessage.textContent = 'You won!';
      this.header.className = 'win';
    } else {
      gameOverMessage.textContent = 'You lost!';
      this.header.className = 'lose';
    }
    document.getElementsByTagName('h1')[0].insertAdjacentElement('afterend', gameOverMessage);

    this.resetGame();
  }

  /**
   * Check to see if the player has revealed all the letters in the active phrase
   */
  checkForWin() {
    for (let i = 0; i < this.letters.length; i++) {
      if (this.letters[i].className !== 'show letter animate__animated animate__flipInY') {
        return false;
      }
    }
    return true;
  }

  /**
   * Removes a life from the scoreboard
   *
   * This method removes a life from the scoreboard, by replacing one of the `liveHeart.png` images with a `lostHeart.png` image and increments the missed property. If the player has five missed guesses (i.e. they're out of lives), then end the game by calling the gameOver() method
   */
  removeLife() {
    this.hearts[this.missed].src = 'images/lostHeart.png';
    this.missed++;
    if (this.missed === this.maxGuesses) {
      this.gameOver(false);
    }
  }

  /**
   * This method checks accepts an event and checks if it was a button click or keyboard character typed by the player
   * Then directs the game based on a correct or incorrect guess
   * @param {object} ev Event object
   */
  handleInteraction(ev) {
    if (this.isPlaying) {
      let target = null;
      let char = '';

      /**
       * Test if ev is a button click or keyboard press
       */
      if (ev.type === 'click') {
        target = ev.target;
        char = target.textContent;
      } else if (ev.type === 'keydown') {
        /**
         * Event type is keydown
         * Target the onscreen keyboard button representing the pressed key
         */
        target = document.querySelector(`button[data-key="${ev.key}"]`);
        char = ev.key;
      }

      if (target) {
        target.disabled = true;

        /**
         * Check if the pressed key is a letter in the phrase
         */
        if (this.activePhrase.checkLetter(char)) {
          /**
           * The pressed key is a letter in the phrase
           *
           * Show the letter on the board
           * Check if the player has won
           */
          target.classList.add('chosen');
          this.activePhrase.showMatchedLetter(char);

          if (this.checkForWin()) {
            this.gameOver(true);
          }
        } else {
          /**
           * The pressed key is not a letter in the phrase
           *
           * In case a pressed keyboard key was previously selected,
           * don't remove a life again from the scoreboard
           */
          if (target && !target.classList.contains('wrong')) {
            target.classList.add('wrong');
            this.removeLife();
          }
        }
      }
    }
  }
}
