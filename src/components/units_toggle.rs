use crate::units::{Units, UnitsContext};
use yew::prelude::*;

#[function_component(UnitsToggle)]
pub fn units_toggle() -> Html {
    let units = use_context::<UnitsContext>().expect("UnitsContext not provided");

    let render_option = |option: Units| {
        let units = units.clone();
        let active = *units == option;
        let onclick = Callback::from(move |_: MouseEvent| {
            option.save();
            units.set(option);
        });
        html! {
            <button
                type="button"
                class={classes!("units-option", active.then_some("active"))}
                aria-pressed={active.to_string()}
                {onclick}
            >
                { option.to_string() }
            </button>
        }
    };

    html! {
        <div class="units-toggle" role="group" aria-label="Distance units">
            { render_option(Units::Imperial) }
            { render_option(Units::Metric) }
        </div>
    }
}
