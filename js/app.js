// Import components
import './components/game-tabs.js';
import './components/game-content.js';
import { GameDataService } from './services/game-data-service.js';

// Initialize the game data service
const gameDataService = new GameDataService();

// Set up event listeners for save/load buttons
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('save-button').addEventListener('click', () => {
    gameDataService.saveGameData();
    alert('Game data saved!');
  });

  document.getElementById('load-button').addEventListener('click', () => {
    gameDataService.loadGameData();
    alert('Game data loaded!');
  });
});
