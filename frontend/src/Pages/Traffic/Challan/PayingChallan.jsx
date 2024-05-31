import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isLogin, logOut, getToken } from '../../../Utils/cookieSetup';
import { fetchUserDetails } from '../../../Utils/API/authAPI';
import { addChallan, getChallansById } from '../../../Utils/API/challanApi';
import { ChallanContext } from '../../../context/ChallanContext';

function PayingChallan() {
  const { payChallan } = useContext(ChallanContext);
  const [isLoggedd, setisLoggedd] = useState(false);
  const { vehicleId, challanId } = useParams();
  const navigate = useNavigate();

  const challan = async (challanId) => {
    try {
      const challanData = await getChallansById(challanId);
      console.log(challanData.id);
      payChallan(challanData.id);
    } catch (error) {
      console.error('Error fetching challans:', error);
    }
  };

  useEffect(() => {
    const checkLoginSession = isLogin();
    if (checkLoginSession) {
      setisLoggedd(true);
      const challanData = challan(challanId);
    } else {
      setisLoggedd(false);
      navigate('/login');
    }
  }, []);

  return <div>PayingChallan</div>;
}

export default PayingChallan;
