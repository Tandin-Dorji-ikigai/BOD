import React, { useState } from "react";
import { FaCar, FaFilter, FaDownload } from "react-icons/fa";
import AddVehicle from "../components/AddVehicle";

export default function VehiclePage() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="relative px-6 py-6 bg-gray-50 min-h-screen">
            {showForm && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm" />}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
                        >
                            ×
                        </button>
                        <AddVehicle onSuccess={() => setShowForm(false)} />
                    </div>
                </div>
            )}

            <div className={showForm ? "blur-sm pointer-events-none select-none" : ""}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Vehicle Management</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => setShowForm(true)}
                    >
                        + Add Vehicle
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left border-t">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Registration</th>
                                <th className="px-4 py-3">Make & Model</th>
                                <th className="px-4 py-3">Company</th>
                                <th className="px-4 py-3">Fuel Type</th>
                                <th className="px-4 py-3">FuelBook</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-800">KBA 123A</td>
                                <td className="px-4 py-3 text-gray-800">
                                    Toyota Hilux<br /><span className="text-xs text-gray-500">2020</span>
                                </td>
                                <td className="px-4 py-3 text-gray-800">Acme Corporation</td>
                                <td className="px-4 py-3 text-gray-800">Diesel</td>
                                <td className="px-4 py-3 text-gray-800">Individual</td>
                                <td className="px-4 py-3">
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-800">KCA 456B</td>
                                <td className="px-4 py-3 text-gray-800">
                                    Nissan Navara<br /><span className="text-xs text-gray-500">2019</span>
                                </td>
                                <td className="px-4 py-3 text-gray-800">Beta Solutions</td>
                                <td className="px-4 py-3 text-gray-800">Diesel</td>
                                <td className="px-4 py-3 text-gray-800">Shared</td>
                                <td className="px-4 py-3">
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
                    <span>Showing 1 to 2 of 156 results</span>
                    <div className="flex items-center space-x-1">
                        <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">&lt;</button>
                        <button className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">2</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">3</button>
                        <span className="px-2">...</span>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">16</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
