import { css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ButtonElement } from '../base/button-element.js';
import { PREFIX } from '../../game-pages.js';

class DeleteButton extends ButtonElement {
  static properties = {
    ...ButtonElement.properties,
    gameId: { type: String },
    showConfirmation: { state: true },
  };

  static styles = [
    ButtonElement.styles,
    css`
      button {
        background-color: var(--jetlag-primary);
      }

      button:hover {
        background-color: var(--jetlag-danger);
      }

      .confirmation-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
      }

      .confirmation-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 90%;
      }

      .confirmation-content h3 {
        margin-top: 0;
        color: var(--jetlag-primary);
      }

      .confirmation-content p {
        color: var(--jetlag-text);
      }

      .confirmation-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }

      .confirmation-buttons button {
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
      }

      .confirmation-buttons button[type='button'] {
        background-color: var(--jetlag-secondary);
      }

      .confirmation-buttons button[type='submit'] {
        background-color: var(--jetlag-danger);
      }
    `,
  ];

  constructor() {
    super();
    this.showConfirmation = false;
  }

  handleClick() {
    if (!this.gameId) {
      throw new Error('DeleteButton: No gameId provided.');
    }
    this.showConfirmation = true;
  }

  #handleCancel() {
    this.showConfirmation = false;
  }

  #handleConfirm() {
    if (!this.gameId) {
      throw new Error('DeleteButton: No gameId provided.');
    }

    for (const key in localStorage) {
      if (key.startsWith(`${PREFIX}${this.gameId}.`)) {
        localStorage.removeItem(key);
      }
    }

    // Remove the game from the list
    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    const updatedGamesList = gamesList.filter((game) => game.id !== this.gameId);
    localStorage.setItem('jetlag.games.list', JSON.stringify(updatedGamesList));

    // Dispatch both events
    this.dispatchEvent(
      new CustomEvent('game-deleted', {
        detail: { gameId: this.gameId },
        bubbles: true,
        composed: true,
      }),
    );

    this.showConfirmation = false;
  }

  render() {
    return html`
      ${super.render()}
      ${this.showConfirmation
        ? html`
            <div class="confirmation-dialog">
              <div class="confirmation-content">
                <h3>Delete Game</h3>
                <p>Are you sure you want to delete this game? This action cannot be undone.</p>
                <div class="confirmation-buttons">
                  <button type="button" @click=${this.#handleCancel}>Cancel</button>
                  <button type="submit" @click=${this.#handleConfirm}>Delete</button>
                </div>
              </div>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('delete-button', DeleteButton);
