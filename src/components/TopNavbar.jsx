// File: src/components/TopNavbar.jsx
import React from "react";
import { FaBell, FaUser } from "react-icons/fa";

export default function TopNavbar({ title, admin }) {
    return (
        <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-700">
                    <FaBell size={18} />
                </button>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <FaUser size={16} />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{admin?.name || "Loading..."}</span>
                </div>
            </div>
        </div>
    );
}
