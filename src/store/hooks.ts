import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from ".";
import { ForecastSliceState } from '../types/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ForecastSliceState> = useSelector;