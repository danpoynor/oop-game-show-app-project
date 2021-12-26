# Phrase Hunter Game

Phrase Hunter is a browser-based, word guessing game that uses JavaScript and OOP (Object-Oriented Programming) to select a random, hidden phrase, which a player tries to guess, by clicking letters on an onscreen keyboard.

[W3C Markup Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fdanpoynor.github.io%2Foop-game-show-app-project%2F)<br>
[W3C CSS Validator](http://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fdanpoynor.github.io%2Foop-game-show-app-project%2Fcss%2Fstyles.css&profile=css3svg&usermedium=all&warning=1&vextwarning=)

Live Preview: [https://danpoynor.github.io/oop-game-show-app-project/](https://danpoynor.github.io/oop-game-show-app-project/)

---

## Screenshot

<details>
<summary>expand/collapse</summary>

![Screen Shot 2022-01-20 at 12 15 29 PM](https://user-images.githubusercontent.com/764270/150398404-97918613-f329-413e-b4af-b15087f768cf.png)

</details>

---

## Rules of the Game

<details>
<summary>expand/collapse</summary>

- The player&rsquo;s goal is to guess all the letters in a hidden, random phrase. At the beginning, the player only sees the number of letters and words in the phrase, - represented by blank boxes on the screen.
- The player clicks an onscreen keyboard to guess letters in the phrase.
- The letter is disabled on the onscreen keyboard and a player can&rsquo;t select that letter again.
- If the selected letter is in the phrase at least once, the letter and its position in the phrase is highlighted on screen. All instances of the letter are made visible - (so if there are 3 A&rsquo;s, all of the A&rsquo;s in the phrase appear at once).
- If the selected letter is not in the phrase, one of the player&rsquo;s hearts in the scoreboard is changed from a &ldquo;live&rdquo; heart to a "lost" heart.
- The player keeps choosing letters until they reveal all the letters in the phrase, or they make five incorrect guesses.

</details>

---

## Code Organization

<details>
<summary>expand/collapse</summary>

app.js

```javascript
const game = new Game()
document.addEventListener('click', (ev) => {})
document.addEventListener('keydown', (ev) => {})
document.addEventListener('keyup', ev => {})
```

Game.js

```javascript
class Game {
  constructor() {}
  getRandomPhrase() {}
  startGame() {}
  resetGame() {}
  gameOver(game) {}
  checkForWin() {}
  removeLife() {}
  handleInteraction(ev) {}
}
```

Phrase.js

```javascript
class Phrase {
  constructor(phrase) {}
  addPhraseToDisplay() {}
  checkLetter(letter) {}
  showMatchedLetter(letter) {}
}
```

</details>

---

## Feature Callouts

- Event listener added for physical keyboard events which updates the associated onscreen keyboard buttons.
- Phrase is spit into words and each word is added as a separate list to help prevent longer words breaking wrapping onto multiple lines.
- App styles have been personalized and changes have been noted below...

### CSS Style Changes

- Changed colors to be more vibrant and fun.
- Added a subtle inset box-shadow around background to add a little dramatic/theatrical visual effect.
- Used shorthand where possible, such as `padding: 20px 1px 0 1px` updated to `padding: 20px 1px 0`.
- Converted ID selectors to attribute selectors to avoid potential specificity wars.
- Updated color values to use modern notation, such as `rgba(0, 0, 0, 30%);` updated to `rgba(0 0 0 / 30%);`.
- Used shorthand color value where possible, such as `#ffffff` updated to `#fff`.
- Reordered CSS properties to be alphabetical to potentially improve Gzip or Brotli compression.
- Created a couple custom properties for values used more than once.
- Removed some duplicate properties in `.letter` and `.show`.
- To vertically center `.letter` and `.key` characters used `line-height` value that matches `font-size` value.
- For #overlay style, removed `top: 0`, `bottom: 0`, `left: 0`, and `right: 0` rules and used `inset: 0;` instead.
- Added `button:hover` `font-weight` animation to `variable font` in a couple places.

### HTML Changes

- Made "Phrase Hunter" the `<h1>` element and the "game over" message an `<h2>` element for possibly better semantics.
- Replaced the `<div id="overlay" class="start">` element in favor of using a `<header>` element and update its `position` and classes via JavaScript.
- Added `translate="no"` attribute to the HTML tag to prevent automatic translation systems (such as Google Translate) from translating page content (just in case).
- Changed font-family to `Nunito variable font` and added `preconnect` links to Google Fonts servers.
- Added `data-key` attribute to onscreen keyboard buttons so they are selectable via JavaScript without interfering with CSS classes.
- Removed `class="tries"` since it's unused.
- Replaced `<div class="section">` elements with actual `<section>` elements.
- Added `reversed` attribute to scoreboard list so items are counted down instead of up in screen readers.
- Combined styles for `#reset__button` and `.reset__button` since they apply to the same element.
- Removed `type="text/javascript"` from `<script>` tags since JavaScript is the default.
- Moved `<script>` tags inside the closing `<body>` tag to make the W3 HTML Validator happy.
- Added `<h2>` headline elements to each section to be compliant with W3 HTML Validation.
- Included some classes for animation.css to work.

## POTENTIAL TODOs

- Make UX/UI mobile friendly.
- Add more phrases to the game. Maybe use a data source.
- Improve Score area with better hearts and score counting.
- Add more help or descriptions text based on game status.
- Add more animations.
- Improve a11y.
- Add sound for audio feedback.
