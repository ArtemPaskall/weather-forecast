import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchForecast, updateForecast } from '../api/api';
import { ForecastSliceState, ForecastActions } from '../types/types';

const initialState: ForecastSliceState = {
  forecast: [],
  cities: ['Kyiv', 'London', 'lviv', 'Paris', 'Odessa', 'Rome', 'Kharkiv', 'Prague'],
  status: null,
  error: null,
};

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<string>) {
        state.cities.push(action.payload);
    },
    removeForecast(state, action: PayloadAction<string>) {
      state.cities =  state.cities.filter(city => city.toLocaleLowerCase() !== action.payload.toLocaleLowerCase());
      state.forecast = state.forecast.filter(forecast => forecast.name !== action.payload);
    },
    clearForecasts(state) {
      state.forecast = [];
    },    
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state: ForecastSliceState) => {
      state.status = 'Loading...';
      state.error = null;
    });
    builder.addCase(updateForecast.pending, (state: ForecastSliceState, action: ForecastActions) => {
      state.status = 'Update...';
      state.error = null;
    });
    builder.addCase(fetchForecast.fulfilled, (state: ForecastSliceState, action) => {
      state.status = 'fulfilled';
      if (state.forecast.some(foresast => foresast.name === action.payload.name)) {
        state.error = 'Such a city is already exists';
      } else {
        state.forecast.push(action.payload);
        state.error = null;
      }
    });
    builder.addCase(updateForecast.fulfilled, (state: ForecastSliceState, action) => {
      state.status = 'Updated';
      const index = state.forecast.findIndex(forecast => forecast.name === action.payload.name);
      state.forecast[index] =  action.payload;
      state.error = null;
    });
    builder.addCase(fetchForecast.rejected, (state: ForecastSliceState, action: ForecastActions) => {
      state.status = 'rejected';     
      state.error = action.payload;
    });
    builder.addCase(updateForecast.rejected, (state: ForecastSliceState, action: ForecastActions) => {
      state.status = 'rejected';     
      state.error = action.payload;
    });
  }
});

export const { addCity, removeForecast, setError, clearForecasts } = forecastSlice.actions;
export default forecastSlice.reducer;
