import React, { useEffect } from 'react';
import './App.scss';
import { fetchForecast } from './api/api';
import { clearForecasts } from './store/forecastSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ForecastSliceState } from './types/types';
import { ForecastList } from './components/forecastList/forecastList';
import { ForecastPage } from './components/forecastPage/forecastPage';
import { Routes, Route } from 'react-router-dom';

export const App:React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: ForecastSliceState) => state);

  useEffect(() => {
    dispatch(clearForecasts())
    for (let i = 0; i < state.cities.length; i++) {
      dispatch(fetchForecast(state.cities[i]))
    }
  }, [dispatch]);
console.log(state);

  return (
    <div className='App'>
      <Routes >
        <Route path="/" element={<ForecastList />} />
        <Route path="forecast-for-:name" element={<ForecastPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
}
