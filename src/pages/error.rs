use crate::Route;
use yew::prelude::*;
use yew_router::prelude::*;

#[function_component(NotFound)]
pub fn error_page() -> Html {
    let navigator = use_navigator().expect("rendered outside a <BrowserRouter>");

    let go_home_button = {
        let navigator = navigator.clone();
        let onclick = Callback::from(move |_| navigator.push(&Route::Matching));
        html! { <button class="home-button" {onclick}>{ "Restart Your Journey" }</button> }
    };

    html! {
        <div class="error-page">
            <h1>{ "404: Time Zone Not Found" }</h1>
            <p>{ "Oops! It seems you've stumbled into a temporal anomaly." }</p>
            <div class="error-animation">
                <div class="clock">{ "🕰️" }</div>
                <div class="plane">{ "✈️" }</div>
            </div>
            <p>{ "Don't worry, even the best travelers get lost sometimes." }</p>
            <p>{ "Why not try one of these options:" }</p>
            { go_home_button }
        </div>
    }
}
