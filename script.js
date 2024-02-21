document.addEventListener("DOMContentLoaded", function () {
    // Get the city code from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const cityCode = urlParams.get('city');
    const colorIndex = urlParams.get('colorIndex');
    console.log(cityCode);

    // Check if data is present in the cache and not expired
    const cachedData = localStorage.getItem('weatherCache');
    if (cachedData) {
        const { data } = JSON.parse(cachedData);
        // Search for the city code in the cached data
        const cityData = data.find(city => city.CityCode === parseInt(cityCode));
        if (cityData) {
            // If the city code is found in the cached data, display its details
            console.log(cityData);
            const cardContainer = document.getElementById('card-container');
            cardContainer.appendChild(createCard(cityData, colorIndex)); // Assuming color index 0
        } else {
            console.error('City code not found in the cached data.');
        }
    } else {
        console.error('No cached data available.');
    }
});

const colorOptions = [
    'lightblue', '#2F539B', '#00827F', '#348781', '#006A4E',
    '#99C68E', 'lightseagreen', '#77DD77'
];
function createCard(cardDetails, colorIndex) {
    const card = document.createElement('div');
    card.className = 'col-md-6'; // Adjust column width for smaller screens if needed
    console.log(colorOptions[colorIndex]);
    card.innerHTML = `
        <div class="card">
        <div class="top-section" style="background-color: ${colorOptions[colorIndex]}">
           <p><button style="position: absolute; top: 0; left: 0; background: none; border: none;" onclick="window.history.back()"><i class="fas fa-arrow-left"></i></button></p>
           <h2>${cardDetails.CityName}, ${cardDetails.country}</h2>
           <p>${formatDateTime(cardDetails.Sunrise)}</p>
                <div class="row" >
                    <div class="col-md-6">
                        
                        <img src="http://openweathermap.org/img/wn/${cardDetails.Icon}.png" alt="Weather Icon" class="white-icon">
                        
                    </div>
                    <div class="col-md-6">
                        <h2>${cardDetails.Temp}°C</h2>
                        <p>Temp Max: ${cardDetails.MaxTemp}°C</p>
                        <p>Temp Min: ${cardDetails.MinTemp}°C</p>
                        <!-- Add more details here -->
                    </div>
                </div>
            </div>
            <div class="bottom-section">
                <div class="row">
                    <div class="col-md-4">
                        <p>Pressure: ${cardDetails.Pressure}hpa</p>
                        <p>Humidity: ${cardDetails.Humidity}%</p>
                        <p>Visibility: ${cardDetails.Visibility}m</p>
                        <!-- Add more bottom column data here -->
                    </div>
                    <div class="col-md-4">
                        <p>&emsp;&emsp;<i class="fab fa-telegram-plane" aria-hidden="true"></i></p>
                        <p>${cardDetails.WindSpeed} m/s${cardDetails.WindDirection}°</p>
                        <!-- Add more bottom column data here -->
                    </div>
                    <div class="col-md-4">
                        <p>Sunrise: ${new Date(cardDetails.Sunrise * 1000).toLocaleTimeString()}</p>
                        <p>Sunset: ${new Date(cardDetails.Sunset * 1000).toLocaleTimeString()}</p>
                        <!-- Add more bottom column data here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    return card;
}

function formatDateTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const hours = date.getHours() % 12 || 12; // Get hours in 12-hour format
    const minutes = date.getMinutes();
    const period = date.getHours() < 12 ? 'a.m.' : 'p.m.'; // Determine if it's a.m. or p.m.

    // Get month abbreviation (e.g., Jan, Feb, etc.)
    const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

    // Get day in two-digit format (e.g., '08')
    const day = String(date.getDate()).padStart(2, '0');

    return `${hours}.${minutes}${period},${monthAbbreviation}${day}`;
}
