import React, { useRef, useEffect } from 'react';

const UpdatesTab = () => {
  const updates = [
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    {
      id: 1,
      image: 'login.jpg',
      text: 'New notification 1',
    },
    // Add other updates here
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const animationDuration = (scrollWidth / 50) * 1000; // Adjust the animation duration as needed
      container.style.animation = `scrollAnimation ${animationDuration}ms linear infinite`;
      const keyframes = `@keyframes scrollAnimation {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${scrollWidth}px);
        }
      }`;
      const styleSheet = document.styleSheets[0];
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
      return () => {
        container.style.animation = ''; // Clear animation when component unmounts
        styleSheet.deleteRule(styleSheet.cssRules.length - 1); // Remove the keyframes rule
      };
    }
  }, []);

  return (
    <div className="flex px-14 items-center">
      <h2 className="text-4xl font-bold mb-2 px-2">New in Anticorrupto</h2>
      <div className="flex flex-no-wrap overflow-hidden">
        <div ref={containerRef} className="flex">
          {/* Duplicate the updates list to create a loop */}
          {[...updates, ...updates].map((update, index) => (
            <div key={index} className="w-64 flex-shrink-0 mr-4">
              <div className="bg-white rounded-lg shadow-md relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                <img
                  src={update.image}
                  alt=""
                  className="h-40 w-full object-cover rounded-t-lg max-w-xs transition duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatesTab;
