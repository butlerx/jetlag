import { html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { QuestionElement } from '../base/question-element.js';
import { PHOTOS_MODE } from '../../game-pages.js';

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
          <div class="game-title">${PHOTOS_MODE.title}</div>
          <div class="game-info">
            Cost: <span>Draw 1</span> Time: <span>S/M: 10 Min</span> <span>L: 20 Min</span>
          </div>
        </div>

        <div class="game-question">Send a photo of <span class="heavy">Subject</span></div>

        ${PHOTOS_MODE.categories.map(
          (cat) => html`
            <div class="category">
              <div class="category-title">${cat.title}:</div>
              <div class="photo-options">
                ${cat.fields.map(
                  (item) => html`
                    <persistent-checkbox id="${PHOTOS_MODE.title}.${item.id}"
                      >${item.label}
                      <div class="subtext">${item.description}</div>
                    </persistent-checkbox>
                  `,
                )}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }
}

customElements.define('photos-mode', PhotosMode);
