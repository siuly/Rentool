// The differences of the two data are 'toolId' and 'location'
const sampleToolData = [{
  toolId: '12345678',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name',
    address: '100 W 49th Ave Vancouver, BC V5Y 2Z6',
    latitude: '49.225518864967654',
    longitude: '123.10776583584949',
  },
  imageUrl: 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
  prices: {
    hourly: 10,
    daily: 100,
    weekly: 1000,
  },
  size: 'small',
}, {
  toolId: 'asdfghjkl',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name',
    address: ' 3211 Grant McConachie Way, Richmond, BC V7B 0A4',
    latitude: '49.1967',
    longitude: '123.1815',
  },
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/rentool-4a9e6.appspot.com/o/driverjpg.jpg?alt=media&token=8b461f3e-fc70-451f-a13b-1856702ea7cc',
  prices: {
    hourly: 10,
    daily: 100,
    weekly: 1000,
  },
  size: 'small',
}];
const sampleNearestLocation = sampleToolData[0].location;



document.addEventListener('DOMContentLoaded', async () => {
  const tools = sampleToolData;
  const tool = tools[0];
  const nearestLocation = sampleNearestLocation;


  // Write your code below-----------------------------------------
const productChoosen = sampleToolData[0];
// load picture
  const productImage = document.querySelector('.product-image img');
  productImage.setAttribute('src',`${productChoosen.imageUrl}`);
// load alt atribute
  productImage.setAttribute('alt',`${productChoosen.toolName}`);

 const Description = document.querySelector('.product-description');
 const ProductDescription = document.createElement('p');
 
 






});