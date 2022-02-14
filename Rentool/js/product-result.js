import { ToolListItem } from './components/ToolListItem.js';
import { getToolsByCategory, getToolsByKeyword } from './firebase.js';
import { getUrlParams, GET_PARAMS } from './util.js';


document.addEventListener('DOMContentLoaded', async () => {
  let tools = [];
  if (getUrlParams()[GET_PARAMS.CATEGORY] !== null) {
    tools = await getToolsByCategory(getUrlParams()[GET_PARAMS.CATEGORY]);
  }
  if (getUrlParams()[GET_PARAMS.KEYWORD] !== null) {
    tools = await getToolsByKeyword(getUrlParams()[GET_PARAMS.KEYWORD]);
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