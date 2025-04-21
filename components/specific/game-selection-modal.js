import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class GameSelectionModal extends LitElement {
  static properties = {
    isOpen: { type: Boolean },
    selectedGameId: { state: true },
  };

  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }

    :host([isOpen]) {
      display: flex;
    }

    dialog {
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      min-width: 300px;
      max-width: 90%;
      width: 500px;
      position: relative;
    }

    dialog h2 {
      margin-top: 0;
      color: var(--jetlag-primary);
    }

    .game-list {
      max-height: 300px;
      overflow-y: auto;
      margin: 20px 0;
      border: 1px solid #eee;
      border-radius: 4px;
    }

    .game-item {
      padding: 10px 15px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      border-radius: 4px;
      margin: 2px;
    }

    .game-item:last-child {
      border-bottom: none;
    }

    .game-item:hover {
      background-color: #f5f5f5;
    }

    .game-item.selected {
      box-shadow: 0 0 15px 3px var(--jetlag-secondary);
      background-color: transparent;
      color: var(--jetlag-text);
      position: relative;
      margin: 0;
    }

    .game-actions {
      display: flex;
      gap: 10px;
    }

    .modal-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .modal-buttons button {
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition:
        background-color 0.3s ease,
        transform 0.2s;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .modal-buttons button:hover {
      transform: translateY(-2px);
    }

    .modal-buttons button[type='cancel'] {
      background-color: var(--jetlag-primary);
    }

    .modal-buttons button[type='cancel']:hover {
      background-color: var(--jetlag-danger);
    }

    .modal-buttons button[type='submit'] {
      background-color: var(--jetlag-secondary);
    }

    .modal-buttons button[type='submit']:hover {
      background-color: var(--jetlag-success);
    }

    @media (max-width: 768px) {
      dialog {
        width: 90%;
      }
      .modal-buttons {
        flex-direction: column;
      }

      .modal-buttons button {
        margin: 5px 0;
        width: 100%;
        max-width: none;
      }
    }

    .new-game-button {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .new-game-button button {
      width: 100%;
      padding: 10px;
      background-color: var(--jetlag-success);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition:
        background-color 0.3s ease,
        transform 0.2s;
    }

    .new-game-button button:hover {
      background-color: var(--jetlag-secondary);
      transform: translateY(-2px);
    }
  `;

  constructor() {
    super();
    this.isOpen = false;
    this.selectedGameId = '';
  }

  #handleGameSelect(gameId) {
    this.selectedGameId = gameId;
  }

  #handleClose() {
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('modal-closed', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  #handleSubmit() {
    if (this.selectedGameId) {
      this.dispatchEvent(
        new CustomEvent('game-selected', {
          detail: { gameId: this.selectedGameId },
          bubbles: true,
          composed: true,
        }),
      );
    }
    this.#handleClose();
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

  #handleNewGame() {
    this.dispatchEvent(
      new CustomEvent('new-game-clicked', {
        bubbles: true,
        composed: true,
      }),
    );
    this.#handleClose();
  }

  render() {
    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    return html`
      <dialog ?open=${this.isOpen}>
        <h2>Select Game</h2>
        <div class="game-list">
          <div class="new-game-button">
            <button type="submit" @click=${this.#handleNewGame}>New Game</button>
          </div>
          ${gamesList.map(
            (game) => html`
              <div
                class="game-item ${this.selectedGameId === game.id ? 'selected' : ''}"
                @click=${() => this.#handleGameSelect(game.id)}
              >
                <span>${game.name}</span>
                <div class="game-actions">
                  <delete-button .gameId=${game.id} @game-deleted=${this.#handleGameCleared}
                    >Delete</delete-button
                  >
                  <export-button .gameId=${game.id}>Export</export-button>
                </div>
              </div>
            `,
          )}
        </div>
        <div class="modal-buttons">
          <button type="cancel" @click=${this.#handleClose}>Cancel</button>
          <button type="submit" @click=${this.#handleSubmit}>Select Game</button>
        </div>
      </dialog>
    `;
  }
}

customElements.define('game-selection-modal', GameSelectionModal);
