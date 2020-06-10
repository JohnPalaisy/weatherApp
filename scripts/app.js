// app.js to manipulate dom
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.getElementsByClassName('time')[0];
const icon = document.getElementById('icon');

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // destructure properties commented out above
    const { cityDets, weather } = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images

    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);


    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {
    
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});