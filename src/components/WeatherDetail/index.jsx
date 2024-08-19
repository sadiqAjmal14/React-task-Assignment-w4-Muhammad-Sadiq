function WeatherDetail({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <div className="text-lg text-blue-500">
        {icon}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-300 font-medium">{label}</p>
        <p className="text-sm text-gray-400">{value}</p>
      </div>
    </div>
  );
}

export default WeatherDetail;
