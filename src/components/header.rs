use crate::app::Route;
use yew::prelude::*;
use yew_router::prelude::*;

#[function_component(Header)]
pub fn header() -> Html {
    let navigator = use_navigator().unwrap();
    let onclick = Callback::from(move |_| navigator.push(&Route::Home));
    html! {
        <h1 class="header">
            <div class="logo-container" {onclick}>
                <div class="main-logo">
                    <span class="logo-text">{ "jet" }</span>
                    <div class="logo-icon">
                        <img src="./static/icon-128x128.png" alt="Jet Lag Icon" class="icon" />
                    </div>
                    <span class="logo-text">{ "lag" }</span>
                </div>
                <div class="maps-label">{ "The Game - Hide + Seek" }</div>
            </div>
            <span class="subtitle">{ "Investigation Book" }</span>
        </h1>
    }
}
