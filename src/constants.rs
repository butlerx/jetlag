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

// Include the generated game modes from build.rs
include!(concat!(env!("GAME_MODES_FILE")));

pub fn get_game_modes() -> &'static [GameMode] {
    GAME_MODES
}
