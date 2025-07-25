// File: src/pages/DashboardPage.jsx
import React from "react";
import { FaBuilding, FaUsers, FaExclamationTriangle } from "react-icons/fa";
import { MdDirectionsCar } from "react-icons/md";

export default function DashboardPage() {
    return (
        <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Company Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                    + Add Users
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow rounded-lg p-6 flex items-center">
                    <div className="p-3 bg-blue-500 bg-opacity-20 text-blue-500 rounded-full">
                        <FaBuilding size={24} />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-600 text-sm font-medium">Companies</p>
                        <p className="text-2xl font-semibold text-gray-900">24</p>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 flex items-center">
                    <div className="p-3 bg-green-500 bg-opacity-20 text-green-500 rounded-full">
                        <MdDirectionsCar size={24} />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-600 text-sm font-medium">Vehicles</p>
                        <p className="text-2xl font-semibold text-gray-900">156</p>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 flex items-center">
                    <div className="p-3 bg-yellow-500 bg-opacity-20 text-yellow-500 rounded-full">
                        <FaUsers size={24} />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-600 text-sm font-medium">Drivers</p>
                        <p className="text-2xl font-semibold text-gray-900">142</p>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6 flex items-center">
                    <div className="p-3 bg-red-500 bg-opacity-20 text-red-500 rounded-full">
                        <FaExclamationTriangle size={24} />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-600 text-sm font-medium">Low Fuel Alerts</p>
                        <p className="text-2xl font-semibold text-gray-900">8</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 -px-6 -py-4">
                {/* Recent Transactions */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h3>
                    <table className="min-w-full text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="text-left py-2">Vehicle</th>
                                <th className="text-left py-2">Liters</th>
                                <th className="text-left py-2">Amount</th>
                                <th className="text-left py-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 text-gray-900 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-500 p-2 rounded-full"><MdDirectionsCar /></span>
                                    KBA 123A<br /><span className="text-gray-400 text-xs">Toyota Hilux</span>
                                </td>
                                <td className="py-2">45.2</td>
                                <td className="py-2">Ksh 6,780</td>
                                <td className="py-2">2 hours ago</td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-900 flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-500 p-2 rounded-full"><MdDirectionsCar /></span>
                                    KCA 456B<br /><span className="text-gray-400 text-xs">Nissan Navara</span>
                                </td>
                                <td className="py-2">38.7</td>
                                <td className="py-2">Ksh 5,805</td>
                                <td className="py-2">5 hours ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Low Fuel Alerts */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Low Fuel Alerts</h3>
                    <table className="min-w-full text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="text-left py-2">Vehicle</th>
                                <th className="text-left py-2">Balance (L)</th>
                                <th className="text-left py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 text-gray-900 flex items-center gap-2">
                                    <span className="bg-red-100 text-red-500 p-2 rounded-full"><MdDirectionsCar /></span>
                                    KBA 789C<br /><span className="text-gray-400 text-xs">Isuzu D-Max</span>
                                </td>
                                <td className="py-2">5.2</td>
                                <td className="py-2">
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Critical</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 text-gray-900 flex items-center gap-2">
                                    <span className="bg-yellow-100 text-yellow-600 p-2 rounded-full"><MdDirectionsCar /></span>
                                    KCB 101D<br /><span className="text-gray-400 text-xs">Mitsubishi L200</span>
                                </td>
                                <td className="py-2">10.5</td>
                                <td className="py-2">
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Warning</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
