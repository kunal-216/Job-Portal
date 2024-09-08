import { JobFilterCard, Job } from "../../components/index"
import { useContextProvider } from "../../context/StoreContext"

const Jobs = () => {
  const { jobData } = useContextProvider();
  const jobs = jobData || [];

  return (
    <div className='max-w-[100rem] mx-20 my-20'>
      <h1 className='inline-block my-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500'>Browse Jobs</h1>
      <div className='flex gap-5'>
        <div className='w-[18%]'>
          <JobFilterCard />
        </div>
        {jobs.length === 0 ? (
          <p className='text-2xl text-gray-700 flex flex-row mx-auto'>No Jobs found</p>
        ) : (
          <div className='w-[80%] pb-5'>
            <div className='grid grid-cols-3 gap-4'>
              {jobs.map((item) => (
                <Job
                  key={item._id} opportunityId={item._id} company={item.company} applyBy={item.applyBy}
                  companyLogo={item.companyLogo} createdAt={item.createdAt} numberOfOpenings={item.numberOfOpenings} 
                  experience={item.experience} jobType={item.jobType} description={item.description} about={item.about}
                  location={item.location} salary={item.salary} title={item.title} skills={item.skills}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs
