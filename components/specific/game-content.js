/**
 * @fileoverview GameContent component for displaying different game modes and managing navigation
 */

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { currentPage } from '../../utils.js';

/**
 * A custom element that manages game content and navigation between different game modes
 * @extends LitElement
 */
class GameContent extends LitElement {
  /**
   * @static
   * @type {Object}
   * @property {Object} activePage - The currently active game mode page
   * @property {Object} mobileMenuOpen - Whether the mobile menu is open
   * @property {Object} gameId - The current game ID
   */
  static properties = {
    activePage: { type: String },
    mobileMenuOpen: { type: Boolean },
    gameId: { state: true },
  };

  /**
   * @static
   * @type {CSSResult}
   */
  static styles = css`
    .tabs-container {
      margin-bottom: 20px;
    }

    .tabs {
      border-bottom: 3px solid var(--jetlag-primary);
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .tab {
      border-bottom: none;
      border-radius: 6px 6px 0 0;
      border: 1px solid transparent;
      color: var(--jetlag-dark);
      cursor: pointer;
      font-size: 0.9em;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-right: 5px;
      padding: 10px 15px;
      text-transform: uppercase;
      transition: all 0.3s ease;
      flex-grow: 1;
      text-align: center;
    }

    .tab.active {
      background-color: var(--jetlag-primary);
      border-color: var(--jetlag-primary);
      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
      color: white;
      font-weight: 500;
    }

    .tab:hover:not(.active) {
      background-color: rgba(231, 76, 60, 0.1);
      border-color: rgba(231, 76, 60, 0.3);
      transform: translateY(-2px);
    }

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

    .mobile-selector {
      display: none;
      width: 100%;
      margin-bottom: 15px;
    }

    .active-tab {
      background-color: var(--jetlag-primary);
      color: white;
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
    }

    .mobile-menu {
      margin-top: 5px;
      border: 1px solid var(--jetlag-secondary);
      border-radius: 6px;
      overflow: hidden;
    }

    .tab-option {
      padding: 10px 15px;
      background-color: white;
      border-bottom: 1px solid var(--jetlag-secondary);
      cursor: pointer;
    }

    .tab-option:last-child {
      border-bottom: none;
    }

    .tab-option.active {
      background-color: var(--jetlag-secondary);
      color: white;
    }

    @media (max-width: 600px) {
      .tabs {
        display: none;
      }

      .mobile-selector {
        display: block;
      }
    }

    @media (min-width: 601px) and (max-width: 768px) {
      .tab {
        font-size: 0.8em;
        padding: 8px 10px;
      }
    }
  `;

  /**
   * @type {Object}
   * @property {string} matching - Matching game mode
   * @property {string} measuring - Measuring game mode
   * @property {string} thermo - Thermo game mode
   * @property {string} radar - Radar game mode
   * @property {string} tentacles - Tentacles game mode
   * @property {string} photographic - Photographic game mode
   */
  tabs = {
    matching: 'Matching',
    measuring: 'Measuring',
    thermo: 'Thermo',
    radar: 'Radar',
    tentacles: 'Tentacles',
    photographic: 'Photographic',
  };

  /**
   * Creates an instance of GameContent
   */
  constructor() {
    super();
    this.activePage = currentPage();
    this.mobileMenuOpen = false;
  }

  /**
   * Called when the element is connected to the DOM
   * Sets up hash change listener for navigation
   */
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.substring(1);
      if (hash !== this.activePage) {
        this.activePage = hash || 'matching';
      }
    });
  }

  /**
   * Called when properties are updated
   * Updates the URL hash when activePage changes
   * @param {Map} changedProperties - Map of changed properties
   */
  updated(changedProperties) {
    if (changedProperties.has('activePage')) {
      window.location.hash = this.activePage;
    }
  }

  /**
   * Handles tab click events
   * @private
   * @param {string} page - The page to navigate to
   */
  #handleTabClick(page) {
    this.activePage = page;
    this.mobileMenuOpen = false;
  }

  /**
   * Toggles the mobile menu open/closed state
   */
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * Renders the game content component
   * @returns {TemplateResult} The HTML template for the component
   */
  render() {
    return html`
      <div class="tabs-container">
        <div class="mobile-selector">
          <div class="active-tab" @click="${this.toggleMobileMenu}">
            ${this.tabs[this.activePage] || 'Select'} ▼
          </div>
          ${this.mobileMenuOpen
            ? html` <div class="mobile-menu">${this.renderTabOptions()}</div> `
            : ''}
        </div>

        <div class="tabs">${this.renderTabOptions()}</div>
      </div>

      ${this.renderPage()}
    `;
  }

  /**
   * Renders the tab options for navigation
   * @returns {TemplateResult} The HTML template for tab options
   */
  renderTabOptions() {
    const tabClass = this.mobileMenuOpen ? 'tab-option' : 'tab';

    return Object.entries(this.tabs).map(
      ([id, name]) => html`
        <div
          class="${tabClass} ${this.activePage === id ? 'active' : ''}"
          @click="${() => this.#handleTabClick(id)}"
        >
          ${name}
        </div>
      `,
    );
  }

  /**
   * Renders the current game mode page
   * @returns {TemplateResult} The HTML template for the current page
   */
  renderPage() {
    switch (this.activePage) {
      case 'matching':
        return html`<matching-mode .gameId=${this.gameId}></matching-mode>`;
      case 'measuring':
        return html`<measuring-mode .gameId=${this.gameId}></measuring-mode>`;
      case 'thermo':
        return html`<thermometer-mode .gameId=${this.gameId}></thermometer-mode>`;
      case 'radar':
        return html`<radar-mode .gameId=${this.gameId}></radar-mode>`;
      case 'tentacles':
        return html`<tentacles-mode .gameId=${this.gameId}></tentacles-mode>`;
      case 'photographic':
        return html`<photos-mode .gameId=${this.gameId}></photos-mode>`;
      default:
        return html`<error-page></error-page>`;
    }
  }
}

customElements.define('game-content', GameContent);
