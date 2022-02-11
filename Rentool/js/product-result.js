import { Tool } from './domain/Tool.js';
import { signInEmailWithPassword, getToolsByCategory } from './firebase.js';

// signInEmailWithPassword('test@frank.com', "qwe");

const show = async () => {
  const tools = await getToolsByCategory();
  for (const tool of tools) {
    document.body.appendChild(new Tool(tool).generateHtml());
  };
};
show();