import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../components/base/question.js';

class ThermometerMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">THERMOMETER</div>
          <div class="game-info">
            COST: <span>DRAW 2, PICK 1</span> TIME: <span>5 MINUTES</span>
          </div>
        </div>

        <div class="game-question">
          I've just traveled (at least) <span class="light">Distance</span>. Am I hotter or colder?
        </div>

        <div class="category">
          <div class="category-title">ALL GAMES</div>
          <persistent-input id="thermometer-half-mile">🔥 ½ Mile</persistent-input>
          <persistent-input id="thermometer-three-miles">🔥 3 Miles</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">ADD FOR MEDIUM & LARGE</div>
          <persistent-input id="thermometer-ten-miles">🌡️ 10 Miles</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">ADD FOR LARGE</div>
          <persistent-input id="thermometer-fifty-miles">❄️ 50 Miles</persistent-input>
        </div>
      </div>
    `;
  }
}

customElements.define('thermometer-mode', ThermometerMode);
