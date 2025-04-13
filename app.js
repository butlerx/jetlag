import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

import './components/index.js';

class JetlagTheGame extends LitElement {
  static styles = css`
    main {
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

    main:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    @media (max-width: 768px) {
      main {
        padding: 15px;
      }

      .buttons {
        align-items: stretch;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
      }
    }
  `;

  render() {
    return html`
      <main>
        <game-header>Jet Lag: The Game - Hide + Seek</br>Investigation Book</game-header>
        <game-content></game-content>
        <div class="buttons">
          <clear-button>Clear Game</clear-button>
          <export-button>Export Data</export-button>
        </div>
      </main>
    `;
  }
}

customElements.define('jetlag-the-game', JetlagTheGame);
