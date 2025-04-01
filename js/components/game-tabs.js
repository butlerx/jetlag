import { fetchTemplate } from '../fetch.js';

class GameTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    fetchTemplate('tabs.html').then((html) => {
      this.shadowRoot.innerHTML = html;
      this.addEventListeners();
    });
  }

  addEventListeners() {
    this.shadowRoot.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        this.shadowRoot.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const event = new CustomEvent('tab-changed', {
          detail: { pageNum: tab.dataset.page },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    });
  }
}

customElements.define('game-tabs', GameTabs);
