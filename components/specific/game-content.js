import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

function currentPage() {
  const hash = window.location.hash.substring(1);
  return hash === '' ? 'matching' : hash;
}

class GameContent extends LitElement {
  static styles = css`
    .tabs {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 3px solid var(--jetlag-primary);
    }

    .tab {
      padding: 10px 15px;
      cursor: pointer;
      border: 1px solid transparent;
      border-bottom: none;
      border-radius: 6px 6px 0 0;
      margin-right: 5px;
      color: var(--jetlag-dark);
      transition: all 0.3s ease;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.9em;
    }

    .tab.active {
      background-color: var(--jetlag-primary);
      color: white;
      border-color: var(--jetlag-primary);
      font-weight: 500;

      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    }

    .tab:hover:not(.active) {
      background-color: rgba(231, 76, 60, 0.1);
      border-color: rgba(231, 76, 60, 0.3);
      transform: translateY(-2px);
    }

    /* Alternate tab styling for visual interest */
    .tab:nth-child(2n) {
      background-color: transparent;
    }

    .tab:nth-child(2n).active {
      background-color: var(--jetlag-secondary);
      border-color: var(--jetlag-secondary);
    }

    .tab:nth-child(2n):hover:not(.active) {
      background-color: rgba(52, 152, 219, 0.1);
      border-color: rgba(52, 152, 219, 0.3);
    }
  `;

  static properties = {
    activePage: { type: String },
  };

  constructor() {
    super();
    this.activePage = currentPage();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash !== this.activePage) {
        this.activePage = hash || 'matching';
      }
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('activePage')) {
      window.location.hash = this.activePage;
    }
  }

  #handleTabClick(page) {
    this.activePage = page;
  }

  render() {
    return html`
      <div class="tabs">
        <div
          class="tab ${this.activePage === 'matching' ? 'active' : ''}"
          data-page="matching"
          @click="${() => this.#handleTabClick('matching')}"
        >
          Matching
        </div>
        <div
          class="tab ${this.activePage === 'measuring' ? 'active' : ''}"
          data-page="measuring"
          @click="${() => this.#handleTabClick('measuring')}"
        >
          Measuring
        </div>
        <div
          class="tab ${this.activePage === 'thermo' ? 'active' : ''}"
          data-page="thermo"
          @click="${() => this.#handleTabClick('thermo')}"
        >
          Thermo
        </div>
        <div
          class="tab ${this.activePage === 'radar' ? 'active' : ''}"
          data-page="radar"
          @click="${() => this.#handleTabClick('radar')}"
        >
          Radar
        </div>
        <div
          class="tab ${this.activePage === 'tentacles' ? 'active' : ''}"
          data-page="tentacles"
          @click="${() => this.#handleTabClick('tentacles')}"
        >
          Tentacles
        </div>
        <div
          class="tab ${this.activePage === 'photographic' ? 'active' : ''}"
          data-page="photographic"
          @click="${() => this.#handleTabClick('photographic')}"
        >
          Photographic
        </div>
      </div>

      ${this.renderPage()}
    `;
  }

  renderPage() {
    switch (this.activePage) {
      case 'matching':
        return html`<matching-mode></matching-mode>`;
      case 'measuring':
        return html`<measuring-mode></measuring-mode>`;
      case 'thermo':
        return html`<thermometer-mode></thermometer-mode>`;
      case 'radar':
        return html`<radar-mode></radar-mode>`;
      case 'tentacles':
        return html`<tentacles-mode></tentacles-mode>`;
      case 'photographic':
        return html`<photos-mode></photos-mode>`;
      default:
        return html`<error-page></error-page>`;
    }
  }
}

customElements.define('game-content', GameContent);
