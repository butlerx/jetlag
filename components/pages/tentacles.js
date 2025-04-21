import { html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../base/question-element.js';
import { TENTACLES_MODE } from '../../game-pages.js';

class TentaclesMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">${TENTACLES_MODE.title}</div>
          <div class="game-info">
            Cost: <span>Draw 4, Pick 2</span> Time: <span>5 Minutes</span>
          </div>
        </div>

        <div class="game-question">
          Of all the <span class="light">Places</span> within <span class="heavy">Distance</span> of
          me, which are you closest to?
          <div class="sub-note">(You must also be within <span class="heavy">Distance</span>)</div>
        </div>

        ${TENTACLES_MODE.categories.map(
          (cat) => html`
            <div class="category">
              <div class="category-title">${cat.title}: <span>${cat.distance} Miles</span></div>
              ${cat.fields.map(
                (item) => html`
                  <persistent-input id="${TENTACLES_MODE.title}.${item.id}" gameId="${this.gameId}"
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

customElements.define('tentacles-mode', TentaclesMode);
