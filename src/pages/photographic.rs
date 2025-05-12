use crate::{components::PersistentCheckbox, constants::PHOTOS_MODE};
use yew::prelude::*;

#[function_component(Photographic)]
pub fn photos_mode() -> Html {
    html! {
        <div class="game-page">
            <div class="game-header">
                <div class="game-title">{ &PHOTOS_MODE.title }</div>
                <div class="game-info">
                    { "Cost: " }
                    <span>{ "Draw 1" }</span>
                    { " Time: " }
                    <span>{ "S/M: 10 Min" }</span>
                    <span>{ "L: 20 Min" }</span>
                </div>
            </div>
            <div class="game-question">
                { "Send a photo of " }
                <span class="heavy">{ "Subject" }</span>
            </div>
            { for PHOTOS_MODE.categories.iter().map(|cat| html! {
                    <div class="category">
                        <div class="category-title">{ &cat.title }{":"}</div>
                            <div class="photo-options">
                                {
                                    for cat.fields.iter().map(|item| html! {
                                        <PersistentCheckbox id={format!("{}.{}", PHOTOS_MODE.title, item.id)} >
                                            {item.label}
                                            <div class="subtext">{item.description}</div>
                                        </PersistentCheckbox>
                                    })
                                }
                            </div>
                    </div>
                }) }
        </div>
    }
}
