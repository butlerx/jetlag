use crate::{components::PersistentInput, constants};
use yew::prelude::*;

#[function_component(Matching)]
pub fn matching_mode() -> Html {
    let constants::GameMode { title, categories } = constants::matching_mode();
    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ &title }</div>
                <div class="game-info">
                    { "Cost: " }
                    <span>{ "Draw 3, Pick 1" }</span>
                    { " Time: " }
                    <span>{ "5 Minutes" }</span>
                </div>
            </div>
            <div class="game-question">
                { "Is your nearest ______ the same as my nearest ______?" }
            </div>
            { for categories.iter().map(|cat| html! {
                    <div class="category">
                        <div class="category-title">{ &cat.title }{":"}</div>
                        { for cat.fields.iter().map(|item| html! {
                            <PersistentInput
                                id={format!("{}.{}", title, item.id)}
                                label={item.label}
                            />
                        }) }
                    </div>
                }) }
        </div>
    }
}
