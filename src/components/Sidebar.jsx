// File: src/components/Sidebar.jsx
import React, { useState } from "react";
import {
    FaTachometerAlt,
    FaBuilding,
    FaCar,
    FaUsers,
    FaGasPump,
    FaExchangeAlt,
    FaExclamationTriangle,
    FaChevronLeft,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar({ onNavClick }) {
    const [activePage, setActivePage] = useState("dashboard");

    const handleClick = (page) => {
        setActivePage(page);
        onNavClick(page);
    };

    const getButtonClass = (page) =>
        `flex items-center w-full py-2 px-2 rounded-md hover:bg-gray-700 ${activePage === page ? 'bg-gray-700 text-white' : 'text-gray-300'
        }`;

    return (
        <div className="w-64 bg-gray-800 text-white flex-shrink-0 h-full flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center">
                    <FaGasPump className="text-blue-400 text-xl mr-2" />
                    <span className="font-bold text-lg">FuelBook Admin</span>
                </div>
                <button className="text-gray-400 hover:text-white focus:outline-none">
                    <FaChevronLeft />
                </button>
            </div>

            <div className="p-4">
                <div className="mb-6">
                    <div className="flex items-center mb-1">
                        <FaUserCircle className="text-gray-400 mr-2" />
                        <span className="text-gray-300 font-medium">Admin User</span>
                    </div>
                    <div className="text-xs text-gray-400">admin@fuelbook.com</div>
                </div>

                <div className="mb-4">
                    <h3 className="text-xs uppercase text-gray-500 font-bold mb-2">Management</h3>
                    <ul className="space-y-1">
                        <li>
                            <button onClick={() => handleClick("dashboard")} className={getButtonClass("dashboard")}>
                                <FaTachometerAlt className="mr-2" /> Dashboard
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleClick("companies")} className={getButtonClass("companies")}>
                                <FaBuilding className="mr-2" /> Company Management
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleClick("vehicles")} className={getButtonClass("vehicles")}>
                                <FaCar className="mr-2" /> Vehicle Management
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleClick("drivers")} className={getButtonClass("drivers")}>
                                <FaUsers className="mr-2" /> Driver Management
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="text-xs uppercase text-gray-500 font-bold mb-2">Fuel Monitoring</h3>
                    <ul className="space-y-1">
                        <li>
                            <button onClick={() => handleClick("fuel-balance")} className={getButtonClass("fuel-balance")}>
                                <FaGasPump className="mr-2" /> Fuel Book
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleClick("transactions")} className={getButtonClass("transactions")}>
                                <FaExchangeAlt className="mr-2" /> Transactions
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleClick("threshold-alerts")} className={getButtonClass("threshold-alerts")}>
                                <FaExclamationTriangle className="mr-2" /> Threshold Alerts
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-auto p-4 border-t border-gray-700">
                <button className="flex items-center text-gray-300 hover:text-white">
                    <FaSignOutAlt className="mr-2" /> Logout
                </button>
            </div>
        </div>
    );
}
