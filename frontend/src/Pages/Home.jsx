import React from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/home/Carousel';
import Updates from '../components/home/Updates';
import ConnectToApp from '../components/home/ConnectToApp';
import ServiceIcon from '../components/home/Services';
import Footer from '../components/footer';

const Home = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <Navbar />
      </div>
      <div className="py-4">
        <Carousel />
      </div>
      <Updates />
      <div className="bg-slate-50">
        <div className="mx-[100px] my-5 py-5 ">
          <h1 className="text-center text-4xl font-bold mt-2 font-3xl pb-4">Services</h1>
          <ServiceIcon />
        </div>
      </div>

      <div className="mt-10">
        <ConnectToApp />
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
