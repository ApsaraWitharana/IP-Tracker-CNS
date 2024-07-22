const weatherByIP = 'https://api.weatherapi.com/v1/current.json';
// const weatherByIP = '';

async function fetchWeatherDataByIP() {

    let createdAPI = `${weatherByIP}?q=${localStorage.getItem('tracked_ip')}&lang=en&key=8ea97a9fcea342b98aa80158242207`;

    console.log('createdAPI:', createdAPI);


    let getWeatherAPIDetails = await fetch(createdAPI, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        }
    });

    if (!getWeatherAPIDetails.ok) {
        throw new Error('Network response was not ok while fetching geolocation data');
    }

    let getWhetherAPIByIP = await getWeatherAPIDetails.json();

    console.log('Weather Data:', getWhetherAPIByIP);

    $('#country').val(getWhetherAPIByIP.location.country);
    $('#region').val(getWhetherAPIByIP.location.region);
    $('#lat').val(getWhetherAPIByIP.location.lat);
    $('#lon').val(getWhetherAPIByIP.location.lon);
    $('#tz_id').val(getWhetherAPIByIP.location.tz_id);
    $('#localtime_epoch').val(getWhetherAPIByIP.location.localtime_epoch);

    $('#last_updated_epoch').val(getWhetherAPIByIP.current.last_updated_epoch);
    $('#temp_c').val(getWhetherAPIByIP.current.temp_c);
    $('#temp_f').val(getWhetherAPIByIP.current.temp_f);


    $('#wind_mph').val(getWhetherAPIByIP.current.wind_mph);
    $('#wind_kph').val(getWhetherAPIByIP.current.wind_kph);
    $('#wind_degree').val(getWhetherAPIByIP.current.wind_degree);
    $('#wind_dir').val(getWhetherAPIByIP.current.wind_dir);

    $('#pressure_mb').val(getWhetherAPIByIP.current.pressure_mb);
    $('#pressure_in').val(getWhetherAPIByIP.current.pressure_in);
    $('#precip_mm').val(getWhetherAPIByIP.current.precip_mm);
    $('#precip_in').val(getWhetherAPIByIP.current.precip_in);

    $('#humidity').val(getWhetherAPIByIP.current.humidity);
    $('#cloud').val(getWhetherAPIByIP.current.cloud);
    $('#feelslike_c').val(getWhetherAPIByIP.current.feelslike_c);

    $('#feelslike_f').val(getWhetherAPIByIP.current.feelslike_f);
    $('#windchill_c').val(getWhetherAPIByIP.current.windchill_c);
    $('#windchill_f').val(getWhetherAPIByIP.current.windchill_f);
    $('#heatindex_c').val(getWhetherAPIByIP.current.heatindex_c);
    $('#heatindex_f').val(getWhetherAPIByIP.current.heatindex_f);
    $('#dewpoint_c').val(getWhetherAPIByIP.current.dewpoint_c);
    $('#dewpoint_f').val(getWhetherAPIByIP.current.dewpoint_f);
    $('#vis_km').val(getWhetherAPIByIP.current.vis_km);
    $('#vis_miles').val(getWhetherAPIByIP.current.vis_miles);
    $('#uv').val(getWhetherAPIByIP.current.uv);
    $('#gust_mph').val(getWhetherAPIByIP.current.gust_mph);
    $('#gust_kph').val(getWhetherAPIByIP.current.gust_kph);

    localStorage.setItem('weather_icon_url',getWhetherAPIByIP.current.condition.icon)

    // Set the image URL after the data is stored in local storage
    let weather_url = localStorage.getItem('weather_icon_url');
    document.getElementById('weather_icon_url').src = weather_url;
}

fetchWeatherDataByIP().then(r => console.log('Weather data fetched successfully'));
