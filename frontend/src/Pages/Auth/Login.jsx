import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Utils/API/authAPI';
import { setSessionToken } from '../../Utils/cookieSetup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sessionId, setSessionId] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let values = { email: email, password: password };
    try {
      const response = await loginUser(values);

      if (response.session.sessionToken) {
        setSessionId(response.session.sessionToken);
        setSessionToken(response.session.sessionToken);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-blue-800">
      <div className="flex items-center justify-center min-h-screen mx-20">
        <div className=" w-full bg-white rounded-xl shadow-xl p-8 mr-5">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 order-1 md:order-2 mb-4 md:mb-0">
              <img
                src="/login.jpg"
                alt="Login Logo"
                className="w-full h-auto md:h-full object-cover rounded-xl"
              />
            </div>
            <div className="md:w-1/3 order-2 md:order-1">
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleLogin} className="mb-4">
                  <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 text-left font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter the Email Address"
                      className="w-full p-2 border border-gray-300 rounded-xl mb-2 text-sm bg-gray-200"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-left font-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter the Password"
                      className="w-full p-2 border border-gray-300 rounded-xl mb-2 bg-gray-200 text-sm"
                    />
                  </div>
                  <button type="submit" className="bg-blue-800 text-white p-2 w-full rounded-xl">
                    Login
                  </button>
                </form>
                <div className="flex items-center justify-center">
                  <p className="mr-2">Don't have an account?</p>
                  <button onClick={() => navigate('/Signup')} className="text-blue-800">
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
