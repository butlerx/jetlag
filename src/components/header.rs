use crate::app::Route;
use yew::prelude::*;
use yew_router::prelude::*;

#[function_component(Header)]
pub fn header() -> Html {
    let navigator = use_navigator().unwrap();
    let onclick = Callback::from(move |_| navigator.push(&Route::Home));
    html! {
        <h1 class="header">
            <img {onclick} src="./static/icon-128x128.png" alt="Jet Lag Icon" class="header-icon" />
            <span>
                { "Jet Lag: The Game - Hide + Seek" }
                <br />
                { "Investigation Book" }
            </span>
        </h1>
    }
}
