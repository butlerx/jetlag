export const PREFIX = 'gameNotes.';

/**
 * @typedef {Object} Field
 * @property {string} id - The unique identifier for the field
 * @property {string} label - The label for the field
 * @property {string} [description] - The description for the field (optional)
 *
 * @typedef {Object} Category
 * @property {string} title - The title of the category
 * @property {number} [distance] - The distance associated with the category (optional)
 * @property {Array<Field>} fields - The fields of the category
 *
 * @typedef {Object} GamePage
 * @prop {string} title - The title of the game page
 * @prop {Array<Category>} categories - The categories of the game page
 */

export const MATCHING_MODE = {
  title: 'matching',
  categories: [
    {
      title: 'Transit',
      fields: [
        { id: 'commercial-airport', label: '✈️ Commercial Airport' },
        { id: 'transit-line', label: '🚆 Transit Line' },
        { id: 'station-name-length', label: "📏 Station's Name Length" },
        { id: 'street-path', label: '🛣️ Street or Path' },
      ],
    },
    {
      title: 'Administrative Divisions',
      fields: [
        { id: 'admin-div-1', label: '🗺️ 1st Admin. Division' },
        { id: 'admin-div-2', label: '📍 2nd Admin. Division' },
        { id: 'admin-div-3', label: '🏙️ 3rd Admin. Division' },
        { id: 'admin-div-4', label: '🏘️ 4th Admin. Division' },
      ],
    },
    {
      title: 'Natural',
      fields: [
        { id: 'mountain', label: '⛰️ Mountain' },
        { id: 'landmass', label: '🏝️ Landmass' },
        { id: 'park', label: '🌳 Park' },
      ],
    },
    {
      title: 'Places of Interest',
      fields: [
        { id: 'amusement-park', label: '🎢 Amusement Park' },
        { id: 'zoo', label: '🦁 Zoo' },
        { id: 'aquarium', label: '🐠 Aquarium' },
        { id: 'golf-course', label: '⛳ Golf Course' },
        { id: 'museum', label: '🏛️ Museum' },
        { id: 'movie-theater', label: '🎬 Movie Theater' },
      ],
    },
    {
      title: 'Public Utilities',
      fields: [
        { id: 'hospital', label: '🏥 Hospital' },
        { id: 'library', label: '📚 Library' },
        { id: 'foreign-consulate', label: '🏛️🌍 Foreign Consulate' },
      ],
    },
  ],
};

export const MEASURING_MODE = {
  title: 'measuring',
  categories: [
    {
      title: 'Transit',
      fields: [
        { id: 'commercial-airport', label: '✈️ Commercial Airport' },
        { id: 'transit-line', label: '🚄 A High Speed Train Line' },
        { id: 'rail-station', label: '🚉 A Rail Station' },
      ],
    },
    {
      title: 'Borders',
      fields: [
        { id: 'international-border', label: '🌍 An International Border' },
        { id: 'admin-div-1', label: '🗺️ A 1st Admin. Div. Border' },
        { id: 'admin-div-2', label: '📍 A 2nd Admin. Div. Border' },
      ],
    },
    {
      title: 'Natural',
      fields: [
        { id: 'sea-level', label: '🌊 Sea Level' },
        { id: 'body-of-water', label: '💧 A Body of Water' },
        { id: 'coastline', label: '🏖️ A Coastline' },
        { id: 'mountain', label: '⛰️ A Mountain' },
        { id: 'park', label: '🌳 A Park' },
      ],
    },
    {
      title: 'Places of Interest',
      fields: [
        { id: 'amusement-park', label: '🎢 An Amusement Park' },
        { id: 'zoo', label: '🦁 A Zoo' },
        { id: 'aquarium', label: '🐠 An Aquarium' },
        { id: 'golf-course', label: '⛳ A Golf Course' },
        { id: 'museum', label: '🏛️ A Museum' },
        { id: 'movie-theater', label: '🎬 A Movie Theater' },
      ],
    },
    {
      title: 'Public Utilities',
      fields: [
        { id: 'hospital', label: '🏥 A Hospital' },
        { id: 'library', label: '📚 A Library' },
        { id: 'consulate', label: '🏛️🌍 A Foreign Consulate' },
      ],
    },
  ],
};

export const THERMOMETER_MODE = {
  title: 'thermometer',
  categories: [
    {
      title: 'All Games',
      fields: [
        { id: 'half-mile', label: '🔥 ½ Mile' },
        { id: 'three-miles', label: '🔥 3 Miles' },
      ],
    },
    { title: 'Medium Games', fields: [{ id: 'ten-miles', label: '🌡️ 10 Miles' }] },
    { title: 'Large Games', fields: [{ id: 'fifty-miles', label: '❄️ 50 Miles' }] },
  ],
};

export const RADAR_MODE = {
  title: 'radar',
  categories: [
    {
      title: 'All Games',
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
        { id: 'choose', label: '🎯 Choose' },
      ],
    },
  ],
};

export const TENTACLES_MODE = {
  title: 'tentacles',
  categories: [
    {
      title: 'Medium & Large Games',
      distance: 1,
      fields: [
        { id: 'museums', label: '🏛️ Museums' },
        { id: 'libraries', label: '📚 Libraries' },
        { id: 'movie-theaters', label: '🎬 Movie Theaters' },
        { id: 'hospitals', label: '🏥 Hospitals' },
      ],
    },
    {
      title: 'Large Games Only',
      distance: 15,
      fields: [
        { id: 'metro-lines', label: '🚇 Metro Lines' },
        { id: 'zoos', label: '🦁 Zoos' },
        { id: 'aquariums', label: '🐠 Aquariums' },
        { id: 'amusement-parks', label: '🎢 Amusement Parks' },
      ],
    },
  ],
};

export const PHOTOS_MODE = {
  title: 'photos',
  categories: [
    {
      title: 'All Games',
      fields: [
        { id: 'tree', label: '🌳 A Tree', description: 'Must include the entire tree.' },
        {
          id: 'sky',
          label: '☁️ The Sky',
          description: 'Place phone on ground, shoot directly up.',
        },
        {
          id: 'you',
          label: '🤳 You',
          description: 'Selfie mode. Arm parallel to the ground, fully extended.',
        },
        {
          id: 'widest-street',
          label: '🛣️ Widest Street',
          description: 'Must include both sides of the street.',
        },
        {
          id: 'tallest-structure',
          label: '🏙️ Tallest Structure in Your Sightline',
          description:
            'Tallest from your current perspective/sightline. Must include top and both sides. The top must be in the top ½ of the frame.',
        },
        {
          id: 'building-from-station',
          label: '🚉 Any Building Visible from Station',
          description:
            'Must stand directly outside transit station entrance. If multiple entrances, you may choose. Must include roof, both sides, with the top of building in top ½ of the frame.',
        },
      ],
    },
    {
      title: 'Add for Medium & Large',
      fields: [
        {
          id: 'tallest-building-from-station',
          label: '🏢 Tallest Building Visible from Station',
          description:
            'Tallest from your perspective/sightline. Must stand directly outside transit station entrance. If multiple entrances, you may choose. Must include roof, both sides, with the top of building in top ½ of the frame.',
        },
        {
          id: 'trace-street',
          label: '🗺️ Trace Nearest Street/Path',
          description:
            'Street/path must be visible on mapping app. Trace intersection to intersection.',
        },
        {
          id: 'two-buildings',
          label: '🏘️ Two Buildings',
          description: 'Must include bottom and up to four stories.',
        },
        {
          id: 'restaurant-interior',
          label: '🍽️ Restaurant Interior',
          description:
            'No zoom. Must take the picture through the window from outside the restaurant.',
        },
        {
          id: 'train-platform',
          label: '🚆 Train Platform',
          description: "Must include a 5' x 5' section with three distinct elements.",
        },
        {
          id: 'park',
          label: '🌲 Park',
          description:
            "No zoom, phone perpendicular to ground. Must stand 5' from any obstruction.",
        },
        {
          id: 'grocery-store',
          label: '🛒 Grocery Store Aisle',
          description: 'No zoom. Stand at the end of the aisle, shoot directly down.',
        },
        {
          id: 'place-of-worship',
          label: '🏛️ Place of Worship',
          description: "Must include a 5' x 5' section with three distinct elements.",
        },
      ],
    },
    {
      title: 'Add for Large',
      fields: [
        {
          id: 'streets-traced',
          label: '🗺️ ½ Mile of Streets Traced',
          description:
            'Must be continuous, including 5 turns, no doubling back. Send N-S oriented. Streets must appear on mapping app.',
        },
        {
          id: 'tallest-mountain',
          label: '⛰️ Tallest Mountain Visible from Station',
          description:
            'Tallest from your perspective/sightline. Max 3x zoom. Top of mountain must be in top ½ of frame.',
        },
        {
          id: 'body-of-water',
          label: '💧 Biggest Body of Water in Your Zone',
          description:
            'Max 3x zoom. Must include either both sides of body of water or the horizon.',
        },
        {
          id: 'five-buildings',
          label: '🏙️ Five Buildings',
          description: 'Must include bottom and up to four stories.',
        },
      ],
    },
  ],
};

// Game data structure definition
/** @type {Array<GamePage>} */
export const GAME_PAGES = [
  MATCHING_MODE,
  MEASURING_MODE,
  THERMOMETER_MODE,
  RADAR_MODE,
  TENTACLES_MODE,
  PHOTOS_MODE,
];
