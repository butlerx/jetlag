import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

import './components/index.js';
import './pages/index.js';

class JetlagTheGame extends LitElement {
  static styles = css`
    .container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin: 0 auto;
      max-width: 800px;
      padding: 20px;
      transition:
        transform 0.3s,
        box-shadow 0.3s;
    }

    .container:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

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
      text-transform: uppercase;
    }

    h1 span {
      padding-left: 50px;
      white-space: nowrap;
      text-align: center;
      max-width: 90%; /* Allow text to take most of the width */
    }

    button {
      padding: 10px 20px;
      background-color: var(--jetlag-primary);
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
      background-color: var(--jetlag-danger);
      transform: translateY(-2px);
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
      .container {
        padding: 15px;
      }

      .buttons {
        flex-direction: column;
        gap: 10px;
      }

      button {
        width: 100%;
      }

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

  clearStorage() {
    localStorage.clear();
    location.reload();
  }

  render() {
    return html`
      <div class="container">
        <h1>
          <img src="./icons/icon-128x128.png" alt="Jet Lag Icon" class="header-icon" />
          <span>Jet Lag: The Game - Hide + Seek</br>Investigation Book</span>
        </h1>

        <game-content></game-content>

        <div class="buttons">
          <button @click=${this.clearStorage}>Clear Game</button>
        </div>
      </div>
    `;
  }
}

customElements.define('jetlag-the-game', JetlagTheGame);
