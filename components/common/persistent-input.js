import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PersistentInput extends LitElement {
  static properties = {
    id: { type: String, reflect: true },
    value: { type: String },
  };

  static styles = css`
    .item-row {
      align-items: center;
      display: flex;
      margin-bottom: 10px;
      padding: 5px;
      transition: background-color 0.2s ease;
    }

    .item-row:hover {
      background-color: rgba(52, 152, 219, 0.05);
      border-radius: 6px;
    }

    label {
      color: var(--jetlag-dark);
      font-size: 0.9em;
      font-weight: 600;
      letter-spacing: 0.5px;
      padding: 8px 10px;
      text-align: center;
      width: 40%;
      background-color: white;
      border: 2px solid var(--jetlag-secondary);
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-right: 10px;
    }

    input {
      width: 60%;
    }

    input[type='text'] {
      border-radius: 4px;
      border: 2px solid rgba(52, 152, 219, 0.3);
      color: var(--jetlag-text);
      padding: 8px 10px;
      transition: all 0.3s ease;
      width: 100%;
    }

    input[type='text']:hover {
      border-color: var(--jetlag-secondary);
    }

    input[type='text']:focus {
      border-color: var(--jetlag-primary);
      box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
      outline: none;
      transform: translateY(-2px);
    }
  `;

  constructor() {
    super();
    this.value = '';
  }

  get storageKey() {
    if (!this.id) {
      throw new Error('PersistentInput requires an id attribute');
    }
    return `gameNotes_${this.id}`;
  }

  connectedCallback() {
    super.connectedCallback();
    const savedValue = localStorage.getItem(this.storageKey);
    if (savedValue) {
      this.value = savedValue;
    }
  }

  handleInput(e) {
    this.value = e.target.value;
    localStorage.setItem(this.storageKey, this.value);
  }

  render() {
    return html`
      <div class="item-row">
        <label for="${this.storageKey}"><slot></slot></label>
        <input
          id="${this.storageKey}"
          type="text"
          placeholder="Notes"
          .value=${this.value}
          @input=${this.handleInput}
        />
      </div>
    `;
  }
}

customElements.define('persistent-input', PersistentInput);
