import { LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { PREFIX } from '../../game-pages.js';

/**
 * Base class for elements that need to persist data in localStorage
 * @extends LitElement
 */
export class LocalStorageElement extends LitElement {
  static properties = {
    id: { type: String, reflect: true },
    gameId: { type: String, reflect: true },
  };

  /**
   * Gets the storage key for this element
   * @returns {string} The storage key or null if gameId or id is missing
   * @throws {Error} If gameId or id is not set
   */
  get storageKey() {
    if (!this.gameId || !this.id) {
      throw new Error('LocalStorageElement: gameId and id are required attributes');
    }
    return `${PREFIX}${this.gameId}.${this.id}`;
  }

  /**
   * Gets the stored value from localStorage
   * @returns {string|null} The stored value or empty string if not found
   */
  get storedValue() {
    return localStorage.getItem(this.storageKey);
  }

  /**
   * Saves a value to localStorage
   * @param {string} value - The value to save
   */
  set storedValue(val) {
    localStorage.setItem(this.storageKey, val.toString());
  }
}
