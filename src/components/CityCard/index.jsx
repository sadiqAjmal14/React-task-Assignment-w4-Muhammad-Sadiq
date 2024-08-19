import useWeatherData from "../../hooks/useWeatherData";
import WeatherCardLayout from "../CardLayout";
import LoadingModal from "../LoadingPage";

const CityCard = () => {
const {searchQuery,weatherData,isLoading,error}=useWeatherData();
if(isLoading)return <LoadingModal/>
if(error)return <p>Error fetching data</p>
if(!searchQuery)
    return  <p>Please enter a city name</p>

    if (!weatherData || !weatherData.current) return <p>No data available</p>;

  const { day, date, time } = weatherData.current.dt;

  return (
    <WeatherCardLayout>
      <div className="text-center">
        <h1 className="text-5xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {searchQuery}
        </h1>
        <h2 className="text-7xl font-bold mb-2 text-gray-300">
          {day}
        </h2>
        <h3 className="text-3xl text-gray-400">
          {date}
        </h3>
        <h3 className="text-3xl text-gray-400">
          {time}
        </h3>
      </div>
    </WeatherCardLayout>
  );
}

export default CityCard;
