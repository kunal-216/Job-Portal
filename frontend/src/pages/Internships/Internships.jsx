import { InternshipFilterCard, Internship } from "../../components/index"

const Internships = () => {

  const InternshipArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className='max-w-[100rem] mx-20 my-20'>
      <h1 className='inline-block my-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>Browse Internships</h1>
      <div className='flex gap-5'>
        <div className='w-[18%]'>
          <InternshipFilterCard />
        </div>
        {InternshipArray.length <= 0 ? <span>No Internships found</span> : (
          <div className='w-[80%] pb-5'>
            <div className='grid grid-cols-3 gap-4'>
              {
                InternshipArray.map((item) => (
                  <div key={item}>
                    <Internship />
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

export default Internships
