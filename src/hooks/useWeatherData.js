import { useSelector } from 'react-redux';
import { useGetLocationsQuery, useGetWeatherQuery } from '../Redux/slices/getWeatherApi';
import { useMemo } from 'react';

const useWeatherData = () => {
    const search = useSelector((store) => store.search);
    const searchQuery = search[0] || '';
    const units=useSelector((store)=>store.units);
    const { data: locations = [], isFetching: isFetchingLocations } = useGetLocationsQuery(
        { city: searchQuery },
        { skip: !searchQuery }
    );

    const coordinates = useMemo(() => {
        if (!locations.length) return null;
        return { lon: locations[0].lon, lat: locations[0].lat,units:units };
    }, [locations,units]);

    const { data: weatherData, isFetching: isFetchingWeather, error } = useGetWeatherQuery(
        coordinates,
        { skip: !coordinates }
    );

    const isLoading = isFetchingLocations || isFetchingWeather;

    return { searchQuery, locations, weatherData, isLoading, error };
};

export default useWeatherData;
