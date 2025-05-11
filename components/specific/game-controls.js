/**
 * @fileoverview GameControls component for managing game selection and duration
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { PREFIX } from '../../game-pages.js';

/**
 * A custom element that provides controls for selecting games and setting game duration
 * @extends LitElement
 */
class GameControls extends LitElement {
  /**
   * @static
   * @type {Object}
   * @property {Object} gameId - The currently selected game ID
   * @property {Object} gameDuration - The duration of the current game
   * @property {Object} isSelectionModalOpen - Whether the game selection modal is open
   */
  static properties = {
    gameId: { state: true },
    gameDuration: { state: true },
    isSelectionModalOpen: { state: true },
  };

  /**
   * @static
   * @type {CSSResult}
   */
  static styles = css`
    .controls {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    label {
      font-weight: 600;
    }

    button {
      padding: 8px 16px;
      background: var(--jetlag-secondary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `;

  /**
   * Creates an instance of GameControls
   */
  constructor() {
    super();
    this.gameId = '';
    this.gameDuration = '';
    this.isSelectionModalOpen = false;
  }

  /**
   * Handles game selection from the modal
   * @private
   * @param {CustomEvent} e - The game selected event
   */
  #handleGameSelect = (e) => {
    this.gameId = e.detail.gameId;
    this.isSelectionModalOpen = false;
    this.dispatchEvent(
      new CustomEvent('game-selected', {
        detail: { gameId: this.gameId },
        bubbles: true,
        composed: true,
      }),
    );
  };

  /**
   * Handles changes to the game duration input
   * @private
   * @param {InputEvent} e - The input event
   */
  #handleDurationChange = (e) => {
    this.gameDuration = e.target.value;
    localStorage.setItem(`${PREFIX}${this.gameId}.duration`, this.gameDuration);
  };

  /**
   * Renders the game controls component
   * @returns {TemplateResult} The HTML template for the component
   */
  render() {
    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    const selectedGame = gamesList.find((game) => game.id === this.gameId);

    return html`
      <div class="controls">
        <div class="control-group">
          <label>Game:</label>
          <button @click=${() => (this.isSelectionModalOpen = true)}>
            ${selectedGame?.name || 'Select Game'}
          </button>
        </div>

        <div class="control-group">
          <label>Duration:</label>
          <input
            type="text"
            placeholder="e.g., 3h 15m"
            .value=${this.gameDuration}
            @input=${this.#handleDurationChange}
          />
        </div>
      </div>

      <game-selection-modal
        ?isOpen=${this.isSelectionModalOpen}
        .gameId=${this.gameId}
        @game-selected=${this.#handleGameSelect}
        @modal-closed=${() => (this.isSelectionModalOpen = false)}
      ></game-selection-modal>
    `;
  }
}

customElements.define('game-controls', GameControls);
