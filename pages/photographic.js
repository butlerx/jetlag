import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../components/base/question.js';

class PhotosMode extends QuestionElement {
  static styles = [
    QuestionElement.styles,
    css`
      .photo-options {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-bottom: 20px;
      }

      @media (min-width: 768px) {
        .photo-options {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 767px) {
        .photo-options {
          grid-template-columns: 1fr;
        }
      }

      .subtext {
        font-size: 0.8em;
        font-weight: 400;
        margin-top: 5px;
      }
    `,
  ];

  render() {
    return html`
      <div class="game-page">
        <div class="game-header">
          <div class="game-title">6. PHOTOS</div>
          <div class="game-info">
            COST: <span>DRAW 1</span> TIME: <span>S/M: 10 MIN</span> <span>L: 20 MIN</span>
          </div>
        </div>

        <div class="game-question">Send a photo of <span class="heavy">Subject</span></div>

        <div class="category">
          <div class="category-title">ALL GAMES:</div>
          <div class="photo-options">
            <persistent-checkbox id="photos-tree">
              A Tree
              <div class="subtext">Must include the entire tree.</div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-sky">
              The Sky
              <div class="subtext">Place phone on ground, shoot directly up.</div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-you">
              You
              <div class="subtext">Selfie mode. Arm parallel to the ground, fully extended.</div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-widest-street">
              Widest Street
              <div class="subtext">Must include both sides of the street.</div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-tallest-structure">
              Tallest Structure in Your Sightline
              <div class="subtext">
                Tallest from your current perspective/sightline. Must include top and both sides.
                The top must be in the top ½ of the frame.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-building-from-station">
              Any Building Visible from Station
              <div class="subtext">
                Must stand directly outside transit station entrance. If multiple entrances, you may
                choose. Must include roof, both sides, with the top of building in top ½ of the
                frame.
              </div>
            </persistent-checkbox>
          </div>
        </div>

        <div class="category">
          <div class="category-title">ADD FOR MEDIUM & LARGE:</div>
          <div class="photo-options">
            <persistent-checkbox id="photos-tallest-building-from-station">
              Tallest Building Visible from Station
              <div class="subtext">
                Tallest from your perspective/sightline. Must stand directly outside transit station
                entrance. If multiple entrances, you may choose. Must include roof, both sides, with
                the top of building in top ½ of the frame.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-trace-street">
              Trace Nearest Street/Path
              <div class="subtext">
                Street/path must be visible on mapping app. Trace intersection to intersection.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-two-buildings">
              Two Buildings
              <div class="subtext">Must include bottom and up to four stories.</div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-restaurant-interior">
              Restaurant Interior
              <div class="subtext">
                No zoom. Must take the picture through the window from outside the restaurant.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-train-platform">
              Train Platform
              <div class="subtext">
                Must include a 5' x 5' section with three distinct elements.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-park">
              Park
              <div class="subtext">
                No zoom, phone perpendicular to ground. Must stand 5' from any obstruction.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-grocery-store">
              Grocery Store Aisle
              <div class="subtext">
                No zoom. Stand at the end of the aisle, shoot directly down.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-place-of-worship">
              Place of Worship
              <div class="subtext">
                Must include a 5' x 5' section with three distinct elements.
              </div>
            </persistent-checkbox>
          </div>
        </div>

        <div class="category">
          <div class="category-title">ADD FOR LARGE:</div>
          <div class="photo-options">
            <persistent-checkbox id="photos-streets-traced">
              ½ Mile of Streets Traced
              <div class="subtext">
                Must be continuous, including 5 turns, no doubling back. Send N-S oriented. Streets
                must appear on mapping app.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-tallest-mountain">
              Tallest Mountain Visible from Station
              <div class="subtext">
                Tallest from your perspective/sightline. Max 3x zoom. Top of mountain must be in top
                ½ of frame.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-body-of-water">
              Biggest Body of Water in Your Zone
              <div class="subtext">
                Max 3x zoom. Must include either both sides of body of water or the horizon.
              </div>
            </persistent-checkbox>
            <persistent-checkbox id="photos-five-buildings">
              Five Buildings
              <div class="subtext">Must include bottom and up to four stories.</div>
            </persistent-checkbox>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('photos-mode', PhotosMode);
