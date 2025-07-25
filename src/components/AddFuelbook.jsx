import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function AddFuelbook({ onClose }) {
    const [type, setType] = useState("Individual");
    const [companyId, setCompanyId] = useState("");
    const [vehicleId, setVehicleId] = useState("");
    const [currentBalance, setCurrentBalance] = useState(0);
    const [thresholdLimit, setThresholdLimit] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [companyRes, vehicleRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/company"),
                    axios.get("http://localhost:5000/api/vehicle")
                ]);
                setCompanies(companyRes.data);
                setVehicles(vehicleRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setMessage("Failed to load company or vehicle data.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            type,
            currentBalance,
            thresholdLimit,
            company: type === "Shared" ? companyId : undefined,
            vehicle: type === "Individual" ? vehicleId : undefined,
        };

        try {
            await axios.post("http://localhost:5000/api/fuelbook", payload);
            setMessage("Fuel book created successfully.");
            setTimeout(() => {
                setMessage("");
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Error creating fuel book:", error);
            setMessage(error.response?.data?.message || "Failed to create fuel book.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Create Fuel Book</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>

                {message && (
                    <p className={`text-sm mb-2 ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fuel Book Type</label>
                        <select
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="Individual">Individual</option>
                            <option value="Shared">Shared</option>
                        </select>
                    </div>

                    {type === "Shared" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <select
                                className="w-full border rounded px-3 py-2 mt-1"
                                value={companyId}
                                onChange={(e) => setCompanyId(e.target.value)}
                                required
                            >
                                <option value="">Select Company</option>
                                {companies.map((company) => (
                                    <option key={company._id} value={company._id}>{company.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {type === "Individual" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vehicle</label>
                            <select
                                className="w-full border rounded px-3 py-2 mt-1"
                                value={vehicleId}
                                onChange={(e) => setVehicleId(e.target.value)}
                                required
                            >
                                <option value="">Select Vehicle</option>
                                {vehicles.map((vehicle) => (
                                    <option key={vehicle._id} value={vehicle._id}>
                                        {vehicle.name || `${vehicle.vehicleNumber}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Balance (L)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={currentBalance}
                            onChange={(e) => setCurrentBalance(Number(e.target.value))}
                            min={0}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Threshold Limit (L)</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 mt-1"
                            value={thresholdLimit}
                            onChange={(e) => setThresholdLimit(Number(e.target.value))}
                            min={0}
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
