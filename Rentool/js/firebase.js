/// <reference path="../../firebase.d.ts" />
import { Reservation } from './domain/Reservation.js';
import { Location } from './domain/Location.js';
import { PATHS_PAGES, movePageTo, SaveUserId } from './util.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA7JwpO8rrYXgeKfiokAoymg2vJia3h7Nc',
  authDomain: 'rentool-4a9e6.firebaseapp.com',
  projectId: 'rentool-4a9e6',
  storageBucket: 'rentool-4a9e6.appspot.com',
  messagingSenderId: '357202195995',
  appId: '1:357202195995:web:4a7e7342acf44dd4f4eabe',
  measurementId: 'G-B5QXJNMD7M'
};

const app = firebase.initializeApp(firebaseConfig);
let db = firebase.default.firestore();
let firebaseAuth;
try {
  firebaseAuth = firebase.default.auth(app);
} catch (error) {
  console.log('error: ', error);
}


/**
 * @description Create user account in Firebase Authentication
 * @async
 * @param {string} email
 * @param {string} password;
 * @return {Promise<string | null>} uid (user id) of Firebase Authentication
 */
export const createUserAccountWithEmailAndPassword = async (email, password) => {
  try {
    return await (await firebaseAuth.createUserWithEmailAndPassword(email, password)).user.uid;
  } catch (error) {
    console.log('error: ', error);
    alert(error);
    return null;
  }
};


/**
 * @description Sign-in with Email and Password
 * @async
 * @param {string} email
 * @param {string} password
 * @returns {Promise< String | null >} user id
 */
export const signInEmailWithPassword = async (email, password) => {
  try {
    const userId = await (await firebaseAuth.signInWithEmailAndPassword(email, password)).user.uid;
    return userId;
  } catch (error) {
    console.log('Error getting documents: ', error);
    return null;
  }
};

/**
 * @description Get tool information by Category
 * @async
 * @param {string} category
 * @return {object []}
 */
export const getToolsByCategory = async (category = '') => {
  const toolsDoc = await db.collection('Tools').where('category', '==', category).get();
  const tools = [];
  toolsDoc.forEach(doc => tools.push({ toolId: doc.id, ...doc.data(), }));

  return tools;
};

/**
 * @description Get tool information by Keyword
 * @async
 * @param {string} keyword
 * @return {object[]}
 */
export const getToolsByKeyword = async (keyword = '') => {
  let tools = [];
  try {
    const toolsDoc = await db.collection('Tools').get();
    toolsDoc.forEach(doc => { tools.push({ toolId: doc.id, ...doc.data() }); });

    // Return all data when the keyword is empty
    if (keyword === '') {
      return tools;
    }

    tools = tools.filter(tool => JSON.stringify(tool).toLowerCase().includes(keyword.toLowerCase()));
    return tools;

  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Get all tool information
 * @async
 * @return {Tool[]}
 */
export const getAllTools = async () => {
  let tools = [];
  try {
    const toolsDoc = await db.collection('Tools').get();
    toolsDoc.forEach(doc => { tools.push({ toolId: doc.id, ...doc.data() }); });
    return tools;

  } catch (error) {
    console.error(error);
  }
};


/**
 * @description Set tool data into Tools collection, mostly for testing purposes
 * @async
 * @param {Tool} tool
 */
export const setToolData = async (tool) => {
  try {
    // await db.collection('Tools').add({ ...tool });
    await setDataTo('Tools', tool);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * @description Set data to collection
 * @async
 * @param {string} collectionName
 * @param {object} params
 */
const setDataTo = async (collectionName, params) => {

  try {
    return await db.collection(collectionName).add({ ...params });
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Get tool information by reservationToolIndex
 * @async
 * @param {string} reservationToolIndex
 * @return {Tool[]}
 */
export const getToolsByReservationToolIndex = async (reservationToolIndex) => {
  if (!reservationToolIndex) { return; }

  /**@type {Tool[]} */
  let tools = [];
  try {
    const toolsDoc = await db.collection('Tools').where('reservationToolIndex', '==', reservationToolIndex).get();
    toolsDoc.forEach(doc => { tools.push({ toolId: doc.id, ...doc.data() }); });
    return tools;
  } catch (error) {
    console.error(error);
  }
};



/**
 * @description Get reservation information by userId
 * @async
 * @param {string} userId
 * @return {Reservation[]}
 */
export const getReservationsByUserId = async (userId) => {
  if (!userId) {
    console.error('User ID is null.');
    return;
  }

  try {
    const reservationsDoc = await db.collection('Reservations')
      .where('userId', '==', userId)
      .where('isReturned', '==', false)
      .get();
    /**@type {Reservation[]} */
    let reservations = [];
    reservationsDoc.forEach(doc => { reservations.push({ reservationId: doc.id, ...doc.data() }); });
    return reservations;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Update tool data by toolId
 * @async
 * @param {string} toolId // Autogenerated document id
 * @param {object} params
 */
export const updateToolByToolId = async (toolId, params) => {
  if (!params) { return; }

  try {
    await db.collection('Tools').doc(toolId).update(params);
  } catch (error) {
    console.error(error);
  }
};


/**
 * @description Set reservation data into Reservations collection
 * @async
 * @param {Reservation} reservation
 */
export const setReservationData = async (reservation) => {
  try {
    return await setDataTo('Reservations', reservation);
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Update reservation data by reservationId
 * @async
 * @param {string} reservationId // Autogenerated document id
 * @param {object} params
 */
export const updateReservationByReservationId = async (reservationId, params) => {
  if (!params) { return; }

  try {
    await db.collection('Reservations').doc(reservationId).update(params);
  } catch (error) {
    console.error(error);
  }
};



/**
 * @description Return tools, change reservation data and tool data
 * @async
 * @param {Reservation} reservation
 * @param {Location} locationToReturn
 */
export const returnTool = async (reservation, locationToReturn) => {
  const { reservationId, toolId } = reservation;
  try {
    // Change reservation data
    if (reservation.isReturned === false) {
      await updateReservationByReservationId(reservationId, { isReturned: true });
    }

    // Change tool data
    await updateToolByToolId(toolId, { isReserved: false, location: locationToReturn });
    return true;
  } catch (error) {
    console.error(error);
  }
};


/**
 * @description Get all Location information
 * @async
 * @return {Location[]}
 */
export const getAllLocations = async () => {
  let locations = [];
  try {
    const locationsDoc = await db.collection('Locations').get();
    locationsDoc.forEach(doc => { locations.push({ locationId: doc.id, ...doc.data() }); });
    return locations;

  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Get reservation data by reservationId
 * @async
 * @param {string} reservationId
 * @returns {Promise}
 */
export const getReservationDataByReservationId = async (reservationId) => {
  try {
    const reservationDoc = await db.collection('Reservations').doc(reservationId).get();
    return { ...reservationDoc.data(), reservationId: reservationDoc.id };
  } catch (error) {
    console.error(error);
  }
};


/**
 * @description Get tool information by toolId
 * @async
 * @param {string} toolId
 * @return {Tool | null}
 */
export const getToolByToolId = async (toolId) => {
  if (!toolId) { return; }

  try {
    const toolDoc = await db.collection('Tools').doc(toolId).get();
    if (toolDoc.data() === undefined) {
      return null;
    }

    return { ...toolDoc.data(), toolId: toolDoc.id };;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Reservation request
 * @async
 * @param {Reservation} reservationRequest
 * @returns {string} the result of the database interaction
 */
export const reservationRequest = async (reservationRequest) => {
  try {
    const newReservationId = (await setReservationData(reservationRequest)).id;
    console.log('newReservationId: ', newReservationId);
    await updateToolByToolId(reservationRequest.toolId, { isReserved: true });
    return newReservationId;
  } catch (error) {
    console.log('error: ', error);
    return false;
  }
};