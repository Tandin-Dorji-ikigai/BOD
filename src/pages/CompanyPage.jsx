import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBuilding, FaFilter, FaDownload } from "react-icons/fa";
import AddCompany from "../components/AddCompany";

axios.defaults.withCredentials = true;

export default function CompanyPage() {
    const [showForm, setShowForm] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:5000/api/company");
            setCompanies(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching companies:", err);
            setLoading(false);
        }
    };

    return (
        <div className="relative px-6 py-6 bg-gray-50 min-h-screen">

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"></div>
            )}

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
                        >
                            ×
                        </button>
                        <AddCompany
                            onSuccess={() => {
                                setShowForm(false);
                                fetchCompanies(); // 🔁 Refresh list
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className={showForm ? "blur-sm pointer-events-none select-none" : ""}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Company Management</h2>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                        onClick={() => setShowForm(true)}
                    >
                        + Add Company
                    </button>
                </div>

        
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search companies..."
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

                    {loading ? (
                        <p className="text-center text-gray-500">Loading companies...</p>
                    ) : companies.length === 0 ? (
                        <p className="text-center text-gray-500">No companies found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left border-t">
                                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3">Company Name</th>
                                        <th className="px-4 py-3">Contact Person</th>
                                        <th className="px-4 py-3">Contact Email</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {companies.map((company) => (
                                        <tr key={company._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <FaBuilding className="text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{company.name}</div>
                                                        <div className="text-xs text-gray-500">
                                                            Created: {new Date(company.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">
                                                {company.contactPerson?.name || "—"}
                                            </td>
                                            <td className="px-4 py-3 text-gray-800">
                                                {company.contactPerson?.email || "—"}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                                <button className="text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
