$(document).ready(function() {
    // API Call
    const url = `http://api.openweathermap.org/data/2.5/weather?id=4887398&appid={APIKEY}&units=imperial`;

    // Weather elements
    let city = document.getElementById('city');
    let desc = document.getElementById('desc');
    let temp = document.getElementById('temp');
    let minTemp = document.getElementById('minTemp');
    let maxTemp = document.getElementById('maxTemp');
    let rain = document.getElementById('rain');
    let snow = document.getElementById('snow');

    // Arrays for weather conditions
    const rainWords = ['Rain', 'Shower', 'Showers', 'Drizzle'];
    const cloudWords = ['Cloud', 'Clouds', 'Cloudy'];
    const clearWords = ['Clear', 'Sun', 'Sunny'];

    // Get JSON data from API Call
    $.getJSON(url, function(data) {
        let updateWeather = () => {

            city.innerHTML = 'Chicago'; // City Name
            desc.innerHTML = `${JSON.parse(JSON.stringify(data.weather[0].main))}: ${JSON.parse(JSON.stringify(data.weather[0].description))}`; // Description of weather
            temp.innerHTML = `Temp: ${Math.round(JSON.parse(JSON.stringify(data.main.temp)))}${ '&deg;'}`; // Current Temperature
            minTemp.innerHTML = `Low: ${Math.round(JSON.parse(JSON.stringify(data.main.temp_min)))}${ '&deg;'}`; // Min Temperature
            maxTemp.innerHTML = `Hi: ${Math.round(JSON.parse(JSON.stringify(data.main.temp_max)))}${ '&deg;'}`; // Max Temperature

            // Rain - If not raining in the last hour, don't show
            if (JSON.stringify(data.rain) == undefined || JSON.stringify(data.rain['1h']) == undefined) {
                rain.style.display = 'none';
            } else {
                rain.innerHTML = `Rain: ${JSON.parse(JSON.stringify(data.rain['1h']))} in`;
            }

            // Snow - If none, don't show
            // FIXME: This needs to be fixed once it starts to snow. The background will not work for some reason when using ['1h'].
            if (JSON.stringify(data.snow) == undefined || JSON.stringify(data.snow['1h'])) {
                snow.style.display = 'none';
            } else {
                snow.innerHTML = `Snow: ${JSON.parse(JSON.stringify(data.snow['1h']))} in`;
            }

            // Change background based on weather
            // Loops through a list of words to find a match. When match is made,
            // appropriate background is used

            // Rain
            for (let word = 0; word < rainWords.length; word++) {
                if (JSON.stringify(data.weather[0].main).includes(rainWords[word])) {
                    document.body.style.background = 'url("main/img/rain.jpg") no-repeat center';
                }
            }

            // Clouds
            for (let word = 0; word < cloudWords.length; word++) {
                if (JSON.stringify(data.weather[0].main).includes(cloudWords[word])) {
                    document.body.style.background = 'url("main/img/cloudy.jpg") no-repeat left center';
                }
            }

            // Clear skies
            for (let word = 0; word < clearWords.length; word++) {
                if (JSON.stringify(data.weather[0].main).includes(clearWords[word])) {
                    document.body.style.background = 'url("main/img/clearsky.jpg") no-repeat top center';
                }
            }
        }

        // TODO: Try to make this update the temp and description whenever it updates.
        // This checks every second.

        setInterval(updateWeather, 1000);
    });
});
