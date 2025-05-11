import { html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../base/question-element.js';
import { MATCHING_MODE } from '../../game-pages.js';

class MatchingMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">${MATCHING_MODE.title}</div>
          <div class="game-info">
            Cost: <span>Draw 3, Pick 1</span> Time: <span>5 Minutes</span>
          </div>
        </div>

        <div class="game-question">Is your nearest ______ the same as my nearest ______?</div>

        ${MATCHING_MODE.categories.map(
          (cat) => html`
            <div class="category">
              <div class="category-title">${cat.title}:</div>
              ${cat.fields.map(
                (item) => html`
                  <persistent-input id="${MATCHING_MODE.title}.${item.id}" .gameId="${this.gameId}"
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

customElements.define('matching-mode', MatchingMode);
