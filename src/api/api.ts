import { createAsyncThunk } from '@reduxjs/toolkit'

const createFetchString = (city: string) => {
  const key = '3eba3615bfb68ce5e3324a8eac766d36';
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  
  return (BASE_URL)
}

export const requestToServer = (name: string) => createAsyncThunk(
  `forecast/${name}`,
  async function(city: string, {rejectWithValue}) {
    try {
      const response =  await fetch(createFetchString(city));

      const data =  await response.json();

       if (data.message) {
        throw new Error (data.message)
      }

      return data;
      
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  } ,
);

export const fetchForecast = requestToServer('fetchForecast');
export const updateForecast = requestToServer('updateForecast');
