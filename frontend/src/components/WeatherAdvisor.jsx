
import useWeatherStore from "../store/useWeatherStore";
import { fetchWeatherAdvice } from "../api/weatherApi";

export default function WeatherAdvisor() {
  const {
    location,
    advice,
    loading,
    error,
    setLocation,
    fetchAdvice,
  } = useWeatherStore();

  function handleGetAdvice() {
    fetchAdvice(location, fetchWeatherAdvice);
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Weather Advisor</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <button onClick={handleGetAdvice} disabled={loading}>
        {loading ? "Loading..." : "Get Weather Advice"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {advice && (
        <div style={{ marginTop: 20 }}>
          <h3>Weather in {advice.location}</h3>
          <p>Weather: {advice.weather}</p>
          <p>Temperature: {advice.temperature}</p>
          <p>Advice: {advice.advice}</p>
          <p>Country: {advice.country}</p>
        </div>
      )}
    </div>
  );
}
