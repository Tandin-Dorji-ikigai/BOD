import React, { useState, useEffect } from "react";
import AddFuelbook from "../components/AddFuelbook";
import axios from "axios";
import { FaGasPump, FaCar, FaExclamationTriangle, FaFilter, FaDownload } from "react-icons/fa";

export default function FuelBalancePage() {
    const [showModal, setShowModal] = useState(false);
    const [fuelBooks, setFuelBooks] = useState([]);

    useEffect(() => {
        fetchFuelBooks();

    }, []);

    const fetchFuelBooks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/fuelbook");
            setFuelBooks(res.data);
        } catch (err) {
            console.error("Failed to fetch fuel books:", err);
        }
    };
    console.log(fuelBooks)


    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const diff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        if (diff === 0) return "Today";
        if (diff === 1) return "1 day ago";
        return `${diff} days ago`;
    };

    const getStatus = (balance, threshold) => {
        if (balance <= threshold) return ["Critical", "bg-red-100 text-red-800"];
        return ["Normal", "bg-green-100 text-green-800"];
    };

    return (
        <div className="px-6 py-6 bg-gray-50 min-h-screen relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Fuel Book Monitoring</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                >
                    + CreateFuelBook
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* You can replace static numbers with actual totals from fuelBooks */}
                <div className="bg-white shadow rounded-lg p-6 flex items-center">
                    <div className="p-3 bg-blue-500 text-white rounded-md">
                        <FaGasPump size={24} />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-600 text-sm font-medium">Total Fuel Balance</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {fuelBooks.reduce((sum, fb) => sum + fb.currentBalance, 0).toFixed(2)} L
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6 flex items-center">
                    <div className="p-3 bg-green-500 text-white rounded-md">
                        <FaCar size={24} />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-600 text-sm font-medium">Vehicles with Fuel</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {fuelBooks.filter(f => f.type === "Individual").length}
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6 flex items-center">
                    <div className="p-3 bg-red-500 text-white rounded-md">
                        <FaExclamationTriangle size={24} />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-600 text-sm font-medium">Low Fuel Alerts</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            {fuelBooks.filter(f => f.currentBalance <= f.thresholdLimit).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search vehicles..."
                        className="w-full md:w-1/3 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                        <button className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2">
                            <FaFilter />
                        </button>
                        <button className="bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 flex items-center gap-2">
                            <FaDownload />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left border-t">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Vehicle</th>
                                <th className="px-4 py-3">Company</th>
                                <th className="px-4 py-3">Fuel Book Type</th>
                                <th className="px-4 py-3">Fuel Balance (L)</th>
                                <th className="px-4 py-3">Last Updated</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {fuelBooks.map((fb) => {
                                const [statusText, statusStyle] = getStatus(fb.currentBalance, fb.thresholdLimit);
                                return (
                                    <tr key={fb._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FaCar className="text-blue-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {fb.vehicle?.vehicleNumber || "NONE"}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {fb.vehicle?.company?.name || "None"}
                                                    </div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{fb.company?.name || "NONE"}</td>
                                        <td className="px-4 py-3">{fb.type}</td>
                                        <td className="px-4 py-3">{fb.currentBalance.toFixed(2)}</td>
                                        <td className="px-4 py-3">{formatDate(fb.updatedAt)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs px-2 py-1 rounded ${statusStyle}`}>
                                                {statusText}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && <AddFuelbook onClose={() => { setShowModal(false); fetchFuelBooks(); }} />}
        </div>
    );
}
