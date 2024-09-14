import { Combobox } from '@headlessui/react';
import { FaFilter } from 'react-icons/fa';
import { useState } from 'react';

const JobFilterCard = ({ onFilterChange }) => {
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
            array: ["0-2 Lakh", "2-5 Lakh", "5-8 Lakh", "8-12 Lakh", "12-20 Lakh", "20 Lakh+"]
        },
        {
            filterType: "Date Posted",
            array: ["Past 24 hours", "Past week", "Past month", "Anytime"]
        },
    ];

    const [selectedFilters, setSelectedFilters] = useState({});

    const handleSelect = (filterType, option) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: option,
        }));

        onFilterChange(filterType, option);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 my-2">
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-xl font-semibold text-gray-800'>Filter Jobs</h1>
                <FaFilter className='h-6 w-6 text-blue-600' />
            </div>
            <hr className='mb-4' />

            <div className='space-y-4'>
                {filterData.map((filterItem, index) => (
                    <div key={index}>
                        <Combobox
                            value={selectedFilters[filterItem.filterType] || ""}
                            onChange={(value) => handleSelect(filterItem.filterType, value)}
                        >
                            <Combobox.Label className='text-lg font-medium text-gray-700'>{filterItem.filterType}</Combobox.Label>
                            <div className="relative">
                                <Combobox.Input
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder={`Select ${filterItem.filterType}`}
                                    onChange={(event) => handleSelect(filterItem.filterType, event.target.value)}
                                />
                                <Combobox.Options className="absolute mt-1 w-full bg-white border rounded-md shadow-md z-10">
                                    {filterItem.array.map((option, idx) => (
                                        <Combobox.Option
                                            key={idx}
                                            value={option}
                                            className="cursor-pointer p-2 hover:bg-gray-100"
                                        >
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

export default JobFilterCard;
