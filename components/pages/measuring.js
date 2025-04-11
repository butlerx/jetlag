import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../base/question-element.js';
import { MEASURING_MODE } from '../../game-pages.js';

class MeasuringMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">${MEASURING_MODE.title}</div>
          <div class="game-info">
            Cost: <span>Draw 3, pick 1</span> Time: <span>5 Minutes</span>
          </div>
        </div>

        <div class="game-question">Compared to me, are you closer to or further from _______?</div>

        ${MEASURING_MODE.categories.map(
          (cat) => html`
            <div class="category">
              <div class="category-title">${cat.title}:</div>
              ${cat.fields.map(
                (item) => html`
                  <persistent-input id="${MEASURING_MODE.title}.${item.id}"
                    >${item.label}</persistent-input
                  >
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  }
}

customElements.define('measuring-mode', MeasuringMode);
