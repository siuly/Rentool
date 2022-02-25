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


let sdate = document.getElementById('start-date');
let stime = document.getElementById('start-time');
let edate = document.getElementById('end-date');
let etime = document.getElementById('end-time');


document.getElementById('page1-btn').addEventListener('click', () => {
  console.log('Click');
  document.getElementById('page1').classList.remove('shown');
  document.getElementById('page2').classList.add('shown');
  console.log(etime.value);
  console.log(stime.value);
  let rent = etime.value - stime.value;
    console.log(rent);

  if (sdate.value && edate.value == null){
    rent = etime.value-stime.value;
    console.log(rent);
  }

  // Shown class will be set {display: block}, while others set {display: none}

});









// IDEA to set toolId to Locker name

// const page3El = document.getElementById('page3');
// for (const tool of sampleToolData) {
//   const cardEl = document.createElement('div');
//   cardEl.textContent = tool.toolName;
//   cardEl.addEventListener('click', () => {
//     console.log(tool.toolId); // You can set toolId to each Element
//   });
//   page3El.appendChild(cardEl);
// }