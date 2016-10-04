// Time
let currentTime = () => {

  let date = new Date();
  let hr = date.getHours();
  let min = ('0' + date.getMinutes()).slice(-2);
  let sec = ('0' + date.getSeconds()).slice(-2);

  document.getElementById('currentTime').innerHTML = `${hr}:${min}:${sec}`;
};

setInterval(currentTime, 1000);

// Date
let currentDate = () => {
  let date = new Date();
  let mon = date.getMonth() + 1;
  let weekday = date.getDay();
  let day = date.getDate();
  let year = date.getFullYear();

  let dayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  document.getElementById('currentDate').innerHTML = `${dayOfTheWeek[weekday]}, ${mon}/${day}/${year}`;
};

setInterval(currentDate, 1000);
