import React, { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

const Carousel = () => {
  const [slide, setSlide] = useState(0);

  const data = {
    slides: [
      {
        src: './home/anti_2.jpg',
        alt: 'Image 2 for carousel',
      },
      {
        src: './home/anti_1.jpg',
        alt: 'Image 1 for carousel',
      },
      {
        src: './home/anti_3.png',
        alt: 'Image 3 for carousel',
      },
    ],
  };

  const nextSlide = () => {
    setSlide((slide) => (slide === data.slides.length - 1 ? 0 : slide + 1));
  };

  const prevSlide = () => {
    setSlide((slide) => (slide === 0 ? data.slides.length - 1 : slide - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center items-center w-screen h-[400px] transition-all duration-500">
      <BsArrowLeftCircleFill
        onClick={prevSlide}
        className="absolute left-1 arrow arrow-left text-white w-8 bg-color- h-8 opacity-50 hover:opacity-100"
      />
      {data.slides.map((item, idx) => (
        <img
          src={item.src}
          alt={item.alt}
          key={idx}
          className={
            slide === idx
              ? 'border-0.5 border-gray-500 rounded-md shadow-md w-full h-full'
              : 'hidden'
          }
        />
      ))}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className="absolute right-1 arrow arrow-right text-white w-8 h-8 opacity-50 hover:opacity-100"
      />
      <span className="absolute bottom-1 flex">
        {data.slides.map((_, idx) => (
          <button
            key={idx}
            className={
              slide === idx
                ? 'bg-white h-2 w-2 rounded-full border-none outline-none mx-1 shadow-md'
                : 'bg-gray-400 h-2 w-2 rounded-full border-none outline-none mx-1 shadow-md'
            }
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default Carousel;
