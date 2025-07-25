import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ include cookies on requests

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");

    const login = async () => {
        if (!email || !password || !role) {
            setMessage("All fields are required");
            return;
        }

        try {
            const endpoint = `http://localhost:5000/api/${role}/login`; // e.g., /api/admins/login
            const res = await axios.post(endpoint, { email, password });

            setMessage("Login successful");

            // ✅ Redirect based on role
            if (role === "admin") {
                window.location.href = "/admin";
            } else if (role === "driver") {
                window.location.href = "/driver";
            } else if (role === "attendant") {
                window.location.href = "/fuelAttendent";
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Digital Fuel Book Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <select
                    className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="driver">Driver</option>
                    <option value="attendant">Fuel Attendant</option>
                </select>
                <button
                    onClick={login}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
}
