import { useState } from 'react';
import { Sidebar } from '../../components/index';
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostOpportunity = () => {
  const { url, recruiterProfileData } = useContextProvider();
  const navigate = useNavigate();

  // type means job or opportunity
  const [type, setType] = useState("job");
  // opportunityType means part time, full time, WFH
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    category: "",
    workMode: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/opportunity/post-${type}`, {
        title: data.title,
        description: data.description,
        location: data.location,
        salary: data.salary,
        category: data.category,
        experience: data.experience,
        recruiterId: recruiterProfileData._id,
        workMode: data.workMode,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      if (response.status === 201) {
        toast.success('Opportunity posted successfully!');
        setData({
          title: "",
          description: "",
          location: "",
          salary: "",
          category: "",
          workMode: "",
          experience: "",
        });
        navigate("/")
      }
    } catch (error) {
      toast.error('Failed to post opportunity. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100 mt-4 mb-6'>
        <form onSubmit={handleSubmit} className='w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg my-6 mx-auto'>
          <header className='bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6 text-center'>
            <h1 className='text-4xl font-extrabold'>Post Opportunity</h1>
          </header>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='type'>
              Type
            </label>
            <select
              name='type'
              id='type'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value='job'>Job</option>
              <option value='internship'>Internship</option>
            </select>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
                Title
              </label>
              <input
                type='text'
                name='title'
                id='title'
                className='w-full p-2 border border-gray-300 rounded'
                value={data.title}
                onChange={handleChange}
                placeholder='Enter title of the opportunity'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='location'>
                Location
              </label>
              <input
                type='text'
                name='location'
                id='location'
                className='w-full p-2 border border-gray-300 rounded'
                value={data.location}
                onChange={handleChange}
                placeholder='Enter location'
              />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='salary'>
                Salary
              </label>
              <input
                type='text'
                name='salary'
                id='salary'
                className='w-full p-2 border border-gray-300 rounded'
                value={data.salary}
                onChange={handleChange}
                placeholder='10,00,000-15,00,000'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='experience'>
                Experience Required
              </label>
              <input
                type='text'
                name='experience'
                id='experience'
                className='w-full p-2 border border-gray-300 rounded'
                value={data.experience}
                onChange={handleChange}
                placeholder='0-2 years'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
              Category
            </label>
            <select
              name='category'
              id='category'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.category}
              onChange={handleChange}>
              <option value="" disabled>Select Category</option>
              <option value='Android Development'>Android Development</option>
              <option value='Artificial Intelligence'>Artificial Intelligence</option>
              <option value='Backend Development'>Backend Development</option>
              <option value='Blockchain Developer'>Blockchain Developer</option>
              <option value='Data Analyst'>Data Analyst</option>
              <option value='Data Scientist'>Data Scientist</option>
              <option value='DevOps'>DevOps</option>
              <option value='Flutter Development'>Flutter Development</option>
              <option value='Frontend Development'>Frontend Development</option>
              <option value='Full Stack Development'>Full Stack Development</option>
              <option value='Game Development'>Game Development</option>
              <option value='Graphic Editing'>Graphic Editing</option>
              <option value='Machine Learning'>Machine Learning</option>
              <option value='Mobile App Development'>Mobile App Development</option>
              <option value='Sales Executive'>Sales Executive</option>
              <option value='SEO Optimisation'>SEO Optimisation</option>
              <option value='Software Development'>Software Development</option>
              <option value='Software Testing'>Software Testing</option>
              <option value='Ui/Ux Development'>Ui/Ux Development</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='workMode'>
              Work Mode
            </label>
            <select
              name='workMode'
              id='workMode'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.workMode}
              onChange={handleChange}
            >
              <option value="" disabled>Select mode of Work</option>
              <option value='Full Time'>Full Time</option>
              <option value='Part Time'>Part Time</option>
              <option value='Remote'>Remote</option>
              <option value='Hybrid'>Hybrid</option>
            </select>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.description}
              onChange={handleChange}
              placeholder='Enter description'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
          >
            Post Opportunity
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostOpportunity;
