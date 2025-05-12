use gloo_utils::errors::JsError;
use implicit_clone::unsync::IString;
use std::{collections::HashMap, convert::Into};
use wasm_bindgen::{JsCast, JsValue, UnwrapThrowExt};

static PREFIX: &str = "gameNotes.";

/// Error returned by this crate
#[derive(Debug, thiserror::Error)]
pub enum StorageError {
    /// Error if the requested key is not found
    #[error("key {0} not found")]
    KeyNotFound(String),
    /// Error returned from JavaScript
    #[error("{0}")]
    JsError(JsError),
}

fn js_to_error(js_value: JsValue) -> StorageError {
    match js_value.dyn_into::<js_sys::Error>() {
        Ok(error) => StorageError::JsError(JsError::from(error)),
        Err(_) => unreachable!("JsValue passed is not an Error type - this is a bug"),
    }
}

#[derive(Debug)]
pub struct LocalStorage;

impl LocalStorage {
    fn raw() -> web_sys::Storage {
        web_sys::window()
            .expect_throw("no window")
            .local_storage()
            .expect_throw("failed to get local_storage")
            .expect_throw("no local storage")
    }

    /// Get the value for the specified key
    pub fn get(key: impl AsRef<str>) -> Result<IString, StorageError> {
        let key = format!("{}{}", PREFIX, key.as_ref());
        let item = Self::raw()
            .get_item(&key)
            .expect_throw("unreachable: get_item does not throw an exception")
            .ok_or_else(|| StorageError::KeyNotFound(key.to_string()))?;
        let item = Into::<IString>::into(item.to_string());
        Ok(item)
    }

    /// Get all the stored keys and their values
    pub fn get_all() -> HashMap<IString, IString> {
        let local_storage = Self::raw();
        (0..=Self::length())
            .filter_map(
                |index| match local_storage.key(index).map_err(js_to_error) {
                    Ok(Some(key)) if key.starts_with(PREFIX) => {
                        match local_storage.get_item(&key) {
                            Ok(Some(value)) => {
                                Some((key.into(), Into::<IString>::into(value.to_string())))
                            }
                            _ => None,
                        }
                    }
                    _ => None,
                },
            )
            .collect::<HashMap<_, _>>()
    }

    /// Insert a value for the specified key
    pub fn set(key: impl AsRef<str>, value: &IString) -> Result<(), StorageError> {
        let key = format!("{}{}", PREFIX, key.as_ref());
        Self::raw().set_item(&key, value).map_err(js_to_error)?;
        Ok(())
    }

    /// Get the number of items stored
    fn length() -> u32 {
        Self::raw()
            .length()
            .expect_throw("unreachable: length does not throw an exception")
    }

    /// Delete all data from the localstorage
    pub fn clear() {
        let local_storage = Self::raw();
        let keys = (0..=Self::length())
            .filter_map(
                |index| match local_storage.key(index).map_err(js_to_error) {
                    Ok(Some(key)) if key.starts_with(PREFIX) => Some(key),
                    _ => None,
                },
            )
            .collect::<Vec<_>>();
        for key in keys.iter() {
            local_storage
                .remove_item(&key)
                .expect_throw("unreachable: remove_item does not throw an exception");
        }
    }
}
