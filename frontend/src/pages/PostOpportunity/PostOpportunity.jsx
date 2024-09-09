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
  const [type, setType] = useState('Job'); // Default to 'Job' or 'Internship'
  const [newSkill, setNewSkill] = useState("");
  // opportunityType means part time, full time, WFH
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    category: "",
    workMode: "",
    experience: "",
    applyBy: "",
    skills: [],
    numberOfOpenings: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill) {
      setData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, newSkill],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}/api/opportunity/post-${type}`, {
        ...data,
        type,
        recruiterId: recruiterProfileData._id,
        skills: JSON.stringify(data.skills)
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
          applyBy: "",
          skills: [],
          numberOfOpenings: "",
        });
        setType('Job');
        navigate("/");
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
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value='Job'>Job</option>
              <option value='Internship'>Internship</option>
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
                type='number'
                name='salary'
                id='salary'
                className='w-full p-2 border border-gray-300 rounded'
                value={data.salary}
                onChange={handleChange}
                placeholder='(in Lpa for jobs and k per month for internships)'
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
              onChange={handleChange}
            >
              <option value="" disabled>Select Category</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Banking and Finance">Banking and Finance</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Consulting">Consulting</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Full Stack Web Development">Full Stack Web Development</option>
              <option value="Frontend Development">Frontend Development</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Product Management">Product Management</option>
              <option value="Project Management">Project Management</option>
              <option value="Sales">Sales</option>
              <option value="Software Development">Software Development</option>
              <option value="Web Development">Web Development</option>

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
          <div className='mb-2'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
              Job Description
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
          <div className='mb-3'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='applyBy'>
              Apply By
            </label>
            <input
              type='date'
              name='applyBy'
              id='applyBy'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.applyBy}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='numberOfOpenings'>
              Number of Openings
            </label>
            <input
              type='number'
              name='numberOfOpenings'
              id='numberOfOpenings'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.numberOfOpenings}
              onChange={handleChange}
              placeholder='10'
              required
            />
          </div>
          <div className="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='skills'>
              Skills Required
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter your skills"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                Add
              </button>
            </div>
            <ul className="list-disc pl-5">
              {data.skills.map((skill, index) => (
                <li key={index} className="flex justify-between items-center mb-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
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
