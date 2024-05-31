import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/footer';
import { getUserVehicles } from '../../../Utils/API/vehicleApi';
import { isLogin, logOut, getToken } from '../../../Utils/cookieSetup';
import { fetchUserDetails } from '../../../Utils/API/authAPI';

import { useNavigate } from 'react-router-dom';

const VehiclesPage = () => {
  const [isLoggedd, setisLoggedd] = useState(false);
  const [myUser, setMyUser] = useState('');
  // const [myVehicles, setMyVehicles] = useState([]);
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);

  const getallvehicles = async () => {
    const myToken = getToken();
    const thisUser = await fetchUserDetails(myToken);
    setMyUser(thisUser.data.id);
    const myvehicles = await getUserVehicles(thisUser.data.id);
    setVehicles(myvehicles);
  };

  useEffect(() => {
    const checkLoginSession = isLogin();
    if (checkLoginSession) {
      setisLoggedd(true);
      getallvehicles();
    } else {
      setisLoggedd(false);
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <div className="flex-col space-y-5">
        <Navbar />
      </div>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => {
              navigate('/dashboard/vehicle/add');
            }}
            className="bg-blue-600 rounded-md mr-4 hover:bg-blue-700 text-white p-2 my-3"
          >
            + Add Vehicle
          </button>
          <div className="grid gap-8">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white overflow-hidden rounded-lg shadow-md md:flex"
              >
                <div className="px-6 py-8 md:w-1/2">
                  <h2 className="text-xl font-semibold"> Vehicle Number : {vehicle.plateNumber}</h2>
                  <p className="text-gray-600">
                    {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.color}
                  </p>

                  <button
                    className="mt-4 px-3 py-2 bg-blue-600 text-white rounded shadow"
                    onClick={() => {
                      navigate(`/dashboard/vehicle/view/${vehicle.id}`);
                    }}
                  >
                    View Details
                  </button>
                  <p></p>
                  <button
                    className="mt-4 px-3 py-2 bg-blue-600 text-white rounded shadow"
                    onClick={() => {
                      navigate(`/dashboard/vehicle/${vehicle.id}/challan`);
                    }}
                  >
                    Challans
                  </button>
                </div>

                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  // height={1}
                  // width={5}
                  className="mx-auto h-full w-[500px] rounded-r-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default VehiclesPage;
