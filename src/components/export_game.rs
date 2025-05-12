use crate::{
    constants::{Field, GameMode, GAME_PAGES},
    storage::LocalStorage,
};
use wasm_bindgen::{JsCast, JsValue};
use web_sys::{window, Blob, HtmlAnchorElement, Url};
use yew::prelude::*;

#[function_component(ExportButton)]
pub fn export_game() -> Html {
    let onclick = {
        Callback::from(move |_| {
            let notes = GAME_PAGES
                .iter()
                .filter_map(|page| process_page(page))
                .collect::<Vec<_>>()
                .join("\n\n");
            download_markdown(&notes, "game-data.md");
        })
    };

    html! { <button class="export-button" {onclick}>{ "Export Data" }</button> }
}

fn titleize(s: &str) -> String {
    let mut c = s.chars();
    match c.next() {
        None => String::new(),
        Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
    }
}

fn process_page(page: &GameMode) -> Option<String> {
    if page.title == "photos" {
        return Some(process_photos_page(page));
    }

    let page_content = page
        .categories
        .iter()
        .filter_map(|cat| {
            let fields = cat
                .fields
                .iter()
                .filter_map(|field| process_field(field, page.title))
                .collect::<Vec<_>>()
                .join("\n\n");
            if fields.is_empty() {
                None
            } else {
                Some(format!("## {}\n\n{}", titleize(cat.title), fields))
            }
        })
        .collect::<Vec<_>>()
        .join("\n\n");

    if page_content.is_empty() {
        None
    } else {
        Some(format!("# {}\n\n{}", titleize(page.title), page_content))
    }
}

fn process_photos_page(page: &GameMode) -> String {
    let list = page
        .categories
        .iter()
        .map(|cat| {
            let fields = cat
                .fields
                .iter()
                .map(|field| {
                    let key = format!("{}.{}", page.title, field.id);
                    let value = LocalStorage::get(&key).ok();
                    let done = if value.as_deref() == Some("true") {
                        "x"
                    } else {
                        " "
                    };
                    format!("- [{}] {}", done, field.label)
                })
                .collect::<Vec<_>>()
                .join("\n");
            format!("## {}\n\n{}", cat.title, fields)
        })
        .collect::<Vec<_>>()
        .join("\n\n");

    format!("# {}\n\n{}", titleize(page.title), list)
}

fn process_field(field: &Field, title: &str) -> Option<String> {
    let key = format!("{}.{}", title, field.id);
    let value = LocalStorage::get(&key).ok();
    let value = value?;
    if title == "radar" && field.id == "choose" {
        let label_key = format!("{}.{}.label", title, field.id);
        let label = LocalStorage::get(&label_key).ok();
        Some(format!(
            "### {}: {}\n\n{}",
            field.label,
            label.unwrap_or_default(),
            value
        ))
    } else {
        Some(format!("### {}\n\n{}", field.label, value))
    }
}

fn download_markdown(content: &str, filename: &str) {
    let window = window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    let array = js_sys::Array::new();
    array.push(&JsValue::from_str(content));

    let props = web_sys::BlobPropertyBag::new();
    props.set_type("text/markdown");
    let blob =
        Blob::new_with_str_sequence_and_options(&array, &props).expect("Failed to create blob");

    let url = Url::create_object_url_with_blob(&blob).expect("Failed to create object URL");
    let a = document
        .create_element("a")
        .unwrap()
        .dyn_into::<HtmlAnchorElement>()
        .unwrap();
    a.set_href(&url);
    a.set_download(filename);
    document.body().unwrap().append_child(&a).unwrap();
    a.click();
    document.body().unwrap().remove_child(&a).unwrap();
    Url::revoke_object_url(&url).unwrap();
}
