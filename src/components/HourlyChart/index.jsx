import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import WeatherCardLayout from '../CardLayout';
import { useSelector } from 'react-redux';
import { units } from '../../utils/units';
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  export default function HourlyWeatherChart({weatherData}) {
    const unitType=useSelector((store)=>store.units);
    if (!weatherData || !weatherData.hourly) return <p>No hourly forecast data available.</p>;
    const hourlyData = weatherData.hourly.slice(0, 12).map(hour => {
      const { time } = hour.dt;
      return {
        time: time,
        temp: hour.temp, 
        condition: hour.weather[0].description,
      };
    });
  
    const chartData = {
      labels: hourlyData.map(data => data.time),
      datasets: [
        {
          label: `Temperature (${units[unitType].temperature})`,
          data: hourlyData.map(data => data.temp),
          backgroundColor: '#4C51BF',
          borderColor: '#9F7AEA',
          borderWidth: 2,
        },
      ],
    };
  
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#9F7AEA',
          },
          grid: {
            color: '#4C51BF',
          },
        },
        x: {
          ticks: {
            color: '#9F7AEA',
          },
          grid: {
            color: '#4C51BF',
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const hourData = hourlyData[tooltipItem.dataIndex];
              return `Temp: ${hourData.temp+units[unitType].temperature}, Condition: ${hourData.condition}`;
            },
          },
        },
      },
    };
  
    return (
      <WeatherCardLayout>
 <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
          Hourly Forecast
        </h2>
        <Bar data={chartData} options={chartOptions} />
      </WeatherCardLayout>
    );
  }
  