import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

export class GameHeader extends LitElement {
  static styles = css`
    h1 {
      align-items: center;
      border-bottom: 3px solid var(--jetlag-primary);
      color: var(--jetlag-dark);
      display: flex;
      font-size: 24px;
      font-weight: 700;
      justify-content: center;
      letter-spacing: 1px;
      min-height: 50px;
      padding-bottom: 10px;
      position: relative;
      text-transform: none;
    }

    h1 span {
      padding-left: 50px;
      white-space: nowrap;
      text-align: center;
      max-width: 90%;
    }

    .header-icon {
      background-color: white;
      border-radius: 50%;
      border: 3px solid var(--jetlag-accent);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      height: 40px;
      left: 0;
      margin-right: 15px;
      object-fit: cover;
      padding: 2px;
      position: absolute;
      width: 40px;
    }

    @media (max-width: 768px) {
      h1 {
        flex-direction: column;
        font-size: 18px;
        padding-top: 45px;
        text-align: center;
      }

      h1 span {
        font-size: 0.8em;
        line-height: 1.3;
        padding-left: 0;
        padding-top: 12px;
        white-space: normal;
      }

      .header-icon {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    @media (max-width: 480px) {
      h1 {
        font-size: 16px;
      }
    }
  `;

  render() {
    return html`
      <h1>
        <img src="./icons/icon-128x128.png" alt="Jet Lag Icon" class="header-icon" />
        <span><slot></slot></span>
      </h1>
    `;
  }
}

customElements.define('game-header', GameHeader);
