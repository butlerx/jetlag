import { fetchTemplate } from '../fetch.js';

function currentPage() {
  const hash = window.location.hash.substring(1);
  return hash === '' ? 'matching' : hash;
}

class GameTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const hash = currentPage();
    fetchTemplate('tabs').then((html) => {
      this.shadowRoot.innerHTML = html;
      for (const tab of this.shadowRoot.querySelectorAll('.tab')) {
        if (tab.dataset.page === hash) {
          tab.classList.add('active');
          break;
        }
      }
      this.addEventListeners();
    });
  }

  addEventListeners() {
    this.shadowRoot.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        this.shadowRoot.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const event = new CustomEvent('tab-changed', {
          detail: { page: tab.dataset.page },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    });
  }
}

customElements.define('game-tabs', GameTabs);
