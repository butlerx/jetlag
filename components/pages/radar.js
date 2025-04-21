import { html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../base/question-element.js';
import { RADAR_MODE } from '../../game-pages.js';

class RadarMode extends QuestionElement {
  render() {
    const title = RADAR_MODE.categories[0].title;
    const inputs = RADAR_MODE.categories[0].fields.map(
      (item) =>
        html`<persistent-input id="${RADAR_MODE.title}.${item.id}" gameId="${this.gameId}"
          >${item.label}</persistent-input
        >`,
    );

    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">${RADAR_MODE.title}</div>
          <div class="game-info">
            Cost: <span>Draw 2, Pick 1</span> Time: <span>5 Minutes</span>
          </div>
        </div>

        <div class="game-question">Are you within <span class="light">Distance</span> of me?</div>
        <div class="category">
          <div class="category-title">${title}</div>
          ${inputs}
          <persistent-input-custom-label
            id="radar.choose"
            gameId="${this.gameId}"
            label="🎯CHOOSE"
          />
        </div>
      </div>
    `;
  }
}

customElements.define('radar-mode', RadarMode);
