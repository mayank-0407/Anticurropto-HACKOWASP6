import React, { useState } from 'react';
import { MdLocationPin } from 'react-icons/md';
import { IoSearchSharp } from 'react-icons/io5';
import cardsData from './cardData.json';
import { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Tooltip } from 'react-tooltip';
import HeaderHome from '../../components/HeaderHome';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'black',
  // border: "1px solid #ffffff",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // change to your preferred color
        },
      },
    },
  },
});

function Cases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="h-screen">
          <HeaderHome />
          <div
            className="w-screen h-96 rounded flex flex-col items-center justify-center opacity-90"
            style={{
              backgroundImage: `url("https://www.ncsc.org/__data/assets/image/0035/65996/varieties/bannerLrg.png?v=0.1.0")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <div className="text-white text-5xl pb-4 font-bold drop-shadow-xl mb-8">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Pending - Cases',
                  4000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Pending - Cases',
                  1500,
                  'Pending - Cases',
                  1500,
                  'Pending - Cases',
                  1500,
                  'Pending - Cases',
                  1500,
                  'Pending - Cases',
                  1500,
                  'Pending - Cases',
                  1500,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '50px', display: 'inline-block' }}
                className="drop-shadow-xl"
                repeat={Infinity}
              />
            </div>
            <div className=" w-screen flex flex-row items-center justify-center">
              <input
                type="text"
                className="h-10 w-1/3 rounded-l-xl border-2 shadow-xl p-4"
                placeholder="Search for property by Location ,owner Name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="h-10 w-10 flex justify-center items-center bg-slate-800 rounded-r-xl cursor-pointer">
                <IoSearchSharp className="text-white" />
              </div>
            </div>
          </div>

          <div>
            {cardsData.lands
              .filter(
                (land) =>
                  land.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  land.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  land.location.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((land, index) => (
                <li
                  className="flex flex-row m-10 rounded-3xl border-2 h-2/6 searchable-item overflow-hidden"
                  key={index}
                >
                  <div className="border-2 w-1/4 rounded-l-3xl ">
                    <img
                      src={land.imageUrl}
                      alt="no image"
                      className="h-full w-full object-cover rounded-l-3xl"
                    />
                  </div>
                  <div className="h-full w-full flex flex-col backdrop-brightness-90  ">
                    <div className="w-3/4 ml-6 rounded-sm">
                      <p className="px-4 pt-4 text-2xl font-bold">{land.owner} : Pending</p>
                      <p className="pl-4">Case Date: {land.type}</p>
                      <div className="flex flex-row">
                        <p className="pl-4">Description: {land.area}</p>
                        {/* <div className="flex flex-row items-center">
													<MdLocationPin className="ml-1" />
													<p>Location: {land.location}</p>
												</div> */}
                      </div>
                    </div>
                    <div className="h-full m-10 flex justify-between items-center">
                      <p className="text-xl font-bold ">Current prize: ₹{land.currentRate}</p>
                      <div className="flex flex-row space-x-6">
                        {/* <button
													className="px-9 text-1/12 bg-slate-800 text-slate-100 p-2 rounded-xl shadow"
													// onClick={onOpen}
												>
													Details
												</button> */}
                        <div className="px-9 text-1/12 bg-slate-800 text-slate-100 p-2 rounded-xl shadow">
                          <Button onClick={handleOpen} style={{ color: 'white' }}>
                            Details
                          </Button>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography
                                color={'white'}
                                id="modal-modal-title"
                                variant="h4"
                                component="h2"
                              >
                                {land.owner} : {land.name}
                              </Typography>
                              <Typography
                                color={'white'}
                                id="modal-modal-description"
                                sx={{ mb: 2 }}
                              >
                                {land.type}, {land.area}
                              </Typography>
                              <div className="flex flex-row gap-4">
                                <img
                                  src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-akos-szabo-145938-440731.jpg&fm=jpg"
                                  style={{ height: 200 }}
                                ></img>
                                <img
                                  src="https://cdn.pixabay.com/photo/2018/11/06/22/29/land-3799279_1280.jpg"
                                  style={{ height: 200 }}
                                ></img>
                                {/* <img
																	src="hhttps://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg?cs=srgb&dl=pexels-pixabay-46160.jpg&fm=jpg"
																	style={{ height: 190 }}
																></img> */}
                                <img
                                  src="https://cdn.pixabay.com/photo/2013/11/19/17/20/field-213364_640.jpg"
                                  style={{ height: 200 }}
                                ></img>
                              </div>
                              <div className="flex flex-row mt-4 gap-4">
                                <img
                                  src="https://cdn.pixabay.com/photo/2013/11/19/17/20/field-213364_640.jpg"
                                  style={{ height: 200 }}
                                ></img>
                                <img
                                  src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?cs=srgb&dl=pexels-akos-szabo-145938-440731.jpg&fm=jpg"
                                  style={{ height: 200 }}
                                ></img>
                                <img
                                  src="https://cdn.pixabay.com/photo/2018/11/06/22/29/land-3799279_1280.jpg"
                                  style={{ height: 200 }}
                                ></img>
                                {/* <img
																	src="hhttps://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg?cs=srgb&dl=pexels-pixabay-46160.jpg&fm=jpg"
																	style={{ height: 190 }}
																></img> */}
                              </div>
                            </Box>
                          </Modal>
                        </div>

                        <button
                          className="px-11 text-sm bg-slate-800 text-slate-100 p-2 rounded-xl shadow"
                          data-tooltip-id="my-tooltip-1"
                          onClick={() => {
                            navigator.clipboard.writeText(land.phone);
                            setShowTooltip(true);
                            setTimeout(() => setShowTooltip(false), 2000); // hide after 2 seconds
                          }}
                        >
                          CONTACT
                        </button>
                      </div>
                      {showTooltip && (
                        <Tooltip id="my-tooltip-1" variant="info" content="Phone Number copied" />
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </div>
          <div className="py-4"></div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Cases;
