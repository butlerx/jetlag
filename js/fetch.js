async function fetchText(page) {
  const response = await fetch(page);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.text();
}

export function fetchTemplate(page) {
  return fetchText(`./templates/${page}.html`);
}

export function fetchCss(page) {
  return fetchText(`./css/${page}.css`);
}
