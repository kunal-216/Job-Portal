import Cards from '../Cards/Cards'
import { SiTcs, SiRelianceindustrieslimited, SiInfosys, SiHcl, SiAirtel } from "react-icons/si"
import { Link } from "react-router-dom"

const LatestInternships = () => {

    const internships = [
        {
            id: 1,
            companyName: "TCS",
            location: "New Delhi, India",
            internshipTitle: "App Developer",
            stipend: "₹25,000 /month",
            internshipTimings: "Part Time",
            icon: <SiTcs />,
        },
        {
            id: 2,
            companyName: "Reliance",
            location: "Work from Home",
            internshipTitle: "Frontend Developer",
            stipend: "₹55,000 /month",
            internshipTimings: "Work from Home",
            icon: <SiRelianceindustrieslimited />,
        },
        {
            id: 3,
            companyName: "Airtel",
            location: "Hyderabad, India",
            internshipTitle: "Data Science",
            stipend: "₹65,000 /month",
            internshipTimings: "Full Time",
            icon: <SiAirtel />,
        },
        {
            id: 4,
            companyName: "HCL",
            location: "Jaipur, India",
            internshipTitle: "DevOps Engineer",
            stipend: "₹15,000 /month",
            internshipTimings: "Part Time",
            icon: <SiHcl />,
        },
        {
            id: 5,
            companyName: "Infosys",
            location: "Work from Home",
            internshipTitle: "Full Stack Developer",
            stipend: "₹40,000 /month",
            internshipTimings: "Work from Home",
            icon: <SiInfosys />,
        },
    ];

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold text-center my-8'><span className='text-[#3B82F6]'>Latest & Top</span> Internship Openings</h1>
            <div className='grid grid-cols-5 gap-3'>
                {
                    internships.slice(0, 5).map((item, index) => (
                        <Cards key={index} companyName={item.companyName} location={item.location} jobTitle={item.internshipTitle} salary={item.stipend} icon={item.icon} jobTimings={item.internshipTimings} />
                    ))
                }
            </div>
            <div className='flex justify-center'>
                <Link to="/internships" className="inline bg-purple-900 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-purple-600 transition-colors">
                    Browse More Like These <span className="ml-2">→</span>
                </Link>
            </div>
        </div>
    )
}

export default LatestInternships
