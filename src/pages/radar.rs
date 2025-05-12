use crate::{
    components::{PersistentInput, PersistentInputCustomLabel},
    constants::RADAR_MODE,
};
use yew::prelude::*;

#[function_component(Radar)]
pub fn radar_mode() -> Html {
    let category = &RADAR_MODE.categories[0];
    let inputs = category
        .fields
        .iter()
        .filter(|item| item.id != "choose")
        .map(|item| {
            let id = format!("{}.{}", RADAR_MODE.title, item.id);
            html! { <PersistentInput id={id.clone()} label={item.label} /> }
        });

    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ RADAR_MODE.title }</div>
                <div class="game-info">
                    { "Cost: " }
                    <span>{ "Draw 2, Pick 1" }</span>
                    { " Time: " }
                    <span>{ "5 Minutes" }</span>
                </div>
            </div>
            <div class="game-question">
                { "Are you within " }
                <span class="light">{ "Distance" }</span>
                { " of me?" }
            </div>
            <div class="category">
                <div class="category-title">{ category.title }</div>
                { for inputs }
                <PersistentInputCustomLabel id="radar.choose" label="🎯CHOOSE" />
            </div>
        </div>
    }
}
