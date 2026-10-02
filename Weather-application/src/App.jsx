import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import axios from "axios";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [cityName, setCityName] = useState("")
  const [responseApi, setResponseApi] = useState(null)
  const [loading, setLoading] = useState(false)

  const APIKEY = `69e67c8bdadf637986d2a5ad89d314c4`

  const data = async () => {
    try {
      setLoading(true)

      const response = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`
      )

      setResponseApi(response.data)
      console.log(response.data);

    } catch (error) {
      console.log(error.message);

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="weather-app">
        <div className="weather-container">

          <h1>Weather App</h1>
          <p className="subtitle">Check the weather in any city</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Enter your city..."
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />

            <button onClick={data}>Search</button>
          </div>

          {loading && (
  <div className="loading-box">
    <div className="spinner"></div>
    <p>Fetching weather...</p>
  </div>
)}

          {responseApi && (
            <div className="weather-card">

              <div className="weather-header">
                <div>
                  <p className="label">Current Weather</p>

                  <h2>{responseApi.name}</h2>

                  <p className="description">
                    {responseApi.weather[0].description}
                  </p>
                </div>

                <div className="temperature">
                  {Math.round(responseApi.main.temp)}°C
                </div>
              </div>

              <div className="weather-info">

                <div className="info-box">
                  <span>🌡️</span>
                  <p>Feels Like</p>
                  <strong>
                    {Math.round(responseApi.main.feels_like)}°C
                  </strong>
                </div>

                <div className="info-box">
                  <span>💧</span>
                  <p>Humidity</p>
                  <strong>{responseApi.main.humidity}%</strong>
                </div>

                <div className="info-box">
                  <span>💨</span>
                  <p>Wind</p>
                  <strong>{responseApi.wind.speed} m/s</strong>
                </div>

                <div className="info-box">
                  <span>☁️</span>
                  <p>Cloudiness</p>
                  <strong>{responseApi.clouds.all}%</strong>
                </div>

                <div className="info-box">
                  <span>👁️</span>
                  <p>Visibility</p>
                  <strong>{responseApi.visibility / 1000} km</strong>
                </div>

                <div className="info-box">
                  <span>📊</span>
                  <p>Pressure</p>
                  <strong>{responseApi.main.pressure} hPa</strong>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default App