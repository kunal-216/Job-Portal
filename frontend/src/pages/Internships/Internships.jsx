import { InternshipFilterCard, Internship } from "../../components/index"
import { useContextProvider } from "../../context/StoreContext"

const Internships = () => {

  const { internshipData } = useContextProvider();
  const internships = internshipData || [];

  return (
    <div className='max-w-[100rem] mx-20 my-20'>
      <h1 className='inline-block my-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>Browse Internships</h1>
      <div className='flex gap-5'>
        <div className='w-[18%]'>
          <InternshipFilterCard />
        </div>
        {internships.length === 0 ? (
          <span>No Internships found</span>
        ) : (
          <div className='w-[80%] pb-5'>
            <div className='grid grid-cols-3 gap-4'>
              {internships.map((item) => (
                <Internship key={item._id} internship={item} createdAt={item.createdAt}
                  company={item.company} internshipType={item.internshipType}
                  companyLogo={item.companyLogo} description={item.description} 
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
