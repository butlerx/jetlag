import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/**
 * A modal component for selecting or creating games
 * @extends LitElement
 */
class GameSelectionModal extends LitElement {
  static properties = {
    /** Whether the modal is open */
    isOpen: { type: Boolean, reflect: true },
    /** The currently selected game ID */
    gameId: { state: true },
    /** Whether to show the new game form */
    showNewGameForm: { state: true },
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
      padding: 10px 20px;
      background-color: var(--jetlag-secondary);
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
      background-color: var(--jetlag-success);
      transform: translateY(-2px);
    }

    .new-game-form {
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 4px;
      margin: 20px 0;
    }

    .new-game-form input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .new-game-form .form-buttons {
      display: flex;
      gap: 10px;
      justify-content: space-between;
    }

    .new-game-form button {
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

    .new-game-form button:hover {
      transform: translateY(-2px);
    }

    .new-game-form button[type='button'] {
      background-color: var(--jetlag-primary);
    }

    .new-game-form button[type='button']:hover {
      background-color: var(--jetlag-danger);
    }

    .new-game-form button[type='submit'] {
      background-color: var(--jetlag-secondary);
    }

    .new-game-form button[type='submit']:hover {
      background-color: var(--jetlag-success);
    }
  `;

  constructor() {
    super();
    this.showNewGameForm = false;
    this.gameId = '';
    this.isOpen = false;
  }

  /**
   * Handles game selection
   * @param {string} gameId - The ID of the selected game
   * @private
   */
  #handleGameSelect(gameId) {
    this.gameId = gameId;
  }

  /**
   * Closes the modal and dispatches the modal-closed event
   * @private
   */
  #handleClose() {
    this.isOpen = false;
    this.showNewGameForm = false;
    this.dispatchEvent(
      new CustomEvent('modal-closed', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Handles game selection submission and dispatches the game-selected event
   * @private
   */
  #handleSubmit() {
    if (this.gameId) {
      this.dispatchEvent(
        new CustomEvent('game-selected', {
          detail: { gameId: this.gameId },
          bubbles: true,
          composed: true,
        }),
      );
    }
    this.#handleClose();
  }

  /**
   * Handles game deletion and dispatches the game-deleted event
   * @param {CustomEvent} e - The game-deleted event
   * @private
   */
  #handleGameCleared(e) {
    this.dispatchEvent(
      new CustomEvent('game-deleted', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Shows the new game form
   * @private
   */
  #handleNewGameClick() {
    this.showNewGameForm = true;
  }

  /**
   * Handles new game creation
   * @param {Event} e - The form submission event
   * @private
   */
  #handleNewGameSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.gameName;
    const gameName = input.value.trim();

    if (gameName) {
      // Create new game and save to localStorage
      const newGameId = `game_${btoa(gameName)}_${Date.now()}`;
      const newGame = { id: newGameId, name: gameName };

      // Get existing games or initialize empty array
      const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
      const updatedGamesList = [...gamesList, newGame];

      // Save updated games list
      localStorage.setItem('jetlag.games.list', JSON.stringify(updatedGamesList));

      this.dispatchEvent(
        new CustomEvent('new-game-submitted', {
          detail: { gameId: newGameId },
          bubbles: true,
          composed: true,
        }),
      );
      input.value = '';
      this.showNewGameForm = false;
      this.#handleClose();
    }
  }

  /**
   * Renders the component
   * @returns {TemplateResult} The HTML template
   */
  render() {
    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    return html`
      <dialog ?open=${this.isOpen}>
        <h2>${this.showNewGameForm ? 'Create New Game' : 'Select Game'}</h2>
        ${this.showNewGameForm
          ? html`
              <form @submit=${this.#handleNewGameSubmit} class="new-game-form">
                <label for="gameName">Game Name:</label>
                <input type="text" id="gameName" name="gameName" required />
                <div class="form-buttons">
                  <button type="button" @click=${() => (this.showNewGameForm = false)}>
                    Cancel
                  </button>
                  <button type="submit">Create</button>
                </div>
              </form>
            `
          : html`
              <div class="game-list">
                <div class="new-game-button">
                  <button type="button" @click=${this.#handleNewGameClick}>New Game</button>
                </div>
                ${gamesList.map(
                  (game) => html`
                    <div
                      class="game-item ${this.gameId === game.id ? 'selected' : ''}"
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
            `}
      </dialog>
    `;
  }
}

customElements.define('game-selection-modal', GameSelectionModal);
