import React from "react";
import { MdOutlineDesignServices, MdOutlineWebhook, MdAccountBalance, MdOutlineAnimation } from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const Category = () => {
    const categories = [
        { id: 1, title: "Graphics & Design", icon: <MdOutlineDesignServices /> },
        { id: 2, title: "Mobile App Development", icon: <TbAppsFilled /> },
        { id: 3, title: "Frontend Web Development", icon: <MdOutlineWebhook /> },
        { id: 4, title: "MERN STACK Development", icon: <FaReact /> },
        { id: 5, title: "Account & Finance", icon: <MdAccountBalance /> },
        { id: 6, title: "Artificial Intelligence", icon: <GiArtificialIntelligence /> },
        { id: 7, title: "Video Animation", icon: <MdOutlineAnimation /> },
        { id: 8, title: "Game Development", icon: <IoGameController /> },
    ];

    return (
        <div className="categories text-center mt-12">
            <h3 className="text-3xl font-bold mb-6">POPULAR CATEGORIES</h3>
            <div className="banner flex justify-center gap-[2.5rem] flex-wrap">
                {categories.map((element) => {
                    return (
                        <div className="card bg-gradient-to-r from-blue-400 to-purple-400 text-black w-36 h-36 rounded-lg flex flex-col items-center justify-center shadow-lg" key={element.id}>
                            <div className="icon text-4xl mb-2">{element.icon}</div>
                            <div className="text text-sm font-medium">{element.title}</div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default Category;