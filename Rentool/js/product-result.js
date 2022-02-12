import { ToolListItem } from './components/ToolListItem.js';
import { getToolsByCategory } from './firebase.js';
import { getDistanceFromUserLocation, getUrlParams, GET_PARAMS } from './util.js';


document.addEventListener('DOMContentLoaded', async () => {
  const tools = await getToolsByCategory('category');
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