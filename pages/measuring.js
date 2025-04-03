import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../components/base/question.js';

class MeasuringMode extends QuestionElement {
  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">MEASURING</div>
          <div class="game-info">
            COST: <span>DRAW 3, PICK 1</span> TIME: <span>5 MINUTES</span>
          </div>
        </div>

        <div class="game-question">Compared to me, are you closer to or further from _______?</div>

        <div class="category">
          <div class="category-title">TRANSIT</div>
          <persistent-input id="measuring-airport">A Commercial Airport</persistent-input>
          <persistent-input id="measuring-train-line">A High Speed Train Line</persistent-input>
          <persistent-input id="measuring-rail-station">A Rail Station</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">BORDERS</div>
          <persistent-input id="measuring-international-border"
            >An International Border</persistent-input
          >
          <persistent-input id="measuring-admin-div-1">A 1st Admin. Div. Border</persistent-input>
          <persistent-input id="measuring-admin-div-2">A 2nd Admin. Div. Border</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">NATURAL</div>
          <persistent-input id="measuring-sea-level">Sea Level</persistent-input>
          <persistent-input id="measuring-body-of-water">A Body of Water</persistent-input>
          <persistent-input id="measuring-coastline">A Coastline</persistent-input>
          <persistent-input id="measuring-mountain">A Mountain</persistent-input>
          <persistent-input id="measuring-park">A Park</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">PLACES OF INTEREST</div>
          <persistent-input id="measuring-amusement-park">An Amusement Park</persistent-input>
          <persistent-input id="measuring-zoo">A Zoo</persistent-input>
          <persistent-input id="measuring-aquarium">An Aquarium</persistent-input>
          <persistent-input id="measuring-golf-course">A Golf Course</persistent-input>
          <persistent-input id="measuring-museum">A Museum</persistent-input>
          <persistent-input id="measuring-movie-theater">A Movie Theater</persistent-input>
        </div>

        <div class="category">
          <div class="category-title">PUBLIC UTILITIES</div>
          <persistent-input id="measuring-hospital">A Hospital</persistent-input>
          <persistent-input id="measuring-library">A Library</persistent-input>
          <persistent-input id="measuring-consulate">A Foreign Consulate</persistent-input>
        </div>
      </div>
    `;
  }
}

customElements.define('measuring-mode', MeasuringMode);
