import { fetchTemplate, fetchCss } from '../fetch.js';

class GameContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // TODO: have this come from the url query string
    this.currentPage = 0;

    this.pages = [
      'matching.html',
      'measuring.html',
      'thermo.html',
      'radar.html',
      'tentacles.html',
      'photographic.html',
    ];

    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for tab changes
    document.addEventListener('tab-changed', (e) => {
      this.currentPage = e.detail.pageNum;
      this.render();
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

  render() {
    if (!this.pages[this.currentPage]) {
      return;
    }
    Promise.all([fetchTemplate(this.pages[this.currentPage]), fetchCss('contents.css')]).then(
      ([page, style]) => {
        this.shadowRoot.innerHTML = `
            <style> ${style} </style>
            <div class="game-page"> ${page} </div>
        `;

        this.shadowRoot.querySelectorAll('.distance-option').forEach((option) => {
          option.addEventListener('click', () => {
            option.classList.toggle('selected');
          });
        });
      },
    );
  }
}

customElements.define('game-content', GameContent);
