import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandContext } from '../../context/LandContext';
import { loginUser, fetchUserDetails } from '../../Utils/API/authAPI';
import { addLand } from '../../Utils/API/landAPI';
import { getToken, isLogin } from '../../Utils/cookieSetup';
import HeaderAdmin from '../../components/HeaderAdmin';

const AddLand = () => {
  const [error, setError] = useState('');
  const [iserror, setIsError] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [myUser, setMyUser] = useState('');
  const [isLoggedd, setisLoggedd] = useState(false);
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [dimensionOfLand, setDimensionOfLand] = useState('');
  const [landIdentificationNumber, setLandIdentificationNumber] = useState('');
  const [landType, setLandType] = useState('');

  const navigate = useNavigate();

  const { addLandToBlockchain, formData, checkIfWalletIsConnect } = useContext(LandContext);

  const handleNewSubmit = async (e) => {
    e.preventDefault();

    const myToken = getToken();
    const thisUser = await fetchUserDetails(myToken);
    setMyUser(thisUser.data.id);

    let tformData = {
      location: location,
      area: area,
      dimensionOfLand: dimensionOfLand,
      landIdentificationNumber: landIdentificationNumber,
      landType: landType,
    };

    const tempid = await addLandToBlockchain(tformData);
    console.log(tempid);
    let formDataDB = {
      location: location,
      area: area,
      dimensionOfLand: dimensionOfLand,
      landIdentificationNumber: landIdentificationNumber,
      landType: landType,
      ownerId: thisUser.data.id,
    };
    // console.log(formData);
    const res = await addLand(formDataDB);
    console.log('Res : ', res);
    if (res.status === 200) {
      navigate('/dashboard/land');
    } else {
      console.log(res.data.message);
    }
  };

  useEffect(() => {
    const checkLoginSession = isLogin();
    if (checkLoginSession) {
      setisLoggedd(true);
    } else {
      setisLoggedd(false);
      navigate('/login');
    }
    checkIfWalletIsConnect();
    console.log('print Land added: ', formData);
  }, []);

  return (
    <div
      className="h-screen  flex flex-row justify-center items-center font object-cover"
      style={{
        backgroundImage: `url(
          "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        )`,
      }}
    >
      <HeaderAdmin />
      <div className=" mt-40 w-1/3 m-20 p-4 flex flex-row items-center justify-center rounded-xl backdrop-brightness-90">
        <div className=" w-full flex flex-col  md:flex-row">
          <div className=" w-full order-2 md:order-1">
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4 text-center">Add Land</h1>

              <form className="mb-4" onSubmit={handleNewSubmit}>
                <div className="mb-2">
                  <label htmlFor="location" className="block mb-2 text-left font-semibold">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter the Location!"
                    className="w-full p-2 border border-gray-300 rounded-2xl mb-2 text-sm bg-blue-50 opacity-50"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="area" className="block mb-2 text-left font-semibold">
                    Area
                  </label>
                  <input
                    type="text"
                    name="area"
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Enter the Area!"
                    className="w-full p-2 border border-gray-300 rounded-2xl mb-2 text-sm bg-blue-50 opacity-50"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="dimensionOfLand" className="block mb-2 text-left font-semibold">
                    DimensionOfLand
                  </label>
                  <input
                    type="text"
                    name="dimensionOfLand"
                    id="dimensionOfLand"
                    value={dimensionOfLand}
                    onChange={(e) => setDimensionOfLand(e.target.value)}
                    placeholder="Enter the dimensionOfLand!"
                    className="w-full p-2 border border-gray-300 rounded-2xl mb-2 bg-blue-50 text-sm opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="landIdentificationNumber"
                    className="block mb-2 text-left font-semibold"
                  >
                    LandIdentificationNumber
                  </label>
                  <input
                    type="text"
                    name="landIdentificationNumber"
                    id="landIdentificationNumber"
                    value={landIdentificationNumber}
                    onChange={(e) => setLandIdentificationNumber(e.target.value)}
                    placeholder="Enter the landIdentificationNumber!"
                    className="w-full p-2 border border-gray-300 rounded-2xl mb-2 bg-blue-50 text-sm opacity-50"
                    required
                  />
                </div>
                <div className="mb-4 ">
                  <label htmlFor="landType" className="block mb-2 text-left font-semibold">
                    LandType
                  </label>
                  <select
                    name="landType"
                    id="landType"
                    value={landType}
                    onChange={(e) => setLandType(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-2xl mb-2 bg-blue-50 text-sm opacity-50"
                    required
                  >
                    <option value="" disabled selected>
                      Select Land Type
                    </option>
                    <option value="1">Government</option>
                    <option value="2">Commercial</option>
                    <option value="3">Agricultural</option>
                    <option value="4">Industrial</option>
                    <option value="5">Residential</option>
                  </select>
                </div>
                {iserror ? (
                  <div class="px-1 my-2 text-sm text-red-500 rounded-lg" role="alert">
                    <span class="font-medium"> {'*' + error} </span>
                  </div>
                ) : (
                  <></>
                )}
                <button type="submit" className="bg-blue-800 text-white p-2 w-full rounded-2xl">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLand;
