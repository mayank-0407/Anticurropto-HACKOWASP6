import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import VeicleProvider from './context/VehicleContext';
import ChallanProvider from './context/ChallanContext';
import LandProvider from './context/LandContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VeicleProvider>
      <ChallanProvider>
        <LandProvider>
          <App />
        </LandProvider>
      </ChallanProvider>
    </VeicleProvider>
  </React.StrictMode>
);
