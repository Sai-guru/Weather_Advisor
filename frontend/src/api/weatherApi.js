// src/api/weatherApi.js

export async function fetchWeatherAdvice(location) {
  if (!location) throw new Error("Location is required");

  const response = await fetch("https://weather-advisor.onrender.com/weather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ location }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to fetch weather advice");
  }

  return response.json(); // returns { location, advice }
}
