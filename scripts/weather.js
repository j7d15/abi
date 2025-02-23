function updateWeather(e) {
    console.log(e.target.value);
    const city = e.target.value;
    const currentElement = document.querySelector('#current');
    const forecastElement = document.querySelector('#forecast');
    if ("" !== city && undefined !== city && null !== city){
        fetch('public/weather.json')
        .then(response => response.json())
        .then(data => {
            const currentTempMax = data[city]['current'].main.temp_max;
            const currentTempMin = data[city]['current'].main.temp_min;
            const currentTempdescription = data[city]['current'].weather[0].description;
            const currentHumidity = data[city]['current'].main.humidity;
            const currentWind = data[city]['current'].wind.speed;
            currentElement.innerHTML = `
                <p class="d-flex justify-content-around m-1"><span class="text-danger lead">${currentTempMax}°C max</span> | <span class="text-info lead">${currentTempMin}°C min</span></p>
                <p class="text-success h4">${currentTempdescription}</p>
            `;
            
            const forecastTempMax = data[city]['forecast']['list'][1].main.temp_max;
            const forecastTempMin = data[city]['forecast']['list'][1].main.temp_min;
            const forecastTempdescription = data[city]['forecast']['list'][1].weather[0].description;
            const forecastHumidity = data[city]['forecast']['list'][1].main.humidity;
            const forecastWind = data[city]['forecast']['list'][1].wind.speed;
                forecastElement.innerHTML = `
                <p class="d-flex justify-content-around m-1"><span class="text-danger lead">${forecastTempMax}°C max</span> | <span class="text-info lead">${forecastTempMin}°C min</span></p>
                <p class="text-success h4">${forecastTempdescription}</p>
            `;
        })
        .catch(error => {
            console.log(error);
            currentElement.innerHTML = "Erreur de récupération des données";
            forecastElement.innerHTML = "Erreur de récupération des données";
        });
    } else {
        currentElement.innerHTML = "<p>Sélectionner une ville</p>";
        forecastElement.innerHTML = "<p>Sélectionner une ville</p>";
    }
    
}
