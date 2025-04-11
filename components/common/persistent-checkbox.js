import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { LocalStorageElement } from '../base/local-storage-element.js';

class PersistentCheckbox extends LocalStorageElement {
  static properties = {
    ...LocalStorageElement.properties,
    checked: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }

    .toggle-container {
      position: relative;
      border: 2px solid rgba(35, 48, 65, 0.2);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      transition:
        transform 0.3s,
        box-shadow 0.3s;
      text-align: center;
      width: 100%;
      background: none;
      font-family: inherit;
      font-size: inherit;
    }

    .toggle-container:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      border-color: var(--jetlag-accent);
    }

    .checked {
      border-color: var(--jetlag-success);
      box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.3);
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.checked = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.storedValue !== null) {
      this.checked = this.storedValue === 'true';
    }
  }

  handleToggle() {
    this.checked = !this.checked;
    this.storedValue = this.checked;
  }

  render() {
    return html`
      <button
        class="toggle-container ${this.checked ? 'checked' : ''}"
        @click=${this.handleToggle}
        aria-pressed=${this.checked}
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('persistent-checkbox', PersistentCheckbox);
