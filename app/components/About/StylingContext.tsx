import { useContext } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import lightAndDark from '../Styling'; 

export const useStylingContext = () => {
    const { mode } = useContext(DashboardContext);
    const currentMode = mode === 'light' ? lightAndDark.lightModeText : lightAndDark.darkModeText;
    return currentMode;
};