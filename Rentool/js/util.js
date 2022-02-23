'use strict';

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


/**
 * @description Get an object includes URL parameters
 * @returns {URLSearchParams} params
 */
export const getUrlParams = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  return params;
};




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
 * @param {float} targetLatitude
 * @param {float} targetLongitude
 * @return {float} distance
 */
export const getDistanceFromUserLocation = async (targetLatitude, targetLongitude) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLatitude = position.coords.latitude;
      const userLongitude = position.coords.longitude;


      /**TODO: TEST => should be deleted */
      // targetLatitude = 9.23970770288139;
      // targetLongitude = -123.03182549147533;

      const dist = distance(userLatitude, userLongitude, targetLatitude, targetLongitude, 'm');
      console.log('dist: ', dist);

      return dist;
    }, (error) => { console.error(error) });
  }
};


/**
 * @typedef location
 * @property {float} latitude
 * @property {float} longitude
 */

/**
 * @description Get Location
 * @param {location[]} locations
 * @return {float} distance
 */
const getNearestLocation = (locations) => {};


//@TODO: save userId to localStorage
//@TODO: remove userId from localStorage
//@TODO: 