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

fn render_tab_options(active_route: &Route) -> Html {
    TABS.iter()
        .map(|route| {
            let tab_class = if route == active_route {
                "tab active"
            } else {
                "tab"
            };
            html! {
                <Link<Route> classes={tab_class} to={route.clone()}>
                    { route.to_string() }
                </Link<Route>>
            }
        })
        .collect::<Html>()
}

#[function_component(Navbar)]
pub fn navbar() -> Html {
    let active_route = match use_location() {
        Some(location) => Route::recognize(location.path()).unwrap_or(Route::Matching),
        None => Route::Matching,
    };

    let mobile_menu_open = use_state(|| false);
    let toggle_mobile_menu = {
        let mobile_menu_open = mobile_menu_open.clone();
        Callback::from(move |_| mobile_menu_open.set(!*mobile_menu_open))
    };

    html! {
        <div class="tabs-container">
            <div class="mobile-selector">
                <div class="active-tab" onclick={toggle_mobile_menu}>
                    { format!("{active_route} ▼") }
                </div>
                if *mobile_menu_open {
                    <div class="mobile-menu">{ render_tab_options(&active_route) }</div>
                }
            </div>
            <div class="tabs">{ render_tab_options(&active_route) }</div>
        </div>
    }
}
