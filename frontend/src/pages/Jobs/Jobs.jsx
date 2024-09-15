import { JobFilterCard, Job } from "../../components/index";
import { useContextProvider } from "../../context/StoreContext";
import { useState } from "react";

const Jobs = () => {
    const { jobData } = useContextProvider();
    const jobs = jobData || [];
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [activeFilter, setActiveFilter] = useState({});

    const handleFilterChange = (filterType, selectedOption) => {
        setActiveFilter(prevFilters => ({
            ...prevFilters,
            [filterType]: selectedOption
        }));

        const filtered = jobs.filter(job => {
            const locationMatch = !activeFilter.Location || job.location.includes(activeFilter.Location);
            const industryMatch = !activeFilter.Industry || job.title.includes(activeFilter.Industry);
            const salaryMatch = !activeFilter.Salary || job.salary.includes(activeFilter.Salary);

            return locationMatch && industryMatch && salaryMatch;
        });

        setFilteredJobs(filtered);
    };

    return (
        <div className="max-w-[100rem] xl:mx-13 md:mx-7 px-4 my-10">
            <h1 className="inline-block my-4 text-[2.6rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Browse Jobs
            </h1>

            <div className="xl:hidden mb-5">
                <JobFilterCard onFilterChange={handleFilterChange} />
            </div>

            <div className="flex flex-col xl:flex-row gap-5">
                <div className="hidden xl:block w-[20%]">
                    <JobFilterCard onFilterChange={handleFilterChange} />
                </div>

                <div className="w-full xl:w-[80%] pb-5">
                    {filteredJobs.length === 0 ? (
                        <p className="text-2xl text-gray-700 flex flex-row mx-auto justify-center">No Jobs found</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredJobs.map((item) => (
                                <Job
                                    key={item._id}
                                    opportunityId={item._id}
                                    company={item.company}
                                    applyBy={item.applyBy}
                                    companyLogo={item.companyLogo}
                                    createdAt={item.createdAt}
                                    numberOfOpenings={item.numberOfOpenings}
                                    experience={item.experience}
                                    jobType={item.jobType}
                                    description={item.description}
                                    about={item.about}
                                    location={item.location}
                                    salary={item.salary}
                                    title={item.title}
                                    skills={item.skills}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
