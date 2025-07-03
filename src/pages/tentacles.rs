use crate::{components::PersistentInput, constants};
use yew::prelude::*;

#[function_component(Tentacles)]
pub fn tentacles_mode() -> Html {
    let constants::GameMode { title, categories } = constants::tentacles_mode();

    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ title.clone() }</div>
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
            { for categories.iter().map(|cat| {

                html! {
                    <div class="category">
                        <div class="category-title">
                            { cat.title.clone() }{ ": " }
                            <span>{ format!("{} Miles", cat.distance.unwrap_or(0)) }</span>
                        </div>
                        { for cat.fields.iter().map(|item| {
                            let id = format!("{}.{}", title, item.id);
                            html! { <PersistentInput {id} label={ item.label.clone() } /> }
                        }) }
                    </div>
                }
            }) }
        </div>
    }
}
