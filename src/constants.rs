#[derive(Debug)]
pub struct Field {
    pub id: &'static str,
    pub label: &'static str,
    pub description: Option<&'static str>,
}

#[derive(Debug)]
pub struct Category {
    pub title: &'static str,
    pub distance: Option<u32>,
    pub fields: &'static [Field],
}

#[derive(Debug)]
pub struct GameMode {
    pub title: &'static str,
    pub categories: &'static [Category],
}

// MATCHING_MODE
pub static MATCHING_MODE: GameMode = GameMode {
    title: "matching",
    categories: &[
        Category {
            title: "Transit",
            distance: None,
            fields: &[
                Field {
                    id: "commercial-airport",
                    label: "✈️ Commercial Airport",
                    description: None,
                },
                Field {
                    id: "transit-line",
                    label: "🚆 Transit Line",
                    description: None,
                },
                Field {
                    id: "station-name-length",
                    label: "📏 Station's Name Length",
                    description: None,
                },
                Field {
                    id: "street-path",
                    label: "🛣️ Street or Path",
                    description: None,
                },
            ],
        },
        Category {
            title: "Administrative Divisions",
            distance: None,
            fields: &[
                Field {
                    id: "admin-div-1",
                    label: "🗺️ 1st Admin. Division",
                    description: None,
                },
                Field {
                    id: "admin-div-2",
                    label: "📍 2nd Admin. Division",
                    description: None,
                },
                Field {
                    id: "admin-div-3",
                    label: "🏙️ 3rd Admin. Division",
                    description: None,
                },
                Field {
                    id: "admin-div-4",
                    label: "🏘️ 4th Admin. Division",
                    description: None,
                },
            ],
        },
        Category {
            title: "Natural",
            distance: None,
            fields: &[
                Field {
                    id: "mountain",
                    label: "⛰️ Mountain",
                    description: None,
                },
                Field {
                    id: "landmass",
                    label: "🏝️ Landmass",
                    description: None,
                },
                Field {
                    id: "park",
                    label: "🌳 Park",
                    description: None,
                },
            ],
        },
        Category {
            title: "Places of Interest",
            distance: None,
            fields: &[
                Field {
                    id: "amusement-park",
                    label: "🎢 Amusement Park",
                    description: None,
                },
                Field {
                    id: "zoo",
                    label: "🦁 Zoo",
                    description: None,
                },
                Field {
                    id: "aquarium",
                    label: "🐠 Aquarium",
                    description: None,
                },
                Field {
                    id: "golf-course",
                    label: "⛳ Golf Course",
                    description: None,
                },
                Field {
                    id: "museum",
                    label: "🏛️ Museum",
                    description: None,
                },
                Field {
                    id: "movie-theater",
                    label: "🎬 Movie Theater",
                    description: None,
                },
            ],
        },
        Category {
            title: "Public Utilities",
            distance: None,
            fields: &[
                Field {
                    id: "hospital",
                    label: "🏥 Hospital",
                    description: None,
                },
                Field {
                    id: "library",
                    label: "📚 Library",
                    description: None,
                },
                Field {
                    id: "foreign-consulate",
                    label: "🏛️🌍 Foreign Consulate",
                    description: None,
                },
            ],
        },
    ],
};

// MEASURING_MODE
pub static MEASURING_MODE: GameMode = GameMode {
    title: "measuring",
    categories: &[
        Category {
            title: "Transit",
            distance: None,
            fields: &[
                Field {
                    id: "commercial-airport",
                    label: "✈️ Commercial Airport",
                    description: None,
                },
                Field {
                    id: "transit-line",
                    label: "🚄 A High Speed Train Line",
                    description: None,
                },
                Field {
                    id: "rail-station",
                    label: "🚉 A Rail Station",
                    description: None,
                },
            ],
        },
        Category {
            title: "Borders",
            distance: None,
            fields: &[
                Field {
                    id: "international-border",
                    label: "🌍 An International Border",
                    description: None,
                },
                Field {
                    id: "admin-div-1",
                    label: "🗺️ A 1st Admin. Div. Border",
                    description: None,
                },
                Field {
                    id: "admin-div-2",
                    label: "📍 A 2nd Admin. Div. Border",
                    description: None,
                },
            ],
        },
        Category {
            title: "Natural",
            distance: None,
            fields: &[
                Field {
                    id: "sea-level",
                    label: "🌊 Sea Level",
                    description: None,
                },
                Field {
                    id: "body-of-water",
                    label: "💧 A Body of Water",
                    description: None,
                },
                Field {
                    id: "coastline",
                    label: "🏖️ A Coastline",
                    description: None,
                },
                Field {
                    id: "mountain",
                    label: "⛰️ A Mountain",
                    description: None,
                },
                Field {
                    id: "park",
                    label: "🌳 A Park",
                    description: None,
                },
            ],
        },
        Category {
            title: "Places of Interest",
            distance: None,
            fields: &[
                Field {
                    id: "amusement-park",
                    label: "🎢 An Amusement Park",
                    description: None,
                },
                Field {
                    id: "zoo",
                    label: "🦁 A Zoo",
                    description: None,
                },
                Field {
                    id: "aquarium",
                    label: "🐠 An Aquarium",
                    description: None,
                },
                Field {
                    id: "golf-course",
                    label: "⛳ A Golf Course",
                    description: None,
                },
                Field {
                    id: "museum",
                    label: "🏛️ A Museum",
                    description: None,
                },
                Field {
                    id: "movie-theater",
                    label: "🎬 A Movie Theater",
                    description: None,
                },
            ],
        },
        Category {
            title: "Public Utilities",
            distance: None,
            fields: &[
                Field {
                    id: "hospital",
                    label: "🏥 A Hospital",
                    description: None,
                },
                Field {
                    id: "library",
                    label: "📚 A Library",
                    description: None,
                },
                Field {
                    id: "consulate",
                    label: "🏛️🌍 A Foreign Consulate",
                    description: None,
                },
            ],
        },
    ],
};

// THERMOMETER_MODE
pub static THERMOMETER_MODE: GameMode = GameMode {
    title: "thermometer",
    categories: &[
        Category {
            title: "All Games",
            distance: None,
            fields: &[
                Field {
                    id: "half-mile",
                    label: "🔥 ½ Mile",
                    description: None,
                },
                Field {
                    id: "three-miles",
                    label: "🔥 3 Miles",
                    description: None,
                },
            ],
        },
        Category {
            title: "Medium Games",
            distance: None,
            fields: &[Field {
                id: "ten-miles",
                label: "🌡️ 10 Miles",
                description: None,
            }],
        },
        Category {
            title: "Large Games",
            distance: None,
            fields: &[Field {
                id: "fifty-miles",
                label: "❄️ 50 Miles",
                description: None,
            }],
        },
    ],
};

// RADAR_MODE
pub static RADAR_MODE: GameMode = GameMode {
    title: "radar",
    categories: &[Category {
        title: "All Games",
        distance: None,
        fields: &[
            Field {
                id: "quarter-mile",
                label: "📍 ¼ Mile",
                description: None,
            },
            Field {
                id: "half-mile",
                label: "📍 ½ Mile",
                description: None,
            },
            Field {
                id: "one-mile",
                label: "📍 1 Mile",
                description: None,
            },
            Field {
                id: "three-miles",
                label: "📍 3 Miles",
                description: None,
            },
            Field {
                id: "five-miles",
                label: "📍 5 Miles",
                description: None,
            },
            Field {
                id: "ten-miles",
                label: "🔍 10 Miles",
                description: None,
            },
            Field {
                id: "twenty-five-miles",
                label: "🔍 25 Miles",
                description: None,
            },
            Field {
                id: "fifty-miles",
                label: "🌐 50 Miles",
                description: None,
            },
            Field {
                id: "hundred-miles",
                label: "🌐 100 Miles",
                description: None,
            },
            Field {
                id: "choose",
                label: "🎯 Choose",
                description: None,
            },
        ],
    }],
};

// TENTACLES_MODE
pub static TENTACLES_MODE: GameMode = GameMode {
    title: "tentacles",
    categories: &[
        Category {
            title: "Medium & Large Games",
            distance: Some(1),
            fields: &[
                Field {
                    id: "museums",
                    label: "🏛️ Museums",
                    description: None,
                },
                Field {
                    id: "libraries",
                    label: "📚 Libraries",
                    description: None,
                },
                Field {
                    id: "movie-theaters",
                    label: "🎬 Movie Theaters",
                    description: None,
                },
                Field {
                    id: "hospitals",
                    label: "🏥 Hospitals",
                    description: None,
                },
            ],
        },
        Category {
            title: "Large Games Only",
            distance: Some(15),
            fields: &[
                Field {
                    id: "metro-lines",
                    label: "🚇 Metro Lines",
                    description: None,
                },
                Field {
                    id: "zoos",
                    label: "🦁 Zoos",
                    description: None,
                },
                Field {
                    id: "aquariums",
                    label: "🐠 Aquariums",
                    description: None,
                },
                Field {
                    id: "amusement-parks",
                    label: "🎢 Amusement Parks",
                    description: None,
                },
            ],
        },
    ],
};

// PHOTOS_MODE
pub static PHOTOS_MODE: GameMode = GameMode {
    title: "photos",
    categories: &[
        Category {
            title: "All Games",
            distance: None,
            fields: &[
                Field { id: "tree", label: "🌳 A Tree", description: Some("Must include the entire tree.") },
                Field { id: "sky", label: "☁️ The Sky", description: Some("Place phone on ground, shoot directly up.") },
                Field { id: "you", label: "🤳 You", description: Some("Selfie mode. Arm parallel to the ground, fully extended.") },
                Field { id: "widest-street", label: "🛣️ Widest Street", description: Some("Must include both sides of the street.") },
                Field { id: "tallest-structure", label: "🏙️ Tallest Structure in Your Sightline", description: Some("Tallest from your current perspective/sightline. Must include top and both sides. The top must be in the top ½ of the frame.") },
                Field { id: "building-from-station", label: "🚉 Any Building Visible from Station", description: Some("Must stand directly outside transit station entrance. If multiple entrances, you may choose. Must include roof, both sides, with the top of building in top ½ of the frame.") },
            ],
        },
        Category {
            title: "Add for Medium & Large",
            distance: None,
            fields: &[
                Field { id: "tallest-building-from-station", label: "🏢 Tallest Building Visible from Station", description: Some("Tallest from your perspective/sightline. Must stand directly outside transit station entrance. If multiple entrances, you may choose. Must include roof, both sides, with the top of building in top ½ of the frame.") },
                Field { id: "trace-street", label: "🗺️ Trace Nearest Street/Path", description: Some("Street/path must be visible on mapping app. Trace intersection to intersection.") },
                Field { id: "two-buildings", label: "🏘️ Two Buildings", description: Some("Must include bottom and up to four stories.") },
                Field { id: "restaurant-interior", label: "🍽️ Restaurant Interior", description: Some("No zoom. Must take the picture through the window from outside the restaurant.") },
                Field { id: "train-platform", label: "🚆 Train Platform", description: Some("Must include a 5' x 5' section with three distinct elements.") },
                Field { id: "park", label: "🌲 Park", description: Some("No zoom, phone perpendicular to ground. Must stand 5' from any obstruction.") },
                Field { id: "grocery-store", label: "🛒 Grocery Store Aisle", description: Some("No zoom. Stand at the end of the aisle, shoot directly down.") },
                Field { id: "place-of-worship", label: "🏛️ Place of Worship", description: Some("Must include a 5' x 5' section with three distinct elements.") },
            ],
        },
        Category {
            title: "Add for Large",
            distance: None,
            fields: &[
                Field { id: "streets-traced", label: "🗺️ ½ Mile of Streets Traced", description: Some("Must be continuous, including 5 turns, no doubling back. Send N-S oriented. Streets must appear on mapping app.") },
                Field { id: "tallest-mountain", label: "⛰️ Tallest Mountain Visible from Station", description: Some("Tallest from your perspective/sightline. Max 3x zoom. Top of mountain must be in top ½ of frame.") },
                Field { id: "body-of-water", label: "💧 Biggest Body of Water in Your Zone", description: Some("Max 3x zoom. Must include either both sides of body of water or the horizon.") },
                Field { id: "five-buildings", label: "🏙️ Five Buildings", description: Some("Must include bottom and up to four stories.") },
            ],
        },
    ],
};

// GAME_PAGES array
pub static GAME_PAGES: &[&GameMode] = &[
    &MATCHING_MODE,
    &MEASURING_MODE,
    &THERMOMETER_MODE,
    &RADAR_MODE,
    &TENTACLES_MODE,
    &PHOTOS_MODE,
];
