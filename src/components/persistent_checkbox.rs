use crate::storage::LocalStorage;
use implicit_clone::unsync::IString;
use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct PersistentCheckboxProps {
    pub id: IString,
    #[prop_or_default]
    pub children: Children,
}

#[function_component(PersistentCheckbox)]
pub fn persistent_checkbox(props: &PersistentCheckboxProps) -> Html {
    let initial_checked = LocalStorage::get(&props.id)
        .map(|val| val == "true")
        .unwrap_or(false);

    let checked = use_state(|| initial_checked);

    let onclick = {
        let checked = checked.clone();
        let storage_key = props.id.clone();
        Callback::from(move |_: MouseEvent| {
            let new_value = !*checked;
            LocalStorage::set(&storage_key, &new_value.to_string().into())
                .expect("failed to set local storage");
            checked.set(new_value);
        })
    };

    let container_classes = classes!("toggle", checked.then(|| "checked"));

    html! {
        <button class={container_classes} {onclick} aria-pressed={(*checked).to_string()}>
            { for props.children.iter() }
        </button>
    }
}
