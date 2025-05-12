use crate::Route;
use yew::prelude::*;
use yew_router::prelude::*;

const TABS: [Route; 6] = [
    Route::Matching,
    Route::Measuring,
    Route::Thermo,
    Route::Radar,
    Route::Tentacles,
    Route::Photographic,
];

#[function_component(Navbar)]
pub fn navbar() -> Html {
    let active_route = match use_location() {
        Some(location) => Route::recognize(location.path()).unwrap_or(Route::Matching),
        None => Route::Matching,
    };

    html! {
        <div class="tabs-container">
            <div class="tabs">
                { for TABS.iter().map(|route| {
                    let tab_class = if *route == active_route { "tab active" } else { "tab" };
                    html! { <Link<Route> classes={tab_class} to={route.clone()}>{route.to_string()}</Link<Route>> }
                }) }
            </div>
        </div>
    }
}
