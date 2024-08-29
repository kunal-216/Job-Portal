import { FaLinkedin, FaInstagramSquare, FaFacebook, FaTwitterSquare } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-2/3 mb-8 ml-[-30px] md:mb-0">
            <form className="bg-white p-8 shadow-md rounded-lg">
              <h4 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h4>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Subject"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="6"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="w-full md:w-1/3 bg-[#d0e0f2] p-8 shadow-md rounded-lg">
            <p className="text-gray-600 mb-4">
              Our team is available Monday through Friday, 9 AM to 6 PM IST, to assist you with your needs. Feel free to contact us during our business hours.
            </p>
            <p className="text-gray-600 mb-2"><strong>Address:</strong> 1234 Job Bridge Avenue, Job City, 56789</p>
            <p className="text-gray-600 mb-2"><strong>Phone:</strong> +91 123-456-7890</p>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> support@talentbridge.com</p>
            <p className="text-gray-600 mb-4">
              You can also follow us on social media to stay updated with the latest job postings and career tips:
            </p>
            <div className="flex space-x-4 mx-28">
              <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600"><FaFacebook className='h-6 w-6 mx-2'/></a>
              <a href="https://twitter.com" className="text-gray-600 hover:text-blue-600"><FaTwitterSquare className='h-6 w-6 mx-2' /></a>
              <a href="https://linkedin.com" className="text-gray-600 hover:text-blue-600"><FaLinkedin className='h-6 w-6 mx-2' /></a>
              <a href="https://instagram.com" className="text-gray-600 hover:text-blue-600"><FaInstagramSquare className='h-6 w-6 mx-2' /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
