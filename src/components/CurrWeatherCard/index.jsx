import WeatherDetail from '../WeatherDetail';
import WeatherCardLayout from '../CardLayout';
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny } from "react-icons/wi";
import getFormattedDateTime from '../../utils/getDate';
import weatherIconMapping from '../../utils/weatherIconMap';
import { units } from '../../utils/units';
import { useSelector } from 'react-redux';
function CurrentWeatherCard({ weatherData }) {
  const unitsType=useSelector((store)=>store.units);
  const { 
    temp: temperature, 
    feels_like: feelsLike, 
    sunrise, 
    sunset, 
    pressure, 
    humidity, 
    wind_speed: windSpeed, 
    uvi: uvIndex, 
    weather 
  } = weatherData.current;

  const { time: sunriseTime } = getFormattedDateTime(sunrise, weatherData.timezone);
  const { time: sunsetTime } = getFormattedDateTime(sunset, weatherData.timezone);
  const WeatherIcon=weatherIconMapping[weather[0].icon];
  return (
    <WeatherCardLayout>
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {temperature+units[unitsType].temperature}
          </h1>
          <p className="text-sm text-gray-300">
            Feels like: <span className="font-semibold">{feelsLike+units[unitsType].temperature}</span>
          </p>
        </div>

        <div className="text-4xl text-gradient-end">
          <WeatherDetail icon={<WeatherIcon className="text-5xl" />} label={weather[0]?.main} />
        </div>

        <div className="flex flex-col items-end">
          <WeatherDetail icon={<FiSunrise />} label="Sunrise" value={sunriseTime} />
          <WeatherDetail icon={<FiSunset />} label="Sunset" value={sunsetTime} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-2 border-t border-gray-700">
    <WeatherDetail icon={<WiHumidity />} label="Humidity" value={`${humidity}%`} />
    <WeatherDetail icon={<WiStrongWind />} label="Wind" value={`${windSpeed + units[unitsType].windSpeed}`} />
    <WeatherDetail icon={<WiBarometer />} label="Pressure" value={`${pressure + units[unitsType].pressure}`} />
    <WeatherDetail icon={<WiDaySunny />} label="UV Index" value={uvIndex} />
</div>

    </WeatherCardLayout>
  );
}

export default CurrentWeatherCard;
