import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

/**
 * A modal component for creating new games
 * @extends LitElement
 */
class NewGameModal extends LitElement {
  static properties = {
    isOpen: { type: Boolean },
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
      z-index: 1000;
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
      position: relative;
      z-index: 1001;
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
      justify-content: space-between;
      gap: 10px;
      margin-top: 15px;
    }

    dialog button {
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition:
        background-color 0.3s ease,
        transform 0.2s;
      font-weight: 600;
    }

    dialog button:hover {
      transform: translateY(-2px);
    }

    dialog button[type='submit'] {
      background-color: var(--jetlag-secondary);
    }

    dialog button[type='submit']:hover {
      background-color: var(--jetlag-success);
    }

    dialog button[type='cancel'] {
      background-color: var(--jetlag-primary);
    }

    dialog button[type='cancel']:hover {
      background-color: var(--jetlag-danger);
    }

    dialog button[type='button']:disabled {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
      border: 1px solid #ddd;
    }

    @media (max-width: 768px) {
      dialog {
        width: 80%;
      }
    }
  `;

  constructor() {
    super();
    this.isOpen = false;
  }

  /**
   * Closes the modal and dispatches a 'modal-closed' event
   * @private
   */
  #handleClose() {
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('modal-closed', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Handles form submission for creating a new game
   * @param {Event} e - The form submission event
   * @private
   */
  #handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.gameName;
    const gameName = input.value.trim();

    if (gameName) {
      // Create new game and save to localStorage
      const gameHash = btoa(gameName);
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
      this.#handleClose();
    }
  }

  /**
   * Renders the modal component
   * @returns {TemplateResult} The HTML template for the modal
   */
  render() {
    return html`
      <dialog ?open=${this.isOpen}>
        <h2>Create New Game</h2>
        <form @submit=${this.#handleSubmit}>
          <label for="gameName">Game Name:</label>
          <input type="text" id="gameName" name="gameName" required />
          <div class="modal-buttons">
            <button type="cancel" @click=${this.#handleClose}>Cancel</button>
            <button type="submit">Create</button>
          </div>
        </form>
      </dialog>
    `;
  }
}

customElements.define('new-game-modal', NewGameModal);
