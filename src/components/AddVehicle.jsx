import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function AddVehicle({ onSuccess }) {
    const [form, setForm] = useState({
        companyId: "",
        vehicleNumber: "",
        fuelBookType: "Individual",
        fueltype: "", // ✅ added fueltype to state
    });

    const [companies, setCompanies] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/company")
            .then(res => setCompanies(res.data))
            .catch(() => setMessage("Failed to load companies"));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        try {
            await axios.post("http://localhost:5000/api/vehicle/register", form);
            setMessage("Vehicle added successfully");
            if (onSuccess) onSuccess();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error adding vehicle");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {message && <p className="text-red-500 text-sm">{message}</p>}

            {/* Company Select */}
            <div>
                <label className="block font-medium mb-1">Company</label>
                <select
                    name="companyId"
                    value={form.companyId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select company</option>
                    {companies.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* Vehicle Number Input */}
            <div>
                <label className="block font-medium mb-1">Vehicle Number</label>
                <input
                    type="text"
                    name="vehicleNumber"
                    value={form.vehicleNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Fuel Book Type Select */}
            <div>
                <label className="block font-medium mb-1">Fuel Book Type</label>
                <select
                    name="fuelBookType"
                    value={form.fuelBookType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Individual">Individual</option>
                    <option value="Shared">Shared</option>
                </select>
            </div>

            {/* Fuel Type Select */}
            <div>
                <label className="block font-medium mb-1">Fuel Type</label>
                <select
                    name="fueltype"
                    value={form.fueltype}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select fuel type</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="EV">EV</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
}
