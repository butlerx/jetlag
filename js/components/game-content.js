import { fetchTemplate, fetchCss } from '../fetch.js';

class GameContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const hash = window.location.hash.substring(1);
    this.render(hash === '' ? 'matching' : hash);
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for tab changes
    document.addEventListener('tab-changed', (e) => {
      this.render(e.detail.page);
    });

    // Listen for game data loaded
    document.addEventListener('game-data-loaded', (e) => {
      this.updateInputsWithLoadedData(e.detail.gameData);
    });
  }

  updateInputsWithLoadedData(gameData) {
    if (!gameData || !gameData.notes) return;

    this.shadowRoot.querySelectorAll('input').forEach((input) => {
      const id = input.id || input.closest('.item-row')?.querySelector('.item-label')?.textContent;
      if (id && gameData.notes[id]) {
        input.value = gameData.notes[id];
      }
    });
  }

  saveToLocalStorage(event) {
    const input = event.originalTarget;
    const id = input.id;

    if (id) {
      const gameType = window.location.hash.substring(1) || 'matching';
      const storageKey = `gameNotes_${gameType}_${id}`;
      localStorage.setItem(storageKey, input.value);

      const saveEvent = new CustomEvent('note-saved', {
        detail: { id, value: input.value, gameType },
      });
      document.dispatchEvent(saveEvent);
    }
  }

  loadFromLocalStorage() {
    const gameType = window.location.hash.substring(1) || 'matching';

    this.shadowRoot.querySelectorAll('input').forEach((input) => {
      const id = input.id;
      if (id) {
        const storageKey = `gameNotes_${gameType}_${id}`;
        const savedValue = localStorage.getItem(storageKey);
        if (savedValue) {
          input.value = savedValue;
        }
      }
    });
  }

  // Add input event listeners after content is loaded
  setupInputListeners() {
    let debounceTimeout;
    this.shadowRoot.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', (e) => {
        // Debounce the save operation to avoid excessive writes
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => this.saveToLocalStorage(e), 500);
      });
    });
  }

  render(page) {
    window.location.hash = page;
    Promise.all([fetchTemplate(page), fetchCss('contents')])
      .then(([html, style]) => {
        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="game-page">${html}</div>
      `;

        this.shadowRoot.querySelectorAll('.distance-option').forEach((option) => {
          option.addEventListener('click', () => {
            option.classList.toggle('selected');
          });
        });

        this.setupInputListeners();
        this.loadFromLocalStorage();
      })
      .catch((err) => {
        this.shadowRoot.innerHTML = `
          <style>${this.getErrorPageStyle()}</style>
          <div class="error-page">
            <h1>404: Time Zone Not Found</h1>
            <p>Oops! It seems you've stumbled into a temporal anomaly.</p>
            <div class="error-animation">
              <div class="clock">🕰️</div>
              <div class="plane">✈️</div>
            </div>
            <p>Don't worry, even the best travelers get lost sometimes.</p>
            <p>Why not try one of these options:</p>
            <button onclick="window.location.reload()">Restart Your Journey</button>
          </div>
        `;
      });
  }

  getErrorPageStyle() {
    return `
      .error-page {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
        background-color: #e7e7e7;
        border-radius: 8px;
        color: #233041;
      }
      h1 {
        font-size: 2.5em;
        margin-bottom: 10px;
      }
      .error-animation {
        position: relative;
        height: 100px;
        margin: 20px 0;
      }
      .clock {
        font-size: 50px;
        animation: spin 10s linear infinite;
      }
      .plane {
        font-size: 30px;
        position: absolute;
        top: 50%;
        left: -30px;
        animation: fly 5s linear infinite;
      }
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }
      @keyframes fly {
        100% { left: 100%; }
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin: 10px 0;
      }
      a {
        color: #233041;
        text-decoration: none;
        font-weight: bold;
      }
      a:hover {
        text-decoration: underline;
      }
      button {
        background-color: #233041;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 1em;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
      }
      button:hover {
        background-color: #344b6e;
      }
    `;
  }
}

customElements.define('game-content', GameContent);
