import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../components/base/question.js';

class TentaclesMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">TENTACLES</div>
          <div class="game-info">
            COST: <span>DRAW 4, PICK 2</span> TIME: <span>5 MINUTES</span>
          </div>
        </div>

        <div class="game-question">
          Of all the <span class="light">Places</span> within <span class="heavy">DISTANCE</span> of
          me, which are you closest to?
          <div class="sub-note">(You must also be within <span class="heavy">DISTANCE</span>)</div>
        </div>

        <div class="category">
          <div class="category-title">MEDIUM & LARGE GAMES: <span>1 MILE</span></div>
          <persistent-input id="tentacles-museums">🏛️ Museums</persistent-input>
          <persistent-input id="tentacles-libraries">📚 Libraries</persistent-input>
          <persistent-input id="tentacles-movie-theaters">🎬 Movie Theaters</persistent-input>
          <persistent-input id="tentacles-hospitals">🏥 Hospitals</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">LARGE GAMES ONLY: <span>15 MILES</span></div>
          <persistent-input id="tentacles-metro-lines">🚇 Metro Lines</persistent-input>
          <persistent-input id="tentacles-zoos">🦁 Zoos</persistent-input>
          <persistent-input id="tentacles-aquariums">🐠 Aquariums</persistent-input>
          <persistent-input id="tentacles-amusement-parks">🎢 Amusement Parks</persistent-input>
        </div>
      </div>
    `;
  }
}

customElements.define('tentacles-mode', TentaclesMode);
