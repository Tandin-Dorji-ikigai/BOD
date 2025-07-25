// File: src/pages/ThresholdAlertsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCar, FaCog } from "react-icons/fa";

export default function ThresholdAlertsPage() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/threshold");
                setAlerts(res.data);
            } catch (err) {
                console.error("Failed to fetch alerts", err);
            }
        };
        fetchAlerts();
    }, []);

    return (
        <div className="px-6 py-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Threshold Alerts</h2>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 flex items-center gap-2 shadow-sm">
                    <FaCog /> Configure
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                {alerts.length === 0 ? (
                    <p className="text-gray-500">No threshold alerts at the moment.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border-t">
                            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3">Vehicle</th>
                                    <th className="px-4 py-3">Fuel Level</th>
                                    <th className="px-4 py-3">Threshold</th>
                                    <th className="px-4 py-3">Alert Type</th>
                                    <th className="px-4 py-3">Triggered At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {alerts.map(alert => (
                                    <tr key={alert._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                                    <FaCar className="text-red-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {alert.vehicle?.vehicleNumber || "N/A"}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {alert.vehicle?.vehicleModel || "—"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{alert.currentBalance} L</td>
                                        <td className="px-4 py-3">{alert.thresholdLimit} L</td>
                                        <td className="px-4 py-3">
                                            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                                                Critical
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-800">
                                            {new Date(alert.updatedAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
