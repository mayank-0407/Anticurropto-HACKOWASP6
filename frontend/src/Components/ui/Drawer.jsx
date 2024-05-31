// App.js
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Drawer() {
  const [isDrawerShowing, setDrawerShowing] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerShowing(!isDrawerShowing);
  };

  const drawerAnimation = useSpring({
    left: isDrawerShowing ? window.innerWidth - 300 : window.innerWidth,
    position: 'absolute',
    top: 0,
    backgroundColor: '#806290',
    height: '100vh',
    width: '300px',
  });

  return (
    <div className="bg-yellow-300 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Hi Medium</h1>
      <h2 className="text-xl font-semibold mb-8">Custom slide-in drawer with react-spring</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-semibold"
        onClick={handleToggleDrawer}
      >
        {isDrawerShowing ? 'Close' : 'Open'}
      </button>
      <animated.div style={drawerAnimation}>
        <div className="drawer bg-purple-600 text-white text-center font-semibold">
          Animated Drawer!
        </div>
      </animated.div>
    </div>
  );
}
