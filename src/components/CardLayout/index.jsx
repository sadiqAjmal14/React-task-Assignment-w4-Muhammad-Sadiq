function WeatherCardLayout({ children }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md w-full max-w-xs mx-auto md:max-w-md lg:max-w-md lg:h-auto">
      {children}
    </div>
  );
}

export default WeatherCardLayout;
