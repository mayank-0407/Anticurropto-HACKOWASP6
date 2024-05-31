import React from 'react';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { images } from './assets/images';

import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Dashboard from './Pages/Dashboard';
import VehiclesPage from './Pages/Traffic/Vehicle/VehiclesPage';
import ViewVehicle from './Pages/Traffic/Vehicle/ViewVehicle';
import VehicleChallan from './Pages/Traffic/Challan/VehicleChallan';
import AddVehicle from './Pages/Traffic/Vehicle/AddVehicle';
import AddVehicleChallan from './Pages/Traffic/Challan/AddVehicleChallan';
import PayingChallan from './Pages/Traffic/Challan/PayingChallan';
import AddLand from './Pages/Land/AddLand';
import ViewLand from './Pages/Land/ViewLand';
import LandDashboard from './Pages/Land/LandDashboard';
import Market from './Pages/Land/Market';
import TransferLand from './Pages/Land/TransferLand';
import Cases from './Pages/Land/Cases';

export default function App() {
  return (
    <BrowserRouter className="flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/vehicle" element={<VehiclesPage />} />
        <Route path="/dashboard/vehicle/view/:vehicleId" element={<ViewVehicle />} />
        <Route path="/dashboard/vehicle/:vehicleId/challan" element={<VehicleChallan />} />
        <Route
          path="/dashboard/vehicle/:vehicleId/challan/:challanId"
          element={<PayingChallan />}
        />
        <Route path="/dashboard/vehicle/:vehicleId/challan/add" element={<AddVehicleChallan />} />
        <Route path="/dashboard/vehicle/add" element={<AddVehicle />} />
        <Route path="/dashboard/land" element={<LandDashboard />} />
        <Route path="/dashboard/land/addland" element={<AddLand />} />
        <Route path="/dashboard/land/View" element={<ViewLand />} />
        <Route path="/dashboard/land/Market" element={<Market />} />
        <Route path="/dashboard/land/transfer/:id" element={<TransferLand />} />
        <Route path="/dashboard/land/cases" element={<Cases />} />
      </Routes>
    </BrowserRouter>
  );
}
