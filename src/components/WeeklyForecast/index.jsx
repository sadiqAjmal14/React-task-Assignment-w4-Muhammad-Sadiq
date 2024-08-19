import weatherIconMapping from '../../utils/weatherIconMap';
import WeatherCardLayout from '../CardLayout';
import { useSelector } from 'react-redux';
import { units } from '../../utils/units';
const WeeklyForecast=({weatherData})=> {
  const unitsType=useSelector((store)=>store.units);
  const forecast = weatherData.daily.slice(0, 7).map(day => {
    const {date,day:dayName}=day.dt;
    const weatherCode = day.weather[0]?.icon;
    const WeatherIcon = weatherIconMapping[weatherCode] || weatherIconMapping['10d'];
    const temperature = day.temp.day.toFixed(1);
    return {
      dayName,
      date,
      temperature:(temperature+units[unitsType].temperature),
      icon: WeatherIcon,
    };
  });
  return (
    <WeatherCardLayout>
      <h2 className="text-lg font-bold mb-2 text-center bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
        7 Days Forecast
      </h2>
      <ul>
        {forecast.map((day, index) => (
          <li key={index} className="flex items-center justify-between mb-2 text-sm">
            <div className="flex items-center">
              <div className="text-xl mr-2">
                <day.icon />
              </div>
              <span>{day.temperature}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">{day.dayName}</span>
              <span className="text-gray-400">{day.date}</span>
            </div>
          </li>
        ))}
      </ul>
      </WeatherCardLayout>
  );
}

export default WeeklyForecast;