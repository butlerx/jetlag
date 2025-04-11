import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { ButtonElement } from '../base/button-element.js';

/**
 * Converts a string to title case (first letter of each word capitalized)
 * @param {string} str - The input string to titleize
 * @return {string} The titleized string
 */
function titleize(str) {
  if (!str) return '';

  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

class ExportButton extends ButtonElement {
  static styles = [
    ButtonElement.styles,
    css`
      button {
        background-color: var(--jetlag-secondary);
      }

      button:hover {
        background-color: var(--jetlag-success);
      }
    `,
  ];

  handleClick() {
    const prefix = 'gameNotes.';
    const pages = [
      {
        title: 'matching',
        fields: [
          { id: 'commercial-airport', label: '✈️ Commercial Airport' },
          { id: 'transit-line', label: '🚆 Transit Line' },
          { id: 'station-name-length', label: "📏 Station's Name Length" },
          { id: 'street-path', label: '🛣️ Street or Path' },
          { id: 'admin-div-1', label: '🗺️ 1st Admin. Division' },
          { id: 'admin-div-2', label: '📍 2nd Admin. Division' },
          { id: 'admin-div-3', label: '🏙️ 3rd Admin. Division' },
          { id: 'admin-div-4', label: '🏘️ 4th Admin. Division' },
          { id: 'mountain', label: '⛰️ Mountain' },
          { id: 'landmass', label: '🏝️ Landmass' },
          { id: 'park', label: '🌳 Park' },
          { id: 'amusement-park', label: '🎢 Amusement Park' },
          { id: 'zoo', label: '🦁 Zoo' },
          { id: 'aquarium', label: '🐠 Aquarium' },
          { id: 'golf-course', label: '⛳ Golf Course' },
          { id: 'museum', label: '🏛️ Museum' },
          { id: 'movie-theater', label: '🎬 Movie Theater' },
          { id: 'hospital', label: '🏥 Hospital' },
          { id: 'library', label: '📚 Library' },
          { id: 'foreign-consulate', label: '🏛️🌍 Foreign Consulate' },
        ],
      },
      {
        title: 'measuring',
        fields: [
          { id: 'airport', label: '✈️ A Commercial Airport' },
          { id: 'train-line', label: '🚄 A High Speed Train Line' },
          { id: 'rail-station', label: '🚉 A Rail Station' },
          { id: 'international-border', label: '🌍 An International Border' },
          { id: 'admin-div-1', label: '🗺️ A 1st Admin. Div. Border' },
          { id: 'admin-div-2', label: '📍 A 2nd Admin. Div. Border' },
          { id: 'sea-level', label: '🌊 Sea Level' },
          { id: 'body-of-water', label: '💧 A Body of Water' },
          { id: 'coastline', label: '🏖️ A Coastline' },
          { id: 'mountain', label: '⛰️ A Mountain' },
          { id: 'park', label: '🌳 A Park' },
          { id: 'amusement-park', label: '🎢 An Amusement Park' },
          { id: 'zoo', label: '🦁 A Zoo' },
          { id: 'aquarium', label: '🐠 An Aquarium' },
          { id: 'golf-course', label: '⛳ A Golf Course' },
          { id: 'museum', label: '🏛️ A Museum' },
          { id: 'movie-theater', label: '🎬 A Movie Theater' },
          { id: 'hospital', label: '🏥 A Hospital' },
          { id: 'library', label: '📚 A Library' },
          { id: 'consulate', label: '🏛️🌍 A Foreign Consulate' },
        ],
      },
      {
        title: 'thermometer',
        fields: [
          { id: 'half-mile', label: '🔥 ½ Mile' },
          { id: 'three-miles', label: '🔥 3 Miles' },
          { id: 'ten-miles', label: '🌡️ 10 Miles' },
          { id: 'fifty-miles', label: '❄️ 50 Miles' },
        ],
      },
      {
        title: 'radar',
        fields: [
          { id: 'quarter-mile', label: '📍 ¼ Mile' },
          { id: 'half-mile', label: '📍 ½ Mile' },
          { id: 'one-mile', label: '📍 1 Mile' },
          { id: 'three-miles', label: '📍 3 Miles' },
          { id: 'five-miles', label: '📍 5 Miles' },
          { id: 'ten-miles', label: '🔍 10 Miles' },
          { id: 'twenty-five-miles', label: '🔍 25 Miles' },
          { id: 'fifty-miles', label: '🌐 50 Miles' },
          { id: 'hundred-miles', label: '🌐 100 Miles' },
          { id: 'choose', label: '🎯 CHOOSE' },
        ],
      },
      {
        title: 'tentacles',
        fields: [
          { id: 'museums', label: '🏛️ Museums' },
          { id: 'libraries', label: '📚 Libraries' },
          { id: 'movie-theaters', label: '🎬 Movie Theaters' },
          { id: 'hospitals', label: '🏥 Hospitals' },
          { id: 'metro-lines', label: '🚇 Metro Lines' },
          { id: 'zoos', label: '🦁 Zoos' },
          { id: 'aquariums', label: '🐠 Aquariums' },
          { id: 'amusement-parks', label: '🎢 Amusement Parks' },
        ],
      },
      {
        title: 'photos',
        fields: [
          { id: 'tree', label: '🌳 A Tree' },
          { id: 'sky', label: '☁️ The Sky' },
          { id: 'you', label: '🤳 You' },
          { id: 'widest-street', label: '🛣️ Widest Street' },
          { id: 'tallest-structure', label: '🏙️ Tallest Structure in Your Sightline' },
          { id: 'building-from-station', label: '🚉 Any Building Visible from Station' },
          {
            id: 'tallest-building-from-station',
            label: '🏢 Tallest Building Visible from Station',
          },
          { id: 'trace-street', label: '🗺️ Trace Nearest Street/Path' },
          { id: 'two-buildings', label: '🏘️ Two Buildings' },
          { id: 'restaurant-interior', label: '🍽️ Restaurant Interior' },
          { id: 'train-platform', label: '🚆 Train Platform' },
          { id: 'park', label: '🌲 Park' },
          { id: 'grocery-store', label: '🛒 Grocery Store Aisle' },
          { id: 'place-of-worship', label: '🏛️ Place of Worship' },
          { id: 'streets-traced', label: '🗺️ ½ Mile of Streets Traced' },
          { id: 'tallest-mountain', label: '⛰️ Tallest Mountain Visible from Station' },
          { id: 'body-of-water', label: '💧 Biggest Body of Water in Your Zone' },
          { id: 'five-buildings', label: '🏙️ Five Buildings' },
        ],
      },
    ];

    const notes = pages
      .map((page) => {
        if (page.title === 'photos') {
          const list = page.fields.map((field) => {
            const value = localStorage.getItem(prefix + page.title + '.' + field.id);
            const done = value === 'true' ? 'x' : ' ';
            return `- [${done}] ${field.label}`;
          });
          return `# ${titleize(page.title)}\n\n${list.join('\n')}`;
        }
        const pageNotes = page.fields
          .map((field) => {
            const value = localStorage.getItem(prefix + page.title + '.' + field.id);
            if (!value) {
              return null;
            }
            if (page.title === 'radar' && field.id === 'choose') {
              const label = localStorage.getItem(prefix + page.title + '.' + field.id + '.label');
              return `## ${field.label}: ${label}\n\n${value}`;
            }
            return `## ${field.label}\n\n${value}`;
          })
          .filter((value) => value !== null)
          .join('\n\n');
        if (!pageNotes) {
          return null;
        }
        return `# ${titleize(page.title)}\n\n${pageNotes}`;
      })
      .filter((value) => value !== null)
      .join('\n\n');

    const blob = new Blob([notes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `game-data.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

customElements.define('export-button', ExportButton);
