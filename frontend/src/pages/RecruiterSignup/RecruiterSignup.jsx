import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const RecruiterSignup = () => {
    const { url, setUserDesignation } = useContextProvider();
    const navigate = useNavigate();

    // Separate state for user image and company logo
    const [userImage, setUserImage] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);
    const [data, setData] = useState({
        gender: "",
        companyName: "",
        location: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("gender", data.gender);
        formData.append("companyName", data.companyName);
        formData.append("location", data.location);
        formData.append("image", userImage);
        formData.append("companyLogo", companyLogo);

        try {
            const token = localStorage.getItem("token"); 
            const response = await axios.post(`${url}/api/user/recruiter-register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setData({
                    gender: "",
                    companyName: "",
                    location: "",
                });
                setUserImage(null);
                setCompanyLogo(null);
                toast.success("Recruiter Registered Successfully");
                setUserDesignation("Recruiter");
                navigate("/");
            }
        } catch (error) {
            toast.error("An error occurred during registration");
            console.log(error);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg my-16">
            <form onSubmit={onSubmitHandler} className="space-y-4">
                <div className="text-center">
                    <h1 className="text-3xl text-center text-blue-500 font-bold">Recruiter Profile Completion</h1>
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1 flex flex-col items-center">
                        <p className="mb-2 text-lg font-medium">Upload User Image</p>
                        <label htmlFor="userImage" className="cursor-pointer">
                            <img
                                src={userImage ? URL.createObjectURL(userImage) : assets.upload_area}
                                alt="Upload"
                                className="w-36 h-24 object-cover border border-gray-300 rounded-md"
                            />
                        </label>
                        <input
                            onChange={(e) => setUserImage(e.target.files[0])}
                            type="file"
                            id="userImage"
                            hidden
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <p className="mb-2 text-lg font-medium">Upload Company Logo</p>
                        <label htmlFor="companyLogo" className="cursor-pointer">
                            <img
                                src={companyLogo ? URL.createObjectURL(companyLogo) : assets.upload_area}
                                alt="Upload"
                                className="w-36 h-24 object-cover border border-gray-300 rounded-md"
                            />
                        </label>
                        <input
                            onChange={(e) => setCompanyLogo(e.target.files[0])}
                            type="file"
                            id="companyLogo"
                            hidden
                            required
                        />
                    </div>
                </div>
                <div>
                    <select
                        name="gender"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={onChangeHandler}
                        value={data.gender}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        name="companyName"
                        value={data.companyName}
                        placeholder="Enter your company name"
                        onChange={onChangeHandler}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="location"
                        value={data.location}
                        placeholder="Enter your location"
                        onChange={onChangeHandler}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-4 py-2 my-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Submit Details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecruiterSignup;
