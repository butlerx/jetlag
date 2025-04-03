import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

import './components/index.js';
import './pages/index.js';

class JetlagTheGame extends LitElement {
  static styles = css`
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition:
        transform 0.3s,
        box-shadow 0.3s;
    }

    .container:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    h1 {
      display: flex;
      align-items: center;
      color: var(--jetlag-dark);
      border-bottom: 3px solid var(--jetlag-primary);
      padding-bottom: 10px;
      position: relative;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 24px;
    }

    h1 span {
      left: 0;
      right: 0;
      text-align: center;
      pointer-events: none;
      position: absolute;
      font-size: 1em;
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
      height: 40px;
      width: 40px;
      vertical-align: middle;
      margin-right: 15px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--jetlag-accent);
      padding: 2px;
      background-color: white;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .container {
        padding: 15px;
      }

      .nav-buttons {
        flex-direction: column;
        gap: 10px;
      }

      button {
        width: 100%;
      }

      h1 {
        font-size: 20px;
      }

      h1 span {
        font-size: 0.8em;
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

        <div class="nav-buttons">
          <button @click=${this.clearStorage}>Clear Game</button>
        </div>
      </div>
    `;
  }
}

customElements.define('jetlag-the-game', JetlagTheGame);
