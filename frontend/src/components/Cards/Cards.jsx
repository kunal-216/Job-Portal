/* eslint-disable react/prop-types */

const Cards = ({ companyName, location, jobTitle, salary, icon, jobTimings }) => {
  return (
    <div className="w-full max-w-5xl lg:flex shadow-xl rounded-xl overflow-hidden border border-gray-300 bg-white p-8 my-6 transition-transform transform hover:scale-105 mx-auto">
      <div className="flex flex-col justify-between leading-normal w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="text-blue-900 font-bold mr-4 text-3xl">{companyName}</div>
          <div className="text-black text-3xl">{icon}</div>
        </div>
        <p className="text-gray-900 mb-6">{location}</p>
        <div className="mb-6">
          <h2 className="text-purple-900 font-semibold text-xl">{jobTitle}</h2>
        </div>
        <div className="flex flex-col items-start space-y-4">
          <span
            className={`px-6 py-3 rounded-full text-white text-base font-medium ${
              jobTimings === 'Full Time'
                ? 'bg-green-500'
                : jobTimings === 'Part Time'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          >
            {jobTimings}
          </span>
          <span className="px-6 py-3 rounded-full bg-teal-500 text-white text-base font-medium">
            {salary}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;