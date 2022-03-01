const sampleToolData = [{
  toolId: 'R92ruT1ZA0vCV0w9B7aE',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name 1',
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
  toolId: '1IDJzk33zxgafzfegU0q',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name 2',
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
let tname = document.getElementById('tool-name');
let tduration = document.getElementById('duration');
let tprice = document.getElementById('price');
let tdepo = document.getElementById('deposit');

tname.innerHTML = sampleToolData[0].toolName;
// console.log(sampleToolData[0].toolName);

etime.addEventListener('change', (event) =>{
  let dateinput1 = sdate.value + ' ' + stime.value;
  let dateinput2 = edate.value + ' ' + etime.value;
  console.log(dateinput1);
  console.log(dateinput2);
  // let now  = new Date();

  if (dateinput1 < dateinput2) {

  console.log(get_time_diff(dateinput1, dateinput2));
  }else{
    alert('incorrect date input');
  }
  // if (dateinput1< now) {

  //   console.log(get_time_diff(dateinput1, dateinput2));
  //   }else{
  //     alert('date should be  after today');
  //   }
  
})
// console.log(sampleToolData[0].prices.daily);

function get_time_diff( d1 , d2 )
{
    // let datetime = typeof datetime !== 'undefined' ? datetime : datetime1 ;

    let datetime3 = new Date( d1 );
    let datetime4 = new Date( d2 );
    let delta = datetime4 - datetime3;

       

    let days = Math.floor(delta / 1000 / 60 / (60 * 24));

    let date_diff = new Date(delta);
    
    tduration.innerHTML = `Duration: ${days} Days ${date_diff.getHours()} Hours`;
    let fprice = sampleToolData[0].prices.daily * days;
    tprice.innerHTML = `Price: $ ${fprice}`;
    let fdepo = fprice * 0.1;
    tdepo.innerHTML = `Deposit: $ ${fdepo}`;

    return days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";

    // return delta;

  }

  
// let rentd = edate.value - sdate.value;
//   console.log(rentd);
//   if (sdate.value && edate.value == null){
//     let rent = etime.value - stime.value;
//     console.log(rent);
//   }
  
// let rentd = edate.value - sdate.value;

// tname.innerHTML = sampleToolData[0].toolName;
// tdays.innerHTML = rentd;


// this is  is not showing  should I add a button  to  identify when  the fields are being filled?
