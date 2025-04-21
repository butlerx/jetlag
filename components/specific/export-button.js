import { css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ButtonElement } from '../base/button-element.js';
import { GAME_PAGES, PREFIX } from '../../game-pages.js';
import { titleize } from '../../utils.js';

class ExportButton extends ButtonElement {
  static properties = {
    ...ButtonElement.properties,
    gameId: { type: String },
  };

  static styles = [
    ButtonElement.styles,
    css`
      button {
        background-color: var(--jetlag-secondary);
      }

      button:hover {
        background-color: var(--jetlag-success);
      }
    `,
  ];

  handleClick() {
    if (!this.gameId) {
      throw new Error('ExportButton: No gameId provided.');
    }

    const gamePrefix = `${PREFIX}${this.gameId}`;
    const gameDuration = localStorage.getItem(`${gamePrefix}.duration`) || 'Not Set';

    const gamesList = JSON.parse(localStorage.getItem('jetlag.games.list') || '[]');
    const currentGame = gamesList.find((game) => game.id === this.gameId);
    const gameName = currentGame ? currentGame.name : 'Unknown Game';
    const safeGameName = gameName.toLowerCase().replace(/[^a-z0-9]/g, '_');

    const notes = GAME_PAGES.map((page) => this.processPage(page, gamePrefix))
      .filter(Boolean)
      .join('\n\n');

    this.downloadMarkdown(
      `# ${gameName}\n\n**Duration:** ${gameDuration}\n\n${notes}`,
      `jetlag_export_${safeGameName}_${this.gameId.substring(0, 8)}.md`,
    );
  }

  /**
   * Processes a page and returns its markdown representation
   * @param {object} page - The page object containing title and fields
   * @param {string} gamePrefix - The game-specific prefix for local storage keys
   * @return {string | null} The markdown representation of the page or null if not found
   */
  processPage(page, gamePrefix) {
    const { title, categories } = page;
    if (title === 'photos') {
      return this.processPhotosPage(page, gamePrefix);
    }

    const pageContent = categories
      .map((cat) => {
        const fields = cat.fields
          .map((field) => this.processField(field, page.title, gamePrefix))
          .filter(Boolean)
          .join('\n\n');
        if (!fields) return null;
        return `### ${titleize(cat.title)}\n\n${fields}`;
      })
      .filter(Boolean)
      .join('\n\n');

    if (!pageContent) return null;
    return `## ${titleize(title)}\n\n${pageContent}`;
  }

  /**
   * Processes the photos page and returns its markdown representation
   * @param {object} page - The page object containing title and fields
   * @param {string} gamePrefix - The game-specific prefix for local storage keys
   * @return {string} The markdown representation of the photos page
   */
  processPhotosPage(page, gamePrefix) {
    const list = page.categories.map((cat) => {
      const fields = cat.fields.map((field) => {
        const value = localStorage.getItem(`${gamePrefix}.${page.title}.${field.id}`);
        const done = value === 'true' ? 'x' : ' ';
        return `- [${done}] ${field.label}`;
      });
      return `### ${cat.title}\n\n${fields.join('\n')}`;
    });

    return `## ${titleize(page.title)}\n\n${list.join('\n\n')}`;
  }

  /**
   * Processes a field and returns its markdown representation
   * @param {object} field - The field object containing id and label
   * @param {string} title - The title of the page
   * @param {string} gamePrefix - The game-specific prefix for local storage keys
   * @return {string | null} The markdown representation of the field or null if not found
   */
  processField(field, title, gamePrefix) {
    const mainValueKey = `${gamePrefix}.${title}.${field.id}`;
    const value = localStorage.getItem(mainValueKey);
    if (!value) return null;

    if (title === 'radar' && field.id === 'choose') {
      const label = localStorage.getItem(`${mainValueKey}.label`);
      return `#### ${field.label}: ${label || ''}\n\n${value}`;
    }

    return `#### ${field.label}\n\n${value}`;
  }

  /**
   * Downloads the given content as a markdown file
   * @param {string} content - The content to download
   * @param {string} filename - The name of the file to download
   */
  downloadMarkdown(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

customElements.define('export-button', ExportButton);
