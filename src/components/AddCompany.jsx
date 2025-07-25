// File: src/components/AddCompany.jsx
import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function AddCompany({ onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        contactName: "",
        contactEmail: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: formData.name,
                contactPerson: {
                    name: formData.contactName,
                    email: formData.contactEmail
                }
            };

            const res = await axios.post("http://localhost:5000/api/company/register", payload);
            setMessage("Company registered successfully");

            setFormData({ name: "", contactName: "", contactEmail: "" });

            if (onSuccess) onSuccess();

        } catch (err) {
            setMessage(err.response?.data?.message || "Failed to register company");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {message && <p className="text-sm text-red-500">{message}</p>}

            <div>
                <label className="block mb-1 font-medium">Company Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Contact Person Name</label>
                <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block mb-1 font-medium">Contact Email</label>
                <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
}
