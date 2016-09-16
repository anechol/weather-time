window.onload = () => {

  let currentTime = () => {

    let date = new Date();
    let hr = date.getHours();
    let min = ('0' + date.getMinutes()).slice(-2);
    let sec = ('0' + date.getSeconds()).slice(-2);

    document.getElementById('currentTime').innerHTML = `${hr}:${min}:${sec}`;
  };

  setInterval(currentTime, 1000);
};
