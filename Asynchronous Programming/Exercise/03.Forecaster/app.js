function attachEvents() {
    const location = document.getElementById('location')
    const weatherBtn = document.getElementById('submit');
    weatherBtn.addEventListener('click', getWeather);

    const forecast = document.getElementById('forecast');
    const currentWeather = document.getElementById('current');
    const upcomingWeather = document.getElementById('upcoming');



    function getWeather() {

        const possibilities = {
            'Sunny': '&#x2600', // ☀
            'Partly sunny': '&#x26C5', // ⛅
            'Overcast': '&#x2601', // ☁
            'Rain': '&#x2614', // ☂
            'Degrees': '&#176'   // °

        }
        const url = `http://localhost:3030/jsonstore/forecaster/locations`;
        fetch(url)
            .then(response => response.json())
            .then(data => {

                let currentLocation = data.find(city => city.name === location.value);
                if (!currentLocation) {
                    throw new Error();
                }

                forecast.style.display = 'block';
                let code = currentLocation.code;

                const todayURL = `http://localhost:3030/jsonstore/forecaster/today/${code}`;

                fetch(todayURL)
                    .then(response => response.json())
                    .then(data => {

                        //main div
                        let forecastsDiv = createElement('div', 'forecasts');
                        // symbol span
                        let symbolSpan = createElement('span', ('condition', 'symbol'));
                        symbolSpan.innerHTML = possibilities[data.forecast.condition];
                        forecastsDiv.appendChild(symbolSpan);
                        // info span
                        let conditionSpan = createElement('span', 'condition');


                        //forecast-spans:
                        let span1 = createElement('span', 'forecast-data');
                        span1.textContent = data.name;
                        conditionSpan.appendChild(span1);

                        let span2 = createElement('span', 'forecast-data');
                        span2.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;
                        conditionSpan.appendChild(span2);

                        let span3 = createElement('span', 'forecast-data');
                        span3.textContent = data.forecast.condition;
                        conditionSpan.appendChild(span3);


                        forecastsDiv.appendChild(conditionSpan);
                        currentWeather.appendChild(forecastsDiv)

                    });
                //upcoming:
                const threeDaysURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;

                fetch(threeDaysURL)
                    .then(response => response.json())
                    .then(upcomingData => {

                        const fcINfo = createElement('div', 'forecast-info');

                        upcomingData.forecast.forEach((el) => {
                            const upcoming = createElement('span', 'upcoming');

                            let symbol = createElement('span', 'symbol');
                            symbol.innerHTML = possibilities[el.condition];

                            let fcData = createElement('span', 'forecast-data');
                            //fcData.innerHTML = `${el.low}&#176;/${el.high}&#176;`
                             fcData.innerHTML = `${el.low}${possibilities['Degrees']}/${el.high}${possibilities['Degrees']}`;


                            let fcData2 = createElement('span', 'forecast-data');
                            fcData2.textContent = el.condition

                            upcoming.appendChild(symbol);
                            upcoming.appendChild(fcData);
                            upcoming.appendChild(fcData2);
                            fcINfo.appendChild(upcoming);

                        })
                        upcomingWeather.appendChild(fcINfo);
                    })
                    .catch(() => (forecast.textContent = 'Error'));
            })

            .catch((e) => forecast.textContent = 'Error')
    }

    function createElement(type, className) {
        let element = document.createElement(type);

        if (className) {
            element.className = className;
        }

        return element;
    }
}

attachEvents()