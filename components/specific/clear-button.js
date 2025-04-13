import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ButtonElement } from '../base/button-element.js';
import { PREFIX } from '../../game-pages.js';

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
    for (let key in localStorage) {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    }
    location.reload();
  }
}

customElements.define('clear-button', ClearButton);
