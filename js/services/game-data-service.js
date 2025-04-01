export class GameDataService {
  constructor() {
    this.gameData = {
      notes: {},
    };
  }

  saveGameData() {
    // Collect all input values from the shadow DOM
    document
      .querySelectorAll('game-content')[0]
      .shadowRoot.querySelectorAll('input')
      .forEach((input) => {
        const id =
          input.id || input.closest('.item-row')?.querySelector('.item-label')?.textContent;
        if (id) {
          this.gameData.notes[id] = input.value;
        }
      });

    // Save to localStorage
    localStorage.setItem('jetLagGameData', JSON.stringify(this.gameData));
  }

  loadGameData() {
    const savedData = JSON.parse(localStorage.getItem('jetLagGameData'));
    if (!savedData) {
      return false;
    }

    this.gameData = savedData;

    // Dispatch event to notify components to update
    const event = new CustomEvent('game-data-loaded', {
      detail: { gameData: this.gameData },
      bubbles: true,
      composed: true,
    });
    document.dispatchEvent(event);

    return true;
  }
}
