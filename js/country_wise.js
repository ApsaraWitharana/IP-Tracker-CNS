// let baseUrl = '';
let baseUrl = 'https://api.ipgeolocation.io/ipgeo?apiKey=85291b732f5d4d6d8c6eb16c57382251';

async function fetchGeolocationData() {
    try {
        let ipifyResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipifyResponse.ok) {
            throw new Error('Network response was not ok while fetching IP address');
        }
        let ipifyData = await ipifyResponse.json();
        console.log('IP Address:', ipifyData.ip);

        let fullUrl = `${baseUrl}&ip=${ipifyData.ip}`;

        let geolocationResponse = await fetch(fullUrl, {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Accept': '*/*',
            }
        });

        if (!geolocationResponse.ok) {
            throw new Error('Network response was not ok while fetching geolocation data');
        }

        let geolocationData = await geolocationResponse.json();

        $('#country_name_official').val(geolocationData.country_name_official);
        $('#state_prov').val(geolocationData.state_prov);
        $('#country_name').val(geolocationData.country_name);
        $('#continent_name').val(geolocationData.continent_name);
        $('#continent_code').val(geolocationData.continent_code);
        $('#country_capital').val(geolocationData.country_capital);
        $('#city').val(geolocationData.city);
        $('#zipcode').val(geolocationData.zipcode);
        $('#latitude').val(geolocationData.latitude);
        $('#longitude').val(geolocationData.longitude);
        $('#currency_code').val(geolocationData.currency.code);
        $('#currency_name').val(geolocationData.currency.name);
        $('#currency_symbol').val(geolocationData.currency.symbol);
        $('#time_zone_current_time').val(geolocationData.time_zone.current_time);
        $('#calling_code').val(geolocationData.calling_code);
        $('#geoname_id').val(geolocationData.geoname_id);
        $('#isp').val(geolocationData.isp);
        $('#organization').val(geolocationData.organization);

        localStorage.setItem('country_flag', geolocationData.country_flag)

        // Set the image URL after the data is stored in local storage
        let imageUrl = localStorage.getItem('country_flag');
        document.getElementById('country_flag').src = imageUrl;

        await fetchWeatherDataByIP(ipifyData.ip);

    } catch (error) {
        console.log('Error:', error);
    }
}

fetchGeolocationData().then(r => console.log('Geolocation data fetched successfully'));
