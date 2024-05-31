import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Anti Corrupto</h1>
          <p className="text-sm">fight againt corruption</p>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <p className="text-sm">Follow us:</p>
          <div className="ml-2">
            <a href="#" className="text-white hover:text-gray-300 mr-2">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300 mr-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
