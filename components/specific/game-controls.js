import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { PREFIX } from '../../game-pages.js';

class GameControls extends LitElement {
  static properties = {
    selectedGameId: { state: true },
    gameDuration: { state: true },
    isSelectionModalOpen: { state: true },
  };

  static styles = css`
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

    .selected-game {
      font-weight: 600;
      color: var(--jetlag-primary);
    }

    @media (max-width: 768px) {
      .game-controls {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `;

  constructor() {
    super();
    this.selectedGameId = '';
    this.gameDuration = '';
    this.isSelectionModalOpen = false;
  }

  #handleGameSelect(gameId) {
    this.selectedGameId = gameId;
    this.dispatchEvent(
      new CustomEvent('game-selected', {
        detail: { gameId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  #handleSelectionModalClose() {
    this.isSelectionModalOpen = false;
  }

  #handleGameCleared(e) {
    this.dispatchEvent(
      new CustomEvent('game-deleted', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  #handleGameExport(e) {
    this.dispatchEvent(
      new CustomEvent('game-export', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  #handleNewGameClick() {
    this.dispatchEvent(
      new CustomEvent('new-game-clicked', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  #handleDurationInput(e) {
    const duration = e.target.value;
    this.gameDuration = duration;
    localStorage.setItem(`${PREFIX}${this.selectedGameId}.duration`, duration);
    this.dispatchEvent(
      new CustomEvent('duration-changed', {
        detail: { duration },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    const selectedGame = gamesList.find((game) => game.id === this.selectedGameId);
    return html`
      <div class="game-controls">
        <div>
          <label>Current Game:</label>
          <button @click=${() => (this.isSelectionModalOpen = true)}>
            ${selectedGame ? selectedGame.name : 'Select Game'}
          </button>
        </div>
        <div>
          <label for="game-duration">Game Duration:</label>
          <input
            id="game-duration"
            type="text"
            placeholder="e.g., 3h 15m"
            .value=${this.gameDuration}
            @input=${this.#handleDurationInput}
          />
        </div>
      </div>

      <game-selection-modal
        ?isOpen=${this.isSelectionModalOpen}
        .selectedGameId=${this.selectedGameId}
        @game-selected=${this.#handleGameSelect}
        @modal-closed=${this.#handleSelectionModalClose}
        @game-cleared=${this.#handleGameCleared}
        @game-export=${this.#handleGameExport}
      ></game-selection-modal>
    `;
  }
}

customElements.define('game-controls', GameControls);
