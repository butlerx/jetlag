use std::fmt;
use wasm_bindgen::UnwrapThrowExt;
use yew::prelude::*;

/// Stored outside the `gameNotes.` prefix so "Clear Game" keeps the preference.
const STORAGE_KEY: &str = "settings.units";

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Units {
    #[default]
    Imperial,
    Metric,
}

impl Units {
    fn as_str(self) -> &'static str {
        match self {
            Units::Imperial => "imperial",
            Units::Metric => "metric",
        }
    }

    fn storage() -> Option<web_sys::Storage> {
        web_sys::window()?.local_storage().ok()?
    }

    pub fn load() -> Self {
        match Self::storage().and_then(|s| s.get_item(STORAGE_KEY).ok().flatten()) {
            Some(v) if v == "metric" => Units::Metric,
            _ => Units::Imperial,
        }
    }

    pub fn save(self) {
        if let Some(storage) = Self::storage() {
            storage
                .set_item(STORAGE_KEY, self.as_str())
                .expect_throw("failed to set local storage");
        }
    }
}

impl fmt::Display for Units {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Units::Imperial => write!(f, "Miles"),
            Units::Metric => write!(f, "Kilometres"),
        }
    }
}

pub type UnitsContext = UseStateHandle<Units>;

/// Current unit preference. Falls back to imperial outside a provider.
#[hook]
pub fn use_units() -> Units {
    use_context::<UnitsContext>().map_or_else(Units::default, |ctx| *ctx)
}
