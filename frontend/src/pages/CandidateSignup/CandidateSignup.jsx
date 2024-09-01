import { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/StoreContext";
import { toast } from "react-toastify";

const CandidateSignup = () => {
    const { url, setUserDesignation } = useContextProvider();
    const navigate = useNavigate();

    const [img, setImg] = useState(null);
    const [resume, setResume] = useState(null);
    const [data, setData] = useState({
        bio: "",
        gender: "",
        university: "",
        age: "",
        skills: [],
    });
    const [newSkill, setNewSkill] = useState("");

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const changeFileHandler = (e) => {
        const { name, files } = e.target;
        if (name === "file") {
            setImg(files[0]);
        } else if (name === "resume") {
            setResume(files[0]);
        }
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

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("bio", data.bio);
        formData.append("gender", data.gender);
        formData.append("university", data.university);
        formData.append("age", data.age);
        formData.append("skills", JSON.stringify(data.skills));
        formData.append("image", img);
        formData.append("resume", resume);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${url}/api/user/candidate-register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setData({
                    bio: "",
                    gender: "",
                    university: "",
                    age: "",
                });
                setNewSkill("");
                toast.success("Candidate Registered Successfully");
                navigate("/");
                setUserDesignation("Candidate");
                setImg(null);
                setResume(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while registering");
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg my-16">
            <form onSubmit={onSubmitHandler} className="space-y-4">
                <div className="text-center">
                    <h1 className="text-3xl text-center text-blue-500 font-bold">Candidate Profile Completion</h1>
                </div>
                <div className="flex gap-4 mb-4">
                    <div className="flex-1 flex flex-col items-center">
                        <p className="mb-2 text-lg font-medium">Upload User Image</p>
                        <label htmlFor="userImage" className="cursor-pointer">
                            <img
                                src={img ? URL.createObjectURL(img) : assets.upload_area}
                                alt="Upload"
                                className="w-36 h-24 object-cover border border-gray-300 rounded-md"
                            />
                        </label>
                        <input
                            onChange={(e) => setImg(e.target.files[0])}
                            type="file"
                            id="userImage"
                            hidden
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <p className="mb-2 text-lg font-medium">Upload Resume</p>
                        <label htmlFor="resume" className="cursor-pointer">
                            <img
                                src={resume ? URL.createObjectURL(resume) : assets.upload_area}
                                alt="Upload"
                                className="w-36 h-24 object-cover border border-gray-300 rounded-md"
                            />
                        </label>
                        <input
                            onChange={changeFileHandler}
                            type="file"
                            id="resume"
                            name="resume"
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
                        type="number"
                        name="age"
                        value={data.age}
                        placeholder="Enter your age"
                        onChange={onChangeHandler}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="university"
                        value={data.university}
                        placeholder="Enter the name of your university"
                        onChange={onChangeHandler}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                        rows="6"
                        name="bio"
                        placeholder="Enter your Bio"
                        onChange={onChangeHandler}
                        value={data.bio}
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600 ml-1">Skills</p>
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
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
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

export default CandidateSignup;
