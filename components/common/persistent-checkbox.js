import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PersistentCheckbox extends LitElement {
  static properties = {
    id: { type: String, reflect: true },
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
      border-color: var(--jetlag-primary);
      box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.3);
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.checked = false;
  }

  get storageKey() {
    if (!this.id) {
      throw new Error('PersistentCheckbox requires an id attribute');
    }
    return `gameNotes_${this.id}`;
  }

  connectedCallback() {
    super.connectedCallback();
    const savedValue = localStorage.getItem(this.storageKey);
    if (savedValue !== null) {
      this.checked = savedValue === 'true';
    }
  }

  handleToggle() {
    this.checked = !this.checked;
    localStorage.setItem(this.storageKey, this.checked.toString());
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
