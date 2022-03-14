import { ToolListItem } from './components/ToolListItem.js';
import { getToolsByCategory, getToolsByKeyword, getAllTools } from './firebase.js';
import { getUrlParams, GET_PARAMS } from './util.js';

const pageHeadingTextEl = document.getElementById('page-heading__text');
pageHeadingTextEl.textContent = getUrlParams()[GET_PARAMS.CATEGORY] || getUrlParams()[GET_PARAMS.KEYWORD] || "Our Products";

/**@type {HTMLDivElement} */
const toolListEl = document.getElementById('tool-list');

/**@type {HTMLButtonElement} */
const moreToolsButton = document.getElementById('more-tools-button');

const NUMBER_FIRST_VIEW_TOOL_ITEM_COUNT = 3;

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


  const numToolsCount = tools.length;
  if (numToolsCount <= NUMBER_FIRST_VIEW_TOOL_ITEM_COUNT) {
    showAllTool(tools);
    moreToolsButton.style.display = 'none';
  }

  if (numToolsCount > NUMBER_FIRST_VIEW_TOOL_ITEM_COUNT) {
    showFirstViewTool(tools);
    moreToolsButton.style.display = 'block';
    moreToolsButton.addEventListener('click', () => {
      showMoreTool(tools);
      moreToolsButton.style.display = 'none';
    });
  }

  // Set the number of tools shown
  document.querySelector('.product-number__number').textContent = tools.length;
  // Remove loading spinner
  document.querySelector('.loader-container').style.display = 'none';
});


/**@param {Tool[]} tools */
const showAllTool = (tools) => {
  for (const tool of tools) {
    appendToolListItemToToolList(tool);
  }
};

/**@param {Tool[]} tools */
const showFirstViewTool = (tools) => {
  for (let i = 0; i < NUMBER_FIRST_VIEW_TOOL_ITEM_COUNT; i++) {
    appendToolListItemToToolList(tools[i]);
  }
};

/**
 * @description Show additional tools when more button clicked
 * @param {Tool[]} tools
 * @param {number} startAd
 * @param {number} endAt
 */
const showMoreTool = (tools, startAd = NUMBER_FIRST_VIEW_TOOL_ITEM_COUNT, endAt = tools.length) => {
  for (let i = startAd; i < endAt; i++) {
    appendToolListItemToToolList(tools[i]);
  }
};


/**
 * @description Append tool-item element to global tool-list
 * @param {Tool} tool
 */
const appendToolListItemToToolList = (tool) => {
  const toolListItem = new ToolListItem(tool);
  toolListEl.appendChild(toolListItem);
};