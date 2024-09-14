import { Combobox } from '@headlessui/react';
import { FaFilter } from 'react-icons/fa';
import { useState } from 'react';

const InternshipFilterCard = ({ onFilterChange }) => {
  const filterData = [
    {
      filterType: 'Location',
      array: ['New Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Jaipur', 'Gurgaon', 'Noida', 'Ahmedabad'],
    },
    {
      filterType: 'Industry',
      array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer', 'Software Developer', 'DevOps Engineer', 'Data Scientist', 'AI/ML Engineer'],
    },
    {
      filterType: 'Stipend',
      array: ['0-2,000 /month', '2,000-5,000 /month', '5,000-10,000 /month', '10,000-20,000 /month', '20,000-40,000 /month', '40,000 /month+'],
    },
    {
      filterType: 'Date Posted',
      array: ['Past 24 hours', 'Past week', 'Past month', 'Anytime'],
    },
  ];

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleSelect = (filterType, option) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: option,
    }));
    onFilterChange(filterType, option);
  };

  return (
    <div className='flex flex-col p-4 bg-white rounded-lg shadow-md border border-gray-200 my-2'>
      <div className='flex flex-row justify-between items-center mb-4'>
        <h1 className='text-xl font-semibold text-gray-800'>Filter Internships</h1>
        <FaFilter className='h-6 w-6 text-blue-600' />
      </div>
      <hr className='mb-4' />
      <div>
        {filterData.map((filterItem, index) => (
          <div key={index} className='mb-4'>
            <Combobox value={selectedFilters[filterItem.filterType] || ''} onChange={(value) => handleSelect(filterItem.filterType, value)}>
              <Combobox.Label className='text-lg font-medium text-gray-700 mb-2'>{filterItem.filterType}</Combobox.Label>
              <div className='relative'>
                <Combobox.Input
                  className='w-full p-2 border border-gray-300 rounded-md'
                  placeholder={`Select ${filterItem.filterType}`}
                  onChange={(event) => handleSelect(filterItem.filterType, event.target.value)}
                />
                <Combobox.Options className='absolute mt-1 w-full bg-white border rounded-md shadow-md z-10'>
                  {filterItem.array.map((option, idx) => (
                    <Combobox.Option key={idx} value={option} className='cursor-pointer p-2 hover:bg-gray-100'>
                      {option}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipFilterCard;
