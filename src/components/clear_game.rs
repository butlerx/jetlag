use crate::storage::LocalStorage;
use web_sys::window;
use yew::prelude::*;

#[function_component(ClearButton)]
pub fn clear_game() -> Html {
    let show_modal = use_state(|| false);

    let open_modal = {
        let show_modal = show_modal.clone();
        Callback::from(move |_| show_modal.set(true))
    };

    let confirm_clear = {
        let show_modal = show_modal.clone();
        Callback::from(move |_| {
            LocalStorage::clear();
            window().unwrap().location().reload().unwrap();
            show_modal.set(false);
        })
    };

    let cancel_clear = {
        let show_modal = show_modal.clone();
        Callback::from(move |_| show_modal.set(false))
    };

    html! {
        <>
            <button class="clear-button" onclick={open_modal}>{ "Clear Game" }</button>
            if *show_modal {
                <div class="confirmation-dialog">
                    <div class="confirmation-content">
                        <h3>{ "Delete Game" }</h3>
                        <p>
                            { "Are you sure you want to delete this game? This action cannot be undone." }
                        </p>
                        <div class="confirmation-buttons">
                            <button type="button" onclick={cancel_clear}>{ "Cancel" }</button>
                            <button type="submit" onclick={confirm_clear}>{ "Clear Game" }</button>
                        </div>
                    </div>
                </div>
            }
        </>
    }
}
