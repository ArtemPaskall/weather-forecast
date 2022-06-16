import React, { useState } from 'react';
import './serchBar.scss';
import { ForecastSliceState } from '../../types/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addCity, setError } from '../../store/forecastSlice';
import { fetchForecast } from '../../api/api';

export const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state: ForecastSliceState) => state.status);
  const state = useAppSelector((state: ForecastSliceState) => state);
  const [query, setQuery] = useState('');
  const error = useAppSelector((state: ForecastSliceState) => state.error);

  const searchHendler = () => {

    dispatch(fetchForecast(query))
      .then(response => {
        if (typeof response.payload === 'object') {
          if (!state.forecast.some(foresast => foresast.name === response.payload.name)) {
            dispatch(addCity(response.payload.name));
            setQuery('');
          } 
        } else {
          setQuery('');
        }
      })
  }

  return (
    <div className='forecast-list__search'>
      <label>
        <input
          className='forecast-list__search-input'
          placeholder='Search city'
          type="text"
          value={query}
          onChange={(event) => {
            dispatch(setError(null))
            setQuery(event.target.value)
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {  
              searchHendler()
            }}}
        />
        <button
          className='forecast-list__search-button'
          onClick={searchHendler}
        >
          Search
        </button>
      </label>
      <div className='forecast-list__search-error'>
        {error && <p>{error}</p>}
        {status === 'Loading...' && <p>{status}</p>}
      </div>
    </div>
  )
}