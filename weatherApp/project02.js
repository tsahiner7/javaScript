// Tolga Sahiner
// 04/11/2024
function getWeather() {
    let zipCode = document.getElementById('zipCodeInput').value;
    let username = 'tsahiner';
    let countryCode = 'US';
    
    // First request to get latitude and longitude
    let geoNamesURL = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipCode}&countryCode=${countryCode}&username=${username}`;

    // Make XMLHttpRequest
    let xhr = new XMLHttpRequest();
    xhr.open('GET', geoNamesURL, true);

    xhr.onload = function() {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            console.log(data);
            let lat = data.postalCodes[0].lat;
            let lng = data.postalCodes[0].lng;
            let location = data.postalCodes[0].placeName;

            // Second request to get weather data
            let weatherURL = `http://api.geonames.org/findNearByWeatherJSON?lat=${lat}&lng=${lng}&username=${username}`;

            let weatherXhr = new XMLHttpRequest();
            weatherXhr.open('GET', weatherURL, true);

            weatherXhr.onload = function() {
                if (this.status === 200) {
                    let weatherData = JSON.parse(this.responseText);
                    displayWeather(weatherData, location);
                }
            };

            weatherXhr.send();
        } else {
            console.error('Error retrieving data:', this.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Error retrieving data:', this.statusText);
    };

    xhr.send();
}

function displayWeather(weatherData, location) {
    let temperature = (weatherData.weatherObservation.temperature);
    let tempFahrenheit = ((temperature * 9/5) + 32).toFixed(2);
    // console.log(weatherData.weatherObservation.clouds);
    let wind = (weatherData.weatherObservation.windSpeed);
    console.log(weatherData);
    console.log(location);
    console.log(wind);
    console.log(tempFahrenheit);

    let displayLocation = document.createElement("p");
    let displayTemp = document.createElement("p");
    let displayWind = document.createElement("P");

    //Temperature icons 
    let iconTemp;
    if (tempFahrenheit <= 34) {
        iconTemp = "images/cold.png";
    }
    else if (tempFahrenheit >= 83) {
        iconTemp = "images/hot.png";
    }
    else {
        iconTemp = "images/warm.png";
    }

    //Wind icons
    let iconWind;
    if(wind > 15) {
        iconWind = "images/wind.jpeg";
    }

    document.getElementById("iconTemp").src = iconTemp;
    document.getElementById("iconWind").src = iconWind;
    displayLocation.innerHTML = location;
    displayTemp.innerHTML = tempFahrenheit + " Fahreneit";
    displayWind.innerHTML = wind + " mph Wind";
    let weatherOutputLocation = document.getElementById("weatherOutputLocation");
    let weatherOutputWind = document.getElementById("weatherOutputWind");
    let weatherOutputTemp = document.getElementById("weatherOutputTemp");
    weatherOutputLocation.appendChild(displayLocation);
    weatherOutputWind.appendChild(displayWind);
    weatherOutputTemp.appendChild(displayTemp);
}
