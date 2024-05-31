import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/footer';
import { addVehicle } from '../../../Utils/API/vehicleApi';
import { isLogin, logOut, getToken } from '../../../Utils/cookieSetup';
import { VehicleContext } from '../../../context/VehicleContext';
import { fetchUserDetails } from '../../../Utils/API/authAPI';

const AddVehicle = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [pnum, setPnum] = useState(0);
  const [isLoggedd, setisLoggedd] = useState(false);
  const [myUser, setMyUser] = useState('');

  const { currentAccount, addVehicleToBlockchain, checkIfWalletIsConnect, formData } =
    useContext(VehicleContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginSession = isLogin();
    if (checkLoginSession) {
      setisLoggedd(true);
    } else {
      setisLoggedd(false);
      navigate('/login');
    }
    checkIfWalletIsConnect();
    console.log('print vehicles added: ', formData);
    console.log(VehicleContext);
  }, []);

  const handleBlockchain = async () => {
    let tformData = {
      vehicleId: plateNumber,
      phoneNum: pnum,
      buyDate: year,
      model: model,
      plateNum: plateNumber,
      insuranceValidity: year,
      pollutionValidity: year,
    };
    const tempid = addVehicleToBlockchain(tformData);
    return tempid;
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    await handleBlockchain();

    const myToken = getToken();
    const thisUser = await fetchUserDetails(myToken);
    setMyUser(thisUser.data.id);
    const vehicleData = {
      plateNumber,
      make,
      model,
      year,
      color,
      ownerId: thisUser.data.id,
    };
    const res = await addVehicle(vehicleData);
    if (res.status === 200) {
      navigate('/dashboard/vehicle');
    } else {
      alert('Error in adding vehicle');
    }
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="flex justify-center py-20">
        <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 mr-5">
          <h1 className="text-3xl font-bold mb-4 text-center">Add Vehicle</h1>
          <form onSubmit={handleAddVehicle} className="mb-4">
            <div className="mb-2">
              <label htmlFor="plateNumber" className="block mb-2 text-left font-semibold">
                Plate Number
              </label>
              <input
                type="text"
                id="plateNumber"
                name="plateNumber"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="Enter Plate Number"
                className="w-full p-2 border border-gray-300 rounded-xl mb-2 text-sm bg-gray-200"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="make" className="block mb-2 text-left font-semibold">
                Make
              </label>
              <input
                type="text"
                id="make"
                name="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Enter Make"
                className="w-full p-2 border border-gray-300 rounded-xl mb-2 text-sm bg-gray-200"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="model" className="block mb-2 text-left font-semibold">
                Phone Number
              </label>
              <input
                type="number"
                id="pnum"
                name="pnum"
                value={pnum}
                onChange={(e) => setPnum(e.target.value)}
                placeholder="Enter Phone Number"
                className="w-full p-2 border border-gray-300 rounded-xl mb-2 text-sm bg-gray-200"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="model" className="block mb-2 text-left font-semibold">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter Model"
                className="w-full p-2 border border-gray-300 rounded-xl mb-2 text-sm bg-gray-200"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="year" className="block mb-2 text-left font-semibold">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter Year"
                className="w-full p-2 border border-gray-300 rounded-xl mb-2 text-sm bg-gray-200"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="color" className="block mb-2 text-left font-semibold">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter Color"
                className="w-full p-2 border border-gray-300 rounded-xl mb-2 text-sm bg-gray-200"
              />
            </div>
            <button type="submit" className="bg-blue-800 text-white p-2 w-full rounded-xl">
              Add Vehicle
            </button>
          </form>
          <div className="flex items-center justify-center">
            <button onClick={() => navigate('/')} className="text-blue-800">
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddVehicle;
