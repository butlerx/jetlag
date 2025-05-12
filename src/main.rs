#![warn(clippy::pedantic)]
mod app;
mod components;
mod constants;
mod pages;
mod storage;

use app::{App, Route};

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    yew::Renderer::<App>::new().render();
}
