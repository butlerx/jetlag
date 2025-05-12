use crate::storage::LocalStorage;
use implicit_clone::unsync::IString;
use web_sys::HtmlInputElement;
use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct PersistentInputCustomLabelProps {
    pub id: IString,
    #[prop_or("Label".into())]
    pub label: IString,
    #[prop_or("Notes".into())]
    pub placeholder: IString,
}

#[function_component(PersistentInputCustomLabel)]
pub fn persistent_input_custom_label(props: &PersistentInputCustomLabelProps) -> Html {
    let PersistentInputCustomLabelProps {
        id,
        label,
        placeholder,
    } = props;

    let initial_value = LocalStorage::get(id).unwrap_or_default();
    let value = use_state(|| initial_value);

    let on_value_input = {
        let value = value.clone();
        let storage_key = id.clone();
        Callback::from(move |e: InputEvent| {
            let input = e.target_unchecked_into::<HtmlInputElement>();
            let new_value: IString = input.value().into();
            LocalStorage::set(&storage_key, &new_value).expect("failed to set local storage");
            value.set(new_value);
        })
    };

    let label_storage_key = format!("{id}.label");
    let initial_label_value = LocalStorage::get(&label_storage_key).unwrap_or_default();
    let label_value = use_state(|| initial_label_value);
    let on_label_input = {
        let label_value = label_value.clone();
        let label_storage_key = label_storage_key.clone();
        Callback::from(move |e: InputEvent| {
            let input = e.target_unchecked_into::<HtmlInputElement>();
            let new_value: IString = input.value().into();
            LocalStorage::set(&label_storage_key, &new_value).expect("failed to set local storage");
            label_value.set(new_value);
        })
    };

    html! {
        <div class="item-row">
            <input
                class="label-input"
                id={label_storage_key.clone()}
                type="text"
                placeholder={label.clone()}
                value={(*label_value).clone()}
                oninput={on_label_input}
            />
            <input
                class="value-input"
                id={id.clone()}
                type="text"
                placeholder={placeholder.clone()}
                value={(*value).clone()}
                oninput={on_value_input}
            />
        </div>
    }
}
