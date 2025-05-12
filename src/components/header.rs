use yew::prelude::*;

#[function_component(Header)]
pub fn header() -> Html {
    html! {
        <h1 class="header">
            <img src="./static/icon-128x128.png" alt="Jet Lag Icon" class="header-icon" />
            <span>
                { "Jet Lag: The Game - Hide + Seek" }
                <br />
                { "Investigation Book" }
            </span>
        </h1>
    }
}
