import React from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeatherCard from './components/CurrWeatherCard';
import LocationCard from './components/CityCard';
import HourlyWeatherChart from './components/HourlyChart';
import WeeklyForecast from './components/WeeklyForecast';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnitType } from './Redux/slices/UnitsSlice';

function App() {
  
  const unit = useSelector((store) => store.units);
  const dispatch = useDispatch();
  const toggleUnit = () => {
    dispatch(toggleUnitType());
  };
  const searchQuery = useSelector((store) => store.search);
  return (
    <div className="min-h-screen bg-dark-bg text-white p-4 relative">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl mb-6 font-extrabold text-blue-600 animate-pulse text-center">
          OPEN WEATHER
        </h2>
        <SearchBar />
        {(searchQuery.length > 0) && (
          <div className="flex items-center justify-end space-x-4 p-4">
            <h2 className="text-lg bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">°C</h2>
            <button
              type="button"
              onClick={toggleUnit}
              className="w-16 h-8 bg-gray-600 rounded-full p-1 flex items-center"
            >
              <div
                className={`w-7 h-7 bg-gradient-start rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  unit === "metric" ? 'translate-x-0' : 'translate-x-8'
                }`}
              ></div>
            </button>
            <h2 className="text-lg bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">°F</h2>
          </div>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 justify-items-center">
    <LocationCard />
    <CurrentWeatherCard />
    <HourlyWeatherChart />
    <WeeklyForecast />
</div>


</div>
    </div>
  );
}

export default App;
