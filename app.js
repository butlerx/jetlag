import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

import './components/index.js';

class JetlagTheGame extends LitElement {
  static properties = {
    gameId: { state: true, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
    }
    main {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin: 0 auto;
      max-width: 800px;
      padding: 20px;
      transition:
        transform 0.3s,
        box-shadow 0.3s;
    }

    main:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .game-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 15px;
      flex-wrap: wrap;
    }

    .game-controls label {
      margin-right: 5px;
      font-weight: 600;
      color: var(--jetlag-text);
    }

    .game-controls select,
    .game-controls input,
    .game-controls button {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: inherit;
      font-size: 1em;
    }
    .game-controls button {
      background-color: var(--jetlag-secondary);
      color: white;
      cursor: pointer;
      border: none;
    }
    .game-controls button:hover {
      background-color: #2980b9;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      main {
        padding: 15px;
      }

      .game-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .buttons {
        align-items: stretch;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
      }
    }
  `;

  constructor() {
    super();
    this.gameId = '';
  }

  #handleGameSelected(e) {
    this.gameId = e.detail.gameId;
  }

  #handleGameDeleted(e) {
    const gameId = e.detail.gameId;
    // Clear all game data from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`${gameId}.`)) {
        localStorage.removeItem(key);
      }
    }

    // Remove the game from the list
    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    const updatedGamesList = gamesList.filter((game) => game.id !== gameId);
    localStorage.setItem('jetlag.games.list', JSON.stringify(updatedGamesList));

    // Update the selected game
    if (this.gameId === gameId) {
      this.gameId = updatedGamesList.length > 0 ? updatedGamesList[0].id : '';
    }
  }

  #handleNewGameSubmitted(e) {
    this.gameId = e.detail.gameId;
  }

  render() {
    return html`
      <main>
        <game-header>Jet Lag: The Game - Hide + Seek</br>Investigation Book</game-header>

        <game-controls
          .gameId=${this.gameId}
          @game-selected=${this.#handleGameSelected}
          @game-deleted=${this.#handleGameDeleted}
          @new-game-submitted=${this.#handleNewGameSubmitted}
        ></game-controls>

        <game-content .gameId=${this.gameId}></game-content>
      </main>
    `;
  }
}

customElements.define('jetlag-the-game', JetlagTheGame);
