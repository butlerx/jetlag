use crate::storage::LocalStorage;
use implicit_clone::unsync::IString;
use web_sys::HtmlInputElement;
use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct PersistentInputProps {
    pub id: IString,
    pub label: IString,
    #[prop_or("Notes".into())]
    pub placeholder: IString,
}

#[function_component(PersistentInput)]
pub fn persistent_input(props: &PersistentInputProps) -> Html {
    let PersistentInputProps {
        id,
        label,
        placeholder,
    } = props;

    let initial_value = LocalStorage::get(id).unwrap_or_default();
    let value = use_state(|| initial_value);

    let oninput = {
        let value = value.clone();
        let storage_key = id.clone();
        Callback::from(move |e: InputEvent| {
            let input = e.target_unchecked_into::<HtmlInputElement>();
            let new_value: IString = input.value().into();
            LocalStorage::set(&storage_key, &new_value).expect("failed to set local storage");
            value.set(new_value);
        })
    };

    html! {
        <div class="item-row">
            <label for={id.clone()}>{ label }</label>
            <input
                id={id.clone()}
                type="text"
                placeholder={placeholder.clone()}
                value={(*value).clone()}
                {oninput}
            />
        </div>
    }
}
