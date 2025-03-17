import React from 'react';
import '../../globals.css';

const weatherData = [
  { day: '12 September', temp: '22°', condition: 'Mostly Sunny' },
  { day: '13 September', temp: '26°', condition: 'Sunny' },
  { day: '14 September', temp: '19°', condition: 'Cloudy' },
  { day: '15 September', temp: '22°', condition: 'Mostly Sunny' }
];

const WeatherForecast = () => {
  return (
    <div className="weather-forecast">
      {weatherData.map((item, index) => (
        <div key={index} className="weather-card">
          <h4>{item.day}</h4>
          <p>{item.temp}</p>
          <p>{item.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
