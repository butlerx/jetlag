import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../components/base/question.js';

class MatchingMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">MATCHING</div>
          <div class="game-info">
            COST: <span>DRAW 3, PICK 1</span> TIME: <span>5 MINUTES</span>
          </div>
        </div>

        <div class="game-question">Is your nearest ______ the same as my nearest ______?</div>

        <div class="category">
          <div class="category-title">TRANSIT</div>
          <persistent-input id="matching-commercial-airport">Commercial Airport</persistent-input>
          <persistent-input id="matching-transit-line">Transit Line</persistent-input>
          <persistent-input id="matching-station-name-length"
            >Station's Name Length</persistent-input
          >
          <persistent-input id="matching-street-path">Street or Path</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">ADMINISTRATIVE DIVISIONS</div>
          <persistent-input id="matching-admin-div-1">1st Admin. Division</persistent-input>
          <persistent-input id="matching-admin-div-2">2nd Admin. Division</persistent-input>
          <persistent-input id="matching-admin-div-3">3rd Admin. Division</persistent-input>
          <persistent-input id="matching-admin-div-4">4th Admin. Division</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">NATURAL</div>
          <persistent-input id="matching-mountain">Mountain</persistent-input>
          <persistent-input id="matching-landmass">Landmass</persistent-input>
          <persistent-input id="matching-park">Park</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">PLACES OF INTEREST</div>
          <persistent-input id="matching-amusement-park">Amusement Park</persistent-input>
          <persistent-input id="matching-zoo">Zoo</persistent-input>
          <persistent-input id="matching-aquarium">Aquarium</persistent-input>
          <persistent-input id="matching-golf-course">Golf Course</persistent-input>
          <persistent-input id="matching-museum">Museum</persistent-input>
          <persistent-input id="matching-movie-theater">Movie Theater</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">PUBLIC UTILITIES</div>
          <persistent-input id="matching-hospital">Hospital</persistent-input>
          <persistent-input id="matching-library">Library</persistent-input>
          <persistent-input id="matching-foreign-consulate">Foreign Consulate</persistent-input>
        </div>
      </div>
    `;
  }
}

customElements.define('matching-mode', MatchingMode);
