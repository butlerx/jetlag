import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../components/base/question.js';

class RadarMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">RADAR</div>
          <div class="game-info">
            COST: <span>DRAW 2, PICK 1</span> TIME: <span>5 MINUTES</span>
          </div>
        </div>

        <div class="game-question">Are you within <span class="light">Distance</span> of me?</div>

        <div class="category">
          <div class="category-title">ALL GAMES</div>
          <persistent-input id="radar-quarter-mile">¼ Mile</persistent-input>
          <persistent-input id="radar-half-mile">½ Mile</persistent-input>
          <persistent-input id="radar-one-mile">1 Mile</persistent-input>
          <persistent-input id="radar-three-miles">3 Miles</persistent-input>
          <persistent-input id="radar-five-miles">5 Miles</persistent-input>
          <persistent-input id="radar-ten-miles">10 Miles</persistent-input>
          <persistent-input id="radar-twenty-five-miles">25 Miles</persistent-input>
          <persistent-input id="radar-fifty-miles">50 Miles</persistent-input>
          <persistent-input id="radar-hundred-miles">100 Miles</persistent-input>
          <persistent-input-custom-label id="radar-choose"></persistent-input-custom-label>
        </div>
      </div>
    `;
  }
}

customElements.define('radar-mode', RadarMode);
