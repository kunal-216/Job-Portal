import { InternshipFilterCard, Internship } from '../../components';
import { useContextProvider } from '../../context/StoreContext';
import { useState } from 'react';

const Internships = () => {
  const { internshipData } = useContextProvider();
  const internships = internshipData || [];
  const [filteredInternships, setFilteredInternships] = useState(internships);
  const [activeFilter, setActiveFilter] = useState({});

  const handleFilterChange = (filterType, selectedOption) => {
    setActiveFilter((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedOption,
    }));

    const filtered = internships.filter((internship) => {
      const locationMatch = activeFilter.Location ? internship.location.includes(activeFilter.Location) : true;
      const industryMatch = activeFilter.Industry ? internship.title.includes(activeFilter.Industry) : true;
      const stipendMatch = activeFilter.Stipend ? internship.stipend.includes(activeFilter.Stipend) : true;

      return locationMatch && industryMatch && stipendMatch;
    });

    setFilteredInternships(filtered);
  };

  return (
    <div className='max-w-[100rem] xl:mx-20 px-4 my-10'>
      <h1 className='inline-block my-4 text-[2.6rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
        Browse Internships
      </h1>

      <div className='xl:hidden mb-5'>
        <InternshipFilterCard onFilterChange={handleFilterChange} />
      </div>

      <div className='flex flex-col xl:flex-row gap-5'>
        <div className='hidden xl:block w-[20%]'>
          <InternshipFilterCard onFilterChange={handleFilterChange} />
        </div>

        <div className='w-full xl:w-[80%] pb-5'>
          {filteredInternships.length === 0 ? (
            <p className='text-2xl text-gray-700 flex flex-row mx-auto justify-center'>No Internships found</p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredInternships.map((item) => (
                <Internship
                  key={item._id}
                  opportunityId={item._id}
                  internship={item}
                  skills={item.skills}
                  applyBy={item.applyBy}
                  numberOfOpenings={item.numberOfOpenings}
                  company={item.company}
                  internshipType={item.internshipType}
                  about={item.about}
                  companyLogo={item.companyLogo}
                  createdAt={item.createdAt}
                  description={item.description}
                  location={item.location}
                  stipend={item.stipend}
                  title={item.title}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Internships;
