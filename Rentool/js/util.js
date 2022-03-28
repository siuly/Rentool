'use strict';

import { Location } from './domain/Location.js';

/**
 * @description CONSTANT of for get parameters
 * @constant
 */
export const GET_PARAMS = {
  CATEGORY: 'category',
  KEYWORD: 'keyword',
  RESERVATION_ID: 'reservationId',
  RESERVATION_TOOL_INDEX: 'reservationToolIndex'
};
export const PATH_PAGE_TOP_DIRECTORY = `/Pages`;

export const PATHS_PAGES = {
  // General
  HOME: 'home.html',
  ACTIVE_ORDERS: 'active-orders.html',
  SIGN_IN: 'sign-in.html',
  SIGN_UP: 'sign-up.html',
  CATALOGUE: 'catalogue.html',

  // Reservation
  PRODUCT_RESULT: 'product-result.html',
  RESERVATION_REQUEST: 'reservation-request.html',
  RESERVATION_COMPLETE: 'reservation-complete.html',
  VIEW_PRODUCT: 'view-product.html',

  // Return
  RETURN_TOOL: 'return-tool.html',
  RETURN_COMPLETE: 'return-complete.html',

  // Admin
  ADD_TOOL: 'admin/addTool.html',

  // OTHERS
  USER_PROFILE: 'user-profile.html',
  USER_PROFILE_EDIT: 'user-profile-edit.html',
  SERVICES: 'services.html',
  REFERENCE: 'reference.html'
}

export const DURATION_TOAST_DISPLAY = 3000;



/**
 * @description Get an object includes URL parameters
 * @returns {URLSearchParams} params
 * src: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
export const getUrlParams = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
};


export const RANDOM_IMAGE_URL = 'https://picsum.photos/300/300?rand';



/** src: https://www.geodatasource.com/developers/javascript */
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2022            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

/**
 * @description Calculate the distance between 2 location data
 * @param {float} lat1
 * @param {float} lon1
 * @param {float} lat2
 * @param {float} lon2
 * @param {string} unit
 * @return {float} distance
 * @async
 */
function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {

    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}

/**
 * @description Get distance to the location of the tool (meter)
 * @param {Location } location // will be destructuring into latitude and longitude
 * @return {float} distance
 * @async
 */
export const getDistanceFromUserLocation =
  async ({ latitude: targetLatitude, longitude: targetLongitude }) => {
    if (!navigator.geolocation) {
      console.error('The device can not use location');
      return;
    }

    // Get user's Geolocation
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    return distance(
      /* User's location */
      Number.parseFloat(userLatitude), Number.parseFloat(userLongitude),
      /* Locker's location */
      Number.parseFloat(targetLatitude), Number.parseFloat(targetLongitude),
      'K');
  };


/**
 * @description Get nearest location
 * @param {Location[]} locations
 * @return {Promise<Location | null>}
 */
export const getNearestLocation = async (locations) => {
  let distanceCallbacks = [];

  try {
    /** Set distance start */
    for (let location of locations) {
      distanceCallbacks.push(getDistanceFromUserLocation(location));
    }
    const distances = await Promise.all(distanceCallbacks);
    const locationsWithDistance = locations.map((location, idx) => ({ distance: Number.parseFloat(distances[idx]), ...location, }));
    /** Set distance end */

    return locationsWithDistance.reduce((a, b) => a.distance < b.distance ? a : b);
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return null;
  }
};



/**
 * @description move the page to the designated page
 * @param {string} pagePath
 */
export const movePageTo = (pagePath, urlParameter = '') => {
  window.location.href = `${PATH_PAGE_TOP_DIRECTORY}/${pagePath}${urlParameter}`;
}


/**
 * @description Sign out and move the page to the Home page.
 * @param {string} pagePath
 */
export const signOut = () => {
  window.localStorage.clear();
  movePageTo(PATHS_PAGES.HOME);
}

/**
 * @description Set user id into local storage
 * @param {string} userId
 */
export const SaveUserId = (userId) => {
  window.localStorage.setItem('userId', userId);
};

/**
 * @description Return user id from local storage
 * @return {string}
 */
export const readUserId = () => {
  return window.localStorage.getItem('userId');
};




/**
 * @description Check whether the login user is admin
 * @return {boolean}
 */
export const isAdminUser = () => {
  return readUserId() === '2pVebYD9LKZJF7rf0Io8Xpwclbs2';
};

/**
 * @description Change page to sign-in page if the user did not sign in.
 * @param {number} durationToSendPage
 * @param {typeof PATHS_PAGES[keyof typeof PATHS_PAGES]} pageMoveTo
 * @returns
 */
export const filterNotSignedInUser = (durationToSendPage = 3000, pageMoveTo = PATHS_PAGES.SIGN_IN) => {

  if (readUserId() === null) {
    try {
      Toastify({
        text: 'Please Sign-in if you want to fully use this application',
        close: true,
        gravity: 'top',
        position: 'center',
        className: 'error',
        duration: DURATION_TOAST_DISPLAY,
      }).showToast();
    } catch (error) {
      console.log('error: ', error);
    }

    setTimeout(() => { movePageTo(pageMoveTo); }, durationToSendPage);
  }
};


/**
 * @description Set onDisplayPage class to the header item
 * @param {typeof PATHS_PAGES[keyof typeof PATHS_PAGES]} pageName
 * @returns {boolean}
 */
export const setOnPageClassToMenuItem = (page) => {
  try {
    document.querySelector(`a[href$="${page}"]`).classList.add('onDisplayPage');
    return true;
  } catch (error) {
    console.log('error: ', error);
    return false;
  }
};