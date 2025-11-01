import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found or API error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const lower = condition.toLowerCase();
    if (lower.includes("clear")) return "☀️";
    if (lower.includes("cloud")) return "☁️";
    if (lower.includes("rain")) return "🌧️";
    if (lower.includes("storm")) return "⛈️";
    if (lower.includes("snow")) return "❄️";
    if (lower.includes("mist") || lower.includes("fog")) return "🌫️";
    return "🌍";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-sky-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-6 flex justify-center items-center gap-2">
          🌦️ Weather Forecast
        </h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border-2 rounded-l-md w-2/3 text-gray-800 outline-none"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-r-md transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-black text-lg animate-pulse">Loading...</p>}

        {error && <p className="text-red-700 mt-4">{error}</p>}

        {weather && (
          <div className="text-black mt-6">
            <div className="text-6xl mb-2">{getWeatherIcon(weather.weather[0].main)}</div>
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-lg capitalize">{weather.weather[0].description}</p>
            <p className="text-5xl font-bold mt-2">
              {Math.round(weather.main.temp)}°C
            </p>

            <div className="mt-4 flex justify-center gap-8 text-sm text-black">
              <div>Humidity: {weather.main.humidity}%</div>
              <div> Wind: {weather.wind.speed} m/s</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
