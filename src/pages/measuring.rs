use crate::{components::PersistentInput, constants::MEASURING_MODE};
use yew::prelude::*;

#[function_component(Measuring)]
pub fn measuring_mode() -> Html {
    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ &MEASURING_MODE.title }</div>
                <div class="game-info">
                    { "Cost: " }
                    <span>{ "Draw 3, Pick 1" }</span>
                    { " Time: " }
                    <span>{ "5 Minutes" }</span>
                </div>
            </div>
            <div class="game-question">
                { "Compared to me, are you closer to or further from _______?" }
            </div>
            { for MEASURING_MODE.categories.iter().map(|cat| html! {
                    <div class="category">
                        <div class="category-title">{ &cat.title }{":"}</div>
                        { for cat.fields.iter().map(|item| html! {
                            <PersistentInput
                                id={format!("{}.{}", MEASURING_MODE.title, item.id)}
                                label={item.label}
                            />
                        }) }
                    </div>
                }) }
        </div>
    }
}
