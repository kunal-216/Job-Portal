import { InternshipFilterCard, Internship } from "../../components/index"
import { useContextProvider } from "../../context/StoreContext"

const Internships = () => {

  const { internshipData } = useContextProvider();
  const internships = internshipData || [];

  return (
    <div className='max-w-[100rem] mx-20 my-10'>
      <h1 className='inline-block my-4 text-[2.6rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>Browse Internships</h1>
      <div className='flex gap-5'>
        <div className='w-[18%]'>
          <InternshipFilterCard />
        </div>
        {internships.length === 0 ? (
          <p className='text-2xl text-gray-700 flex flex-row mx-auto'>No Internships found</p>
        ) : (
          <div className='w-[80%] pb-5'>
            <div className='grid grid-cols-3 gap-4'>
              {internships.map((item) => (
                <Internship key={item._id} opportunityId={item._id} internship={item} skills={item.skills}
                  applyBy={item.applyBy} numberOfOpenings={item.numberOfOpenings} 
                  company={item.company} internshipType={item.internshipType} about={item.about}
                  companyLogo={item.companyLogo} createdAt={item.createdAt} description={item.description}
                  location={item.location} stipend={item.stipend} title={item.title} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Internships
