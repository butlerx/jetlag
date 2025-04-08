import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class PersistentInputCustomLabel extends LitElement {
  static properties = {
    id: { type: String, reflect: true },
    value: { type: String },
    labelValue: { type: String },
    label: { type: String },
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

    .label-input {
      width: 28%;
      margin-right: 10px;
      background-color: white;
      border: 2px solid var(--jetlag-secondary);
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-weight: 600;
      text-align: center;
      color: var(--jetlag-dark);
      font-size: 0.9em;
      letter-spacing: 0.5px;
      padding: 8px 10px;
      transition: all 0.3s ease;
    }

    .value-input {
      width: 70%;
      border-radius: 4px;
      border: 2px solid rgba(52, 152, 219, 0.3);
      color: var(--jetlag-text);
      padding: 8px 10px;
      transition: all 0.3s ease;
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
    this.labelValue = '';
  }

  get storageKey() {
    if (!this.id) {
      throw new Error('PersistentInputCustomLabel requires an id attribute');
    }
    return `gameNotes_${this.id}`;
  }

  get labelStorageKey() {
    return `gameNotes_${this.id}_label`;
  }

  connectedCallback() {
    super.connectedCallback();
    const savedValue = localStorage.getItem(this.storageKey);
    if (savedValue) {
      this.value = savedValue;
    }

    const savedLabelValue = localStorage.getItem(this.labelStorageKey);
    if (savedLabelValue) {
      this.labelValue = savedLabelValue;
    }
  }

  handleInput(e) {
    this.value = e.target.value;
    localStorage.setItem(this.storageKey, this.value);
  }

  handleLabelInput(e) {
    this.labelValue = e.target.value;
    localStorage.setItem(this.labelStorageKey, this.labelValue);
  }

  render() {
    return html`
      <div class="item-row">
        <input
          class="label-input"
          id="${this.labelStorageKey}"
          type="text"
          placeholder="${this.label || 'Label'}"
          .value=${this.labelValue}
          @input=${this.handleLabelInput}
        />
        <input
          class="value-input"
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

customElements.define('persistent-input-custom-label', PersistentInputCustomLabel);
