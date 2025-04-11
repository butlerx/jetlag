import { LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class LocalStorageElement extends LitElement {
  static properties = {
    id: { type: String, reflect: true },
  };

  get storageKey() {
    if (!this.id) {
      throw new Error('LocalStorageElement requires an id attribute');
    }
    return `gameNotes.${this.id}`;
  }

  get storedValue() {
    return localStorage.getItem(this.storageKey);
  }

  set storedValue(val) {
    localStorage.setItem(this.storageKey, val.toString());
  }
}
