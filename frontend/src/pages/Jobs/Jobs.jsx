import React from 'react'
import { JobFilterCard, Job } from "../../components/index"

const Jobs = () => {

  const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className='max-w-[100rem] mx-20 my-20'>
      <h1 className='inline-block my-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500'>Browse Jobs</h1>
      <div className='flex gap-5'>
        <div className='w-[18%]'>
          <JobFilterCard />
        </div>
        {jobArray.length <= 0 ? <span>No Jobs found</span> : (
          <div className='w-[80%] pb-5'>
            <div className='grid grid-cols-3 gap-4'>
              {
                jobArray.map((item) => (
                  <div key={item}>
                    <Job />
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs
