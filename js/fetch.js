export async function fetchTemplate(page) {
  const response = await fetch(`./templates/${page}`);
  return response.text();
}

export async function fetchCss(page) {
  const response = await fetch(`./css/${page}`);
  return response.text();
}
