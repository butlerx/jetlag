use crate::units::Units;

#[derive(Debug)]
pub struct Field {
    pub id: &'static str,
    pub label: &'static str,
    pub label_metric: Option<&'static str>,
    pub description: Option<&'static str>,
    pub description_metric: Option<&'static str>,
}

impl Field {
    /// Label in the requested units, falling back to the default label.
    pub fn label(&self, units: Units) -> &'static str {
        match units {
            Units::Metric => self.label_metric.unwrap_or(self.label),
            Units::Imperial => self.label,
        }
    }

    /// Description in the requested units, falling back to the default description.
    pub fn description(&self, units: Units) -> Option<&'static str> {
        match units {
            Units::Metric => self.description_metric.or(self.description),
            Units::Imperial => self.description,
        }
    }
}

#[derive(Debug)]
pub struct Category {
    pub title: &'static str,
    pub distance: Option<&'static str>,
    pub distance_metric: Option<&'static str>,
    pub fields: &'static [Field],
}

impl Category {
    /// Distance in the requested units, falling back to the default distance.
    pub fn distance(&self, units: Units) -> Option<&'static str> {
        match units {
            Units::Metric => self.distance_metric.or(self.distance),
            Units::Imperial => self.distance,
        }
    }
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
