import { filterNotSignedInUser, setOnPageClassToMenuItem, PATHS_PAGES } from './util.js';

filterNotSignedInUser();
setOnPageClassToMenuItem(PATHS_PAGES.USER_PROFILE);