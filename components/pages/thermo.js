import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../base/question-element.js';
import { THERMOMETER_MODE } from '../../game-pages.js';

class ThermometerMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">${THERMOMETER_MODE.title}</div>
          <div class="game-info">
            Cost: <span>Draw 2, Pick 1</span> Time: <span>5 Minutes</span>
          </div>
        </div>

        <div class="game-question">
          I've just traveled (at least) <span class="light">Distance</span>. Am I hotter or colder?
        </div>

        ${THERMOMETER_MODE.categories.map(
          (cat) => html`
            <div class="category">
              <div class="category-title">${cat.title}</div>
              ${cat.fields.map(
                (item) => html`
                  <persistent-input id="${THERMOMETER_MODE.title}.${item.id}"
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

customElements.define('thermometer-mode', ThermometerMode);
