import { FaFilter } from "react-icons/fa";

const InternshipFilterCard = () => {

  const filterData = [
    {
      filterType: "Location",
      array: ["New Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Jaipur", "Gurgaon", "Noida", "Ahmedabad"]
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Software Developer", "DevOps Engineer", "Data Scientist", "AI/ML Engineer"]
    },
    {
      filterType: "Salary",
      array: ["0-2,000 /month", "2,000-5,000 /month", "5,000-10,000 /month", "10,000-20,000 /month", "20,000-40,000 /month", "40,000 /month+"]
    },
    {
      filterType: "Date Posted",
      array: ["Past 24 hours", "Past week", "Past month", "Anytime"]
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-semibold text-gray-800'>Filter Internships</h1>
        <FaFilter className='h-6 w-6 text-blue-600' />
      </div>
      <hr className='mb-4' />
      <div>
        {
          filterData.map((item, index) => (
            <div key={index} className="mb-4">
              <h2 className='text-lg font-medium text-gray-700 mb-2'>{item.filterType}</h2>
              <div className="flex flex-col gap-2">
                {
                  item.array.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input type="checkbox" name={item.filterType} className="mr-2" />
                      <label className="text-gray-600">{option}</label>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default InternshipFilterCard
