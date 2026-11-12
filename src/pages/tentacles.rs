use crate::{components::PersistentInput, constants, units::use_units};
use yew::prelude::*;

#[function_component(Tentacles)]
pub fn tentacles_mode() -> Html {
    let units = use_units();
    let constants::GameMode { title, categories } = constants::tentacles_mode();

    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ title }</div>
                <div class="game-info">
                    { "Cost: " }
                    <span>{ "Draw 4, Pick 2" }</span>
                    { " Time: " }
                    <span>{ "5 Minutes" }</span>
                </div>
            </div>
            <div class="game-question">
                { "Of all the " }
                <span class="light">{ "Places" }</span>
                { " within " }
                <span class="heavy">{ "Distance" }</span>
                { " of me, which are you closest to?" }
                <div class="sub-note">
                    { "(You must also be within " }
                    <span class="heavy">{ "Distance" }</span>
                    { ")" }
                </div>
            </div>
            { for categories.iter().map(|cat| html! {
                <div class="category">
                    <div class="category-title">
                        { cat.title }{ ": " }
                        <span>{ cat.distance(units).unwrap_or_default() }</span>
                    </div>
                    { for cat.fields.iter().map(|item| html! {
                        <PersistentInput
                            id={format!("{}.{}", title, item.id)}
                            label={ item.label(units) }
                        />
                    }) }
                </div>
            }) }
        </div>
    }
}
