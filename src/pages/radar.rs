use crate::{
    components::{PersistentInput, PersistentInputCustomLabel},
    constants,
};
use yew::prelude::*;

#[function_component(Radar)]
pub fn radar_mode() -> Html {
    let constants::GameMode { title, categories } = constants::radar_mode();

    let inputs = categories[0]
        .fields
        .iter()
        .filter(|item| item.id != "choose")
        .map(|item|
            html! { <PersistentInput id={format!("{}.{}", title, item.id)} label={item.label} /> }
        );

    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ title }</div>
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
                <div class="category-title">{ categories[0].title }</div>
                { for inputs }
                <PersistentInputCustomLabel id="radar.choose" label="🎯CHOOSE" />
            </div>
        </div>
    }
}
