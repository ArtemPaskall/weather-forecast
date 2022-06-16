export type Forecast = {
    name: string,
    main: {
      feels_like: string,
      temp: string,
      pressure: string,
      humidity: string,
      temp_max: string,
      temp_min: string
    },
    weather: [
      {
        main: string,
        icon: string,
        description: string
      }
    ],
    sys: {
      sunrise: string,
      sunset: string,
      country: string
    }
    wind: {
      speed: string
    }
  };

  export interface ForecastSliceState {
    forecast: Forecast[],
    cities: string[],
    status: null | string,
    error: null | string
  };
  
  export interface ForecastActions {
    type: string,
    payload?: any,
  };
