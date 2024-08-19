import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getFormattedDateTime from '../../../utils/getDate';
export const getWeather = createApi({
    reducerPath: 'getWeather',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.openweathermap.org/',
    }),
    tagTypes: ['Locations', 'Weather'],
    endpoints: (builder) => ({
      getWeather: builder.query({
          query: ({ lon, lat, units }) =>
              `data/3.0/onecall?lat=${lat}&lon=${lon}&appid=744b0d278f50c5bbc6f57aa39d504542&units=${units}`,
          transformResponse: (response, meta, { units }) => {
              const timezone = response.timezone;
              return {
                  ...response,
                  current: {
                      ...response.current,
                      dt: getFormattedDateTime(response.current.dt, timezone),
                  },
                  hourly: response.hourly.map((item) => ({
                      ...item,
                      dt: getFormattedDateTime(item.dt, timezone),
                  })),
                  daily: response.daily.map((item) => ({
                      ...item,
                      dt: getFormattedDateTime(item.dt, timezone),
                  })),
                  units, // Include units in the transformed response
              };
          },
          providesTags: (result, error, { lat, lon, units }) => {
              if (result && result.current && lat !== undefined && lon !== undefined) {
                return [{ type: 'Weather', id: `${lat}_${lon}_${units}` }];
              } else {
                  return [{ type: 'Weather' }];
              }
          },
      }),
        getLocations: builder.query({
            query: ({ city }) => `geo/1.0/direct?q=${city}&limit=5&appid=744b0d278f50c5bbc6f57aa39d504542`,
            providesTags: (result) => {
                if (Array.isArray(result)) {
                    return [
                        result.map(({ name, lon, lat }) => ({ type: 'Location', id: `${name}_${lon}_${lat}` })),
                        { type: 'Location', id: 'LIST' },
                    ];
                } else {
                    return [{ type: 'Location', id: 'LIST' }];
                }
            },
        }),    
    }),
});

export const { useGetWeatherQuery, useGetLocationsQuery } = getWeather;
