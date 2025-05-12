use crate::{
    components::{ClearButton, ExportButton, Header, Navbar},
    pages::{Matching, Measuring, NotFound, Photographic, Radar, Tentacles, Thermo},
};
use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Clone, Routable, PartialEq)]
pub enum Route {
    #[at("/")]
    Home,
    #[at("/matching")]
    Matching,
    #[at("/measuring")]
    Measuring,
    #[at("/photographic")]
    Photographic,
    #[at("/radar")]
    Radar,
    #[at("/tentacles")]
    Tentacles,
    #[at("/thermo")]
    Thermo,
    #[not_found]
    #[at("/404")]
    NotFound,
}

impl std::fmt::Display for Route {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let route = match self {
            Route::Matching => "Matching".to_string(),
            Route::Measuring => "Measuring".to_string(),
            Route::Photographic => "Photographic".to_string(),
            Route::Radar => "Radar".to_string(),
            Route::Tentacles => "Tentacles".to_string(),
            Route::Thermo => "Thermo".to_string(),
            _ => "Not Found".to_string(),
        };
        write!(f, "{route}")
    }
}

fn switch(routes: &Route) -> Html {
    match routes {
        Route::Home => html! { <Redirect<Route> to={Route::Matching} /> },
        Route::Matching => html! { <Matching /> },
        Route::Measuring => html! { <Measuring /> },
        Route::Photographic => html! { <Photographic /> },
        Route::Radar => html! { <Radar /> },
        Route::Tentacles => html! { <Tentacles /> },
        Route::Thermo => html! { <Thermo /> },
        Route::NotFound => html! { <NotFound /> },
    }
}

#[function_component(App)]
pub fn app() -> Html {
    html! {
        <BrowserRouter>
            <main>
                <Header />
                <Navbar />
                <Switch<Route> render={|routes| switch(&routes)} />
                <div class="buttons">
                    <ClearButton />
                    <ExportButton />
                </div>
            </main>
        </BrowserRouter>
    }
}
