// File: src/pages/TransactionsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/fuel-transactions");
                setTransactions(res.data);
            } catch (err) {
                console.error("Failed to fetch transactions", err);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Fuel Transactions</h2>
                <div className="space-x-2">
                    <button className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 shadow-sm">
                        ⚲ Filter
                    </button>
                    <button className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 shadow-sm">
                        ⭳ Export
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
                <table className="min-w-full text-sm text-left border-t">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">Date & Time</th>
                            <th className="px-4 py-3">Vehicle No</th>
                            <th className="px-4 py-3">Liters</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Attendant</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transactions.map((t) => (
                            <tr key={t._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-800">
                                    {new Date(t.timestamp).toLocaleDateString()}<br />
                                    <span className="text-gray-500 text-xs">{new Date(t.timestamp).toLocaleTimeString()}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-800">
                                    {t.vehicleNo || "N/A"}
                                </td>
                                <td className="px-4 py-3">{t.litersDispensed}</td>
                                <td className="px-4 py-3">{t.amount ?? "—"}</td>
                                <td className="px-4 py-3">{t.fuelPumpAttendant?.name || "—"}</td>
                                <td className="px-4 py-3 text-blue-600 hover:underline cursor-pointer">View</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
