import { useState } from 'react';
import { Sidebar } from '../../components/index';
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import axios from 'axios';

const PostOpportunity = () => {
  const { url } = useContextProvider();

  const [type, setType] = useState("job");
  const [data, setData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
    category: "",
    position: "",
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
        company: data.company,
        category: data.category,
        position: data.position,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Opportunity posted successfully!');
        setData({
          title: "",
          description: "",
          location: "",
          salary: "",
          company: "",
          category: "",
          position: "",
        });
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
                required
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
                placeholder='Enter salary'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='company'>
                Company Name
              </label>
              <input
                type='text'
                name='company'
                id='company'
                className='w-full p-2 border border-gray-300 rounded'
                value={data.company}
                onChange={handleChange}
                placeholder='Enter company name'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
              Category
            </label>
            <input
              type='text'
              name='category'
              id='category'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.category}
              onChange={handleChange}
              placeholder='Enter category'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='position'>
              Position
            </label>
            <input
              type='text'
              name='position'
              id='position'
              className='w-full p-2 border border-gray-300 rounded'
              value={data.position}
              onChange={handleChange}
              placeholder='Enter position'
              required
            />
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
