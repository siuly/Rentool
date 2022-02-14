/// <reference path="../../firebase.d.ts" />

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

/**
 * @description Sign-in with Email and Password
 * @async
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
export const signInEmailWithPassword = async (email, password) => {
  db.collection('Users')
    .where('email', '==', email).where('pswd', '==', password).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
      if (querySnapshot.size > 0) {
        alert('SignIn Success');
      }
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
      alert(`ERROR: ${error}`);
    });
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
  const toolsDoc = await db.collection('Tools').get();
  let tools = [];
  toolsDoc.forEach(doc => { tools.push({ toolId: doc.id, ...doc.data() }); });

  // return all data when the keyword is empty
  if (keyword === '') {
    return tools;
  }

  tools = tools.filter(tool => {
    // Search by each value
    for (const key in tool) {
      if (tool[key].includes(keyword)) { return true; }
    }
    return false;
  });

  return tools;
};