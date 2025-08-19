import realimg from "../../../img/realimg.png"
import Border from "../../../img/homemarketplacetop.png"

const RealValue = () => {
  return (
    <section className="bg-black">
      <div className=" text-white px-6 py-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs text-gray-400 mb-2">
            Always by <span className="text-cyan-500">your side</span>
          </p>
          <h2 className=" md:text-2xl font-semibold mb-4">
            Real Value, Real Use Cases
          </h2>
          <p className="text-xs md:text-sm text-gray-400">
            Whether you’re an individual earning from surveys, a business
            collecting high-integrity data, or a developer integrating Web3
            tools — Surdacia is built to serve your needs securely and
            seamlessly.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button className="px-4 md:px-6 md:py-2 py-1 hover:scale-95 border-blue-400/50 hover:border-1 lg:hover:border-2 border-dashed  rounded-md text-white text-sm lg:font-medium w-32 hover:text-blue-500 hover:border-blue/50 bg-white/15 cursor-pointer">
             log In
            </button>
            <button className="px-4 md:px-6 md:py-2 py-1 hover:scale-95 border-blue-400/50 border-1 lg:border-2 border-dashed  rounded-md text-white text-sm lg:font-medium hover:text-blue-500 w-32 hover:border-blue/50 cursor-pointer">
              Try Now →
            </button>
          </div>
        </div>

        {/* Single Image container */}
        <div className=" rounded-xl  flex justify-center">
          <img
            src={realimg}
            alt="Use Cases Illustration"
            className="w-full flex-1 max-w-6xl h-30 md:h-auto rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="py-2" style={{
        backgroundImage: `url(${Border})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // optional, makes sure it fills the area
      }}></div>
    </section>
  );
};

export default RealValue;
