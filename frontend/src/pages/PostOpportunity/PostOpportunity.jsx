import { useState } from 'react';
import { Sidebar } from '../../components/index';
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const PostOpportunity = () => {
  const { url } = useContextProvider();

  const [type, setType] = useState("job");
  const [logoImg, setLogoImg] = useState(null);
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

  const handleImageChange = (e) => {
    setLogoImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('salary', data.salary);
    formData.append('company', data.company);
    formData.append('category', data.category);
    formData.append('position', data.position);
    if (logoImg) {
      formData.append('logoImg', logoImg);
    }

    try {
      const response = await axios.post(`${url}/api/opportunity/post-${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
        setLogoImg(null);
      }
    } catch (error) {
      toast.error('Failed to post opportunity. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center min-h-screen bg-gray-100'>
        <form onSubmit={handleSubmit} className='w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg my-6 mx-auto'>
          <header className='bg-blue-600 text-white py-4 rounded-lg shadow-lg mb-6 text-center'>
            <h1 className='text-4xl font-extrabold'>Post Opportunity</h1>
          </header>
          <div className='mb-6 flex flex-col items-center'>
            <p className='mb-2 text-gray-700 text-md font-semibold'>Upload Company Logo</p>
            <label htmlFor="logoImg" className='cursor-pointer'>
              <img
                src={logoImg ? URL.createObjectURL(logoImg) : assets.upload_area}
                alt="Upload"
                className='w-[150px] h-auto'
              />
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              name='logoImg'
              id='logoImg'
              className='hidden'
              required
            />
          </div>
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
                type='number'
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
