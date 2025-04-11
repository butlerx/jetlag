import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ButtonElement } from '../base/button-element.js';

class ClearButton extends ButtonElement {
  static styles = [
    ButtonElement.styles,
    css`
      button {
        background-color: var(--jetlag-primary);
      }

      button:hover {
        background-color: var(--jetlag-danger);
      }
    `,
  ];

  handleClick() {
    const prefix = 'gameNotes.';
    for (let key in localStorage) {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    }
    location.reload();
  }
}

customElements.define('clear-button', ClearButton);
