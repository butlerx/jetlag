import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

import './components/index.js';

class JetlagTheGame extends LitElement {
  static properties = {
    selectedGameId: { state: true },
    gameDuration: { state: true },
    isNewGameModalOpen: { state: true },
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

    dialog {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      min-width: 300px;
    }

    dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }

    dialog h2 {
      margin-top: 0;
      color: var(--jetlag-primary);
    }

    dialog form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    dialog input {
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    dialog .modal-buttons {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 15px;
    }

    dialog button {
      padding: 8px 15px;
      border-radius: 4px;
      cursor: pointer;
    }

    dialog button[type='submit'] {
      background-color: var(--jetlag-primary);
      color: white;
      border: none;
    }
    dialog button[type='submit']:hover {
      background-color: var(--jetlag-danger);
    }
    dialog button[type='button'] {
      background-color: #eee;
      border: 1px solid #ccc;
    }
    dialog button[type='button']:hover {
      background-color: #ddd;
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

      dialog {
        width: 80%;
      }
    }
  `;

  constructor() {
    super();
    this.selectedGameId = '';
    this.gameDuration = '';
    this.isNewGameModalOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Load games from localStorage
    const gamesList = localStorage.getItem('jetlag.games.list');
    if (gamesList) {
      const games = JSON.parse(gamesList);
      if (games.length > 0) {
        this.selectedGameId = games[0].id;
      } else {
        this.isNewGameModalOpen = true;
      }
    } else {
      this.isNewGameModalOpen = true;
    }
  }

  #handleGameSelected(e) {
    this.selectedGameId = e.detail.gameId;
  }

  #handleDurationChanged(e) {
    this.gameDuration = e.detail.duration;
  }

  #handleNewGameClicked() {
    this.isNewGameModalOpen = true;
  }

  #handleModalClosed() {
    this.isNewGameModalOpen = false;
    // If no game is selected after closing the modal, show it again
    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    if (!this.selectedGameId && gamesList.length === 0) {
      this.isNewGameModalOpen = true;
    }
  }

  #handleNewGameSubmitted(e) {
    this.selectedGameId = e.detail.gameId;
    this.isNewGameModalOpen = false;
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
    if (this.selectedGameId === gameId) {
      this.selectedGameId = updatedGamesList.length > 0 ? updatedGamesList[0].id : '';
      if (updatedGamesList.length === 0) {
        this.isNewGameModalOpen = true;
      }
    }
  }

  #handleGameExport(e) {
    const gameId = e.detail.gameId;
    // The export button component will handle the actual export
    const exportButton = this.shadowRoot.querySelector('export-button');
    if (exportButton) {
      exportButton.gameId = gameId;
      exportButton.click();
    }
  }

  render() {
    return html`
      <main>
        <game-header>Jet Lag: The Game - Hide + Seek</br>Investigation Book</game-header>

        <game-controls
          .selectedGameId=${this.selectedGameId}
          .gameDuration=${this.gameDuration}
          @game-selected=${this.#handleGameSelected}
          @duration-changed=${this.#handleDurationChanged}
          @new-game-clicked=${this.#handleNewGameClicked}
          @game-deleted=${this.#handleGameDeleted}
          @game-export=${this.#handleGameExport}
        ></game-controls>

        <game-content .gameId=${this.selectedGameId}></game-content>

        <new-game-modal
          ?isOpen=${this.isNewGameModalOpen}
          @modal-closed=${this.#handleModalClosed}
          @new-game-submitted=${this.#handleNewGameSubmitted}
        ></new-game-modal>
      </main>
    `;
  }
}

customElements.define('jetlag-the-game', JetlagTheGame);
