use serde::{Deserialize, Serialize};
use std::sync::OnceLock;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Field {
    pub id: String,
    pub label: String,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Category {
    pub title: String,
    pub distance: Option<u32>,
    pub fields: Vec<Field>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GameMode {
    pub title: String,
    pub categories: Vec<Category>,
}

#[derive(Debug, Serialize, Deserialize)]
struct GameModesConfig {
    game_modes: Vec<GameMode>,
}

const GAME_MODES_TOML: &str = include_str!("../game_modes.toml");
static GAME_MODES_DATA: OnceLock<Vec<GameMode>> = OnceLock::new();

fn load_game_modes() -> Vec<GameMode> {
    let config: GameModesConfig =
        toml::from_str(GAME_MODES_TOML).expect("Failed to parse game_modes.toml");
    config.game_modes
}

pub fn get_game_modes() -> &'static Vec<GameMode> {
    GAME_MODES_DATA.get_or_init(load_game_modes)
}

static MATCHING_MODE_INTERNAL: OnceLock<&GameMode> = OnceLock::new();
static MEASURING_MODE_INTERNAL: OnceLock<&GameMode> = OnceLock::new();
static THERMOMETER_MODE_INTERNAL: OnceLock<&GameMode> = OnceLock::new();
static RADAR_MODE_INTERNAL: OnceLock<&GameMode> = OnceLock::new();
static TENTACLES_MODE_INTERNAL: OnceLock<&GameMode> = OnceLock::new();
static PHOTOS_MODE_INTERNAL: OnceLock<&GameMode> = OnceLock::new();

pub fn matching_mode() -> &'static GameMode {
    MATCHING_MODE_INTERNAL.get_or_init(|| {
        get_game_modes()
            .iter()
            .find(|gm| gm.title == "matching")
            .expect("matching mode not found")
    })
}

pub fn measuring_mode() -> &'static GameMode {
    MEASURING_MODE_INTERNAL.get_or_init(|| {
        get_game_modes()
            .iter()
            .find(|gm| gm.title == "measuring")
            .expect("measuring mode not found")
    })
}

pub fn thermometer_mode() -> &'static GameMode {
    THERMOMETER_MODE_INTERNAL.get_or_init(|| {
        get_game_modes()
            .iter()
            .find(|gm| gm.title == "thermometer")
            .expect("thermometer mode not found")
    })
}

pub fn radar_mode() -> &'static GameMode {
    RADAR_MODE_INTERNAL.get_or_init(|| {
        get_game_modes()
            .iter()
            .find(|gm| gm.title == "radar")
            .expect("radar mode not found")
    })
}

pub fn tentacles_mode() -> &'static GameMode {
    TENTACLES_MODE_INTERNAL.get_or_init(|| {
        get_game_modes()
            .iter()
            .find(|gm| gm.title == "tentacles")
            .expect("tentacles mode not found")
    })
}

pub fn photos_mode() -> &'static GameMode {
    PHOTOS_MODE_INTERNAL.get_or_init(|| {
        get_game_modes()
            .iter()
            .find(|gm| gm.title == "photos")
            .expect("photos mode not found")
    })
}
