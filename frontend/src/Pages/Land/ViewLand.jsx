import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandContext } from '../../context/LandContext';

const ViewLand = () => {
  const navigate = useNavigate();
  const { transactions, checkIfWalletIsConnect } = useContext(LandContext);

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <div
      className="h-full flex flex-row justify-center items-center font object-cover"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <div className="m-20 h-full flex flex-row items-center justify-center rounded-xl backdrop-brightness-90">
        <div className="flex flex-col md:flex-row">
          <div className="order-2 md:order-1">
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4 text-center">View Lands</h1>
              {transactions.map((land, index) => (
                <div key={index}>
                  <p>Area: {land.area}</p>
                  <p>Current Owner: {land.currentOwner}</p>
                  <p>Dimension of Land: {land.dimensionOfLand}</p>
                  <p>Land ID: {land.landId.toString()}</p>
                  <p>Land Identification Number: {land.landIdentificationNumber}</p>
                  <p>Land Type: {land.landType}</p>
                  <p>Location: {land.location}</p>
                  <p>Previous Owner: {land.prevOwner}</p>
                  <p>Status: {land.status}</p>
                  <p>Transfer Amount: {land.transferAmount.toString()}</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLand;
