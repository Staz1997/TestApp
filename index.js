const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found img');

let hasSearchedBefore = false;

search.addEventListener('click', () => {

  const APIKey = 'fd29a90c929d5a314227fa3072243a8d';
  const city = document.querySelector('.search-box input').value;

  if (city === '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        hasSearchedBefore = true;
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear-day.svg';
          break;

        case 'Rain':
          image.src = 'images/rain.svg';
          break;

        case 'Snow':
          image.src = 'images/snow.svg';
          break;

        case 'Clouds':
          image.src = 'images/cloudy.svg';
          break;

        case 'Mist':
          image.src = 'images/fog.svg';
          break;

        case 'Haze':
          image.src = 'images/fog.svg';
          break;

        case 'Thunderstorm':
          image.src = 'images/thunderstorm.svg';
          break;

        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      if (!hasSearchedBefore) {
        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
      } else {
        weatherBox.classList.remove('fadeIn');
        weatherDetails.classList.remove('fadeIn');
        setTimeout(() => {
          weatherBox.style.display = '';
          weatherDetails.style.display = '';
          weatherBox.classList.add('fadeIn');
          weatherDetails.classList.add('fadeIn');
          container.style.height = '590px';
        }, 50);
      }

      hasSearchedBefore = true;

    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });

});