import './components/game-tabs.js';
import './components/game-content.js';

const clearButton = document.getElementById('clearStorage');

clearButton.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});
