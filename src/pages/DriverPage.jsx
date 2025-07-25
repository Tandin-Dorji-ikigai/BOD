import React, { useState, useEffect } from "react";
import { FaUser, FaFilter, FaDownload } from "react-icons/fa";
import axios from "axios";
import AddDriver from "../components/AddDriver";

export default function DriverPage() {
    const [showDriverForm, setShowDriverForm] = useState(false);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/driver");
            setDrivers(res.data);
        } catch (err) {
            console.error("Error fetching drivers:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    return (
        <div className="relative px-6 py-6 bg-gray-50 min-h-screen">
            {/* Modal overlay */}
            {showDriverForm && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm" />}

            {/* AddDriver modal */}
            {showDriverForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
                        <button
                            onClick={() => setShowDriverForm(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
                        >
                            ×
                        </button>
                        <AddDriver onSuccess={() => { setShowDriverForm(false); fetchDrivers(); }} />
                    </div>
                </div>
            )}

            <div className={showDriverForm ? "blur-sm pointer-events-none select-none" : ""}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Driver Management</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => setShowDriverForm(true)}
                    >
                        + Add Driver
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search drivers..."
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
                                    <th className="px-4 py-3">Driver</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Assigned Vehicle</th>
                                    <th className="px-4 py-3">Created</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">Loading...</td>
                                    </tr>
                                ) : drivers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">No drivers found.</td>
                                    </tr>
                                ) : (
                                    drivers.map((driver) => (
                                        <tr key={driver._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <FaUser className="text-gray-600" />
                                                    </div>
                                                    <div className="font-medium">{driver.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">{driver.email}</td>
                                            <td className="px-4 py-3 text-gray-800">
                                                {driver.vehicle
                                                    ? `${driver.vehicle.vehicleNumber} (${driver.vehicle.fuelBookType})`
                                                    : "—"}
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">
                                                {new Date(driver.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                                <button className="text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
                        <span>Showing {drivers.length} results</span>
                        <div className="flex items-center space-x-1">
                            <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">&lt;</button>
                            <button className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white">1</button>
                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">2</button>
                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">3</button>
                            <span className="px-2">...</span>
                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">15</button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
