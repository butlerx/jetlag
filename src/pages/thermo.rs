use crate::{components::PersistentInput, constants::THERMOMETER_MODE};
use yew::prelude::*;

#[function_component(Thermo)]
pub fn thermo_mode() -> Html {
    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ THERMOMETER_MODE.title }</div>
                <div class="game-info">
                    { "Cost: " }
                    <span>{ "Draw 2, Pick 1" }</span>
                    { " Time: " }
                    <span>{ "5 Minutes" }</span>
                </div>
            </div>
            <div class="game-question">
                { "I've just traveled (at least) " }
                <span class="light">{ "Distance" }</span>
                { ". Am I hotter or colder?" }
            </div>
            { for THERMOMETER_MODE.categories.iter().map(|cat| {
                html! {
                    <div class="category">
                        <div class="category-title">{ cat.title }</div>
                        { for cat.fields.iter().map(|item| {
                                let id = format!("{}.{}", THERMOMETER_MODE.title, item.id);
                                html! { <PersistentInput id={id} label={ item.label }/> }
                        }) }
                    </div>
                }
            }) }
        </div>
    }
}
