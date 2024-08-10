import React, { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleInput = (event) => {
    setCity(event);
  };

  const getWeatherInfo = () => {
    if (!city) return;  // Avoid making a request with an empty city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bc2535b3cc74c085dd3f8edd517880b9`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
      });
  };

  return (
    <>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-6 mx-auto text-center bg-warning rounded  p-5'>
            <h2 className="text-center">Weather Information</h2>

            <input
              type="text"
              value={city}
              onChange={(e) => handleInput(e.target.value)}
              className='form-control'
              placeholder='Enter City Name'
            />

            <button className="btn btn-dark mt-2" onClick={getWeatherInfo}>
              Get Weather Information
            </button>

            {weather && (
              <>
                <h2>City Name: {weather.name}</h2>
                <h2>Temp: {weather.main.temp}</h2>
                <h2>Info: {weather.weather[0].description}</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
