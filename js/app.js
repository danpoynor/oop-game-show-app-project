let game = new Game();

/**
 * Listen for <button> element clicks (start button and onscreen keyboard buttons)
 *
 * Branches code based on target elements id
 */
document.addEventListener('click', ev => {
  if (ev.target.tagName === 'BUTTON') {
    if (ev.target.id === 'btn-reset') {
      game.startGame();
    } else {
      game.handleInteraction(ev);
    }
  }
});

/**
 * Listen for keyboard key presses
 *
 * isKeyDown is used to prevent multiple keydown events firing if a key is held down
 */
let isKeyDown = false;
document.addEventListener('keydown', ev => {
  if (isKeyDown === false && !ev.altKey && !ev.ctrlKey && !ev.metaKey && /[a-zA-Z]/.test(ev.key) && ev.key.length === 1) {
    game.handleInteraction(ev);
    isKeyDown = true;
  }
});
document.addEventListener('keyup', () => {
  isKeyDown = false;
});
