import { ToolListItem } from './components/ToolListItem.js';
import { getToolsByCategory, getToolsByKeyword, getAllTools } from './firebase.js';
import { getUrlParams, GET_PARAMS } from './util.js';

const pageHeadingTextEl = document.getElementById('page-heading__text');
pageHeadingTextEl.textContent = getUrlParams()[GET_PARAMS.CATEGORY] || getUrlParams()[GET_PARAMS.KEYWORD];

document.addEventListener('DOMContentLoaded', async () => {
  /**@type {[] | undefined} */
  let tools = undefined;

  if (getUrlParams()[GET_PARAMS.CATEGORY] !== null) {
    tools = await getToolsByCategory(getUrlParams()[GET_PARAMS.CATEGORY]);
  }
  if (getUrlParams()[GET_PARAMS.KEYWORD] !== null) {
    tools = await getToolsByKeyword(getUrlParams()[GET_PARAMS.KEYWORD]);
  }

  if (tools === undefined) {
    // Gets all data
    tools = await getAllTools();
  }

  const toolListEl = document.getElementById('tool-list');
  for (const tool of tools) {
    const toolListItem = new ToolListItem(tool);
    toolListEl.appendChild(toolListItem);
  }

  // Set the number of tools shown
  document.querySelector('.product-number__number').textContent = tools.length;
  // Remove loading spinner
  document.querySelector('.loader-container').style.display = 'none';
});