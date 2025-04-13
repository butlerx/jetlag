import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class ErrorPage extends LitElement {
  static styles = css`
    .error-page {
      text-align: center;
      padding: 30px;
      background-color: var(--jetlag-light);
      border-radius: 8px;
      color: var(--jetlag-dark);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 0 0 20px 0;
      border: 5px solid var(--jetlag-primary);
    }

    h1 {
      font-size: 2.5em;
      margin-bottom: 15px;
      color: var(--jetlag-primary);
      border-bottom: 3px solid var(--jetlag-accent);
      padding-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
      display: block;
      text-align: center;
    }

    .error-animation {
      position: relative;
      height: 120px;
      margin: 30px 0;
      overflow: hidden;
    }

    .clock {
      font-size: 60px;
      animation: spin 10s linear infinite;
      color: var(--jetlag-secondary);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .plane {
      font-size: 36px;
      position: absolute;
      top: 50%;
      left: -30px;
      animation: fly 5s linear infinite;
      color: var(--jetlag-accent);
      transform: translateY(-50%);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes fly {
      0% {
        left: -30px;
        transform: translateY(-50%) rotate(0deg);
      }
      100% {
        left: 100%;
        transform: translateY(-50%) rotate(10deg);
      }
    }

    button {
      background-color: var(--jetlag-secondary);
      color: white;
      border: none;
      padding: 12px 25px;
      font-size: 1em;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 25px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition:
        background-color 0.3s ease,
        transform 0.2s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    button:hover {
      background-color: #c0392b;
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 600px) {
      .error-page {
        padding: 20px;
      }

      h1 {
        font-size: 2em;
      }

      .clock {
        font-size: 50px;
      }

      .plane {
        font-size: 30px;
      }
    }
  `;

  handleRestart() {
    window.location.reload();
  }

  render() {
    return html`
      <div class="error-page">
        <h1>404: Time Zone Not Found</h1>
        <p>Oops! It seems you've stumbled into a temporal anomaly.</p>
        <div class="error-animation">
          <div class="clock">🕰️</div>
          <div class="plane">✈️</div>
        </div>
        <p>Don't worry, even the best travelers get lost sometimes.</p>
        <p>Why not try one of these options:</p>
        <button @click=${this.handleRestart}>Restart Your Journey</button>
      </div>
    `;
  }
}

customElements.define('error-page', ErrorPage);
