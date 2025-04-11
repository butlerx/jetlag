import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class ButtonElement extends LitElement {
  static styles = css`
    button {
      padding: 10px 20px;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition:
        background-color 0.3s ease,
        transform 0.2s;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    button:hover {
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      button {
        margin-left: 0;
        width: 100%;
        max-width: none;
      }
    }
  `;

  /**
   * @description click event handler
   */
  handleClick() {}

  /**
   * @returns {import('lit').TemplateResult}
   * @description Renders the button element.
   * @method render
   * @memberof ButtonElement
   * @example
   * <button-element @click=${this.handleClick}>Click me!</button-element>
   */
  render() {
    return html`
      <button @click=${this.handleClick}>
        <slot></slot>
      </button>
    `;
  }
}
