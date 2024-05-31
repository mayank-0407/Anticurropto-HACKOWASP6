export default function ConnectToApp() {
  return (
    <div className="flex justify-center my-20">
      <div className="w-1/3 p-4 transform transition-all duration-300 hover:scale-100">
        {/* Left Card */}
        <div className="shadow-md rounded-md p-4 bg-orange-400 h-full">
          <h2 className="text-lg font-semibold mb-2"></h2>
        </div>
      </div>
      <div className="w-1/3 p-4">
        {/* Right Card */}
        <div className=" shadow-md rounded-md p-4 h-full bg-gray-100">
          <h2 className="text-lg font-semibold mb-2"></h2>
          <div className="relative w-full h-40 rounded-md overflow-hidden">
            <img
              src="/home_card.png"
              alt="Image"
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
