import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddDriver({ onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        vehicle: ""
    });

    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/vehicle");
                setVehicles(res.data);
            } catch (err) {
                console.error("Error fetching vehicles:", err);
            }
        };
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:5000/api/driver/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                vehicleId: formData.vehicle, // ✅ explicitly send as vehicleId
            });

            onSuccess(); // close modal
        } catch (err) {
            console.error("Error adding driver:", err);
            setError(err.response?.data?.message || "Failed to add driver");
        } finally {
            setLoading(false);
        }
    };

    console.log(vehicles)

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Driver</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Vehicle</label>
                    <select
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select Vehicle</option>
                        {vehicles.map((v) => (
                            <option key={v._id} value={v._id}>
                                {v.vehicleNumber}
                                {console.log(v._id)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Saving..." : "Add Driver"}
                    </button>
                </div>
            </form>
        </div>
    );
}
