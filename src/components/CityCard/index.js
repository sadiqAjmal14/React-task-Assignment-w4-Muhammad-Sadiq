import WeatherCardLayout from "../CardLayout";
const CityCard=({ searchQuery='', weatherData=null })=>{
  if (!weatherData || !weatherData.current) return null;

  const { day, date, time } = weatherData.current.dt;

  return (
    <WeatherCardLayout>
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {searchQuery}
        </h1>
        <h1 className="text-3xl font-bold mb-1 text-gray-300">
          {day}
        </h1>
        <h2 className="text-sm text-gray-400">
          {date}
        </h2>
        <h2 className="text-sm text-gray-400">
          {time}
        </h2>
      </div>
    </WeatherCardLayout>
  );
}

export default CityCard;
