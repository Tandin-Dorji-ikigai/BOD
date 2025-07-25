import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavbar from '../components/TopNavbar';

const AttendantDashboard = () => {
    const [vehicleNo, setVehicleNo] = useState('');
    const [vehicleData, setVehicleData] = useState(null);
    const [fuelQty, setFuelQty] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [alert, setAlert] = useState('');
    const [attendantId, setAttendantId] = useState('');
    const [attendantName, setAttendantName] = useState('');

    // ✅ Fetch logged-in attendant on mount
    useEffect(() => {
        const fetchAttendant = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/attendant/me", {
                    withCredentials: true
                });
                setAttendantId(res.data._id);
                setAttendantName(res.data.name);
            } catch (err) {
                console.error("Failed to fetch attendant:", err);
            }
        };

        fetchAttendant();
    }, []);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/vehicle/number/${vehicleNo}`);
            setVehicleData(res.data);
            setAlert('');
            fetchTransactions(res.data.vehicleId);
        } catch (err) {
            setVehicleData(null);
            setTransactions([]);
            setAlert('Vehicle not found.');
        }
    };

    const fetchTransactions = async (vehicleId) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/fuel-transactions/vehicle/${vehicleId}`);
            setTransactions(res.data);
        } catch (err) {
            setTransactions([]);
        }
    };

    const handleFuelIssue = async (e) => {
        e.preventDefault();
        if (!fuelQty || fuelQty <= 0) return;

        const fuelBookId = vehicleData.fuelBook?._id;
        const amount = parseFloat(fuelQty) * 0; // Optional: replace with real rate

        try {
            await axios.post('http://localhost:5000/api/fuel-transactions/log', {
                fuelBook: fuelBookId,
                fuelPumpAttendant: attendantId,
                litersDispensed: parseFloat(fuelQty),
                amount,
                vehicleNo: vehicleData.vehicleNumber,
            });

            setAlert('Fuel issued and logged successfully!');
            setFuelQty('');

            const updated = await axios.get(`http://localhost:5000/api/vehicle/number/${vehicleNo}`);
            setVehicleData(updated.data);
            fetchTransactions(updated.data.vehicleId);
        } catch (err) {
            setAlert(err.response?.data?.message || 'Error logging fuel transaction.');
        }
    };

    return (
        <>
            <TopNavbar admin={{ name: attendantName }} title="Fuel Pump Attendant" />

            <div className="p-6 bg-gray-100 min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Fuel Attendant Dashboard</h2>

                {/* Search Section */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter Vehicle Number"
                        className="px-4 py-2 border rounded w-full"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Search Vehicle
                    </button>
                </div>

                {/* Alert Message */}
                {alert && (
                    <div className="bg-yellow-100 text-yellow-800 p-3 mb-4 rounded">
                        {alert}
                    </div>
                )}

                {/* Vehicle Info */}
                {vehicleData && (
                    <div className="bg-white shadow p-4 rounded mb-4">
                        <p><strong>Vehicle:</strong> {vehicleData.vehicleNumber}</p>
                        <p><strong>Fuel Book Type:</strong> {vehicleData.fuelBookType}</p>
                        <p><strong>Fuel Type:</strong> {vehicleData.fueltype}</p>
                        <p><strong>Balance:</strong> {vehicleData.fuelBook?.currentBalance ?? 'N/A'}L</p>
                        <p><strong>Threshold:</strong> {vehicleData.fuelBook?.threshold ?? 'N/A'}L</p>
                    </div>
                )}

                {/* Fuel Issue Form */}
                {vehicleData && (
                    <form
                        onSubmit={handleFuelIssue}
                        className="bg-white p-4 shadow rounded mb-4"
                    >
                        <label className="block mb-2">Fuel Quantity (L):</label>
                        <input
                            type="number"
                            min="1"
                            required
                            value={fuelQty}
                            onChange={(e) => setFuelQty(e.target.value)}
                            className="w-full px-4 py-2 border rounded mb-4"
                        />
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
                            Issue Fuel
                        </button>
                    </form>
                )}

                {/* Threshold Alert */}
                {vehicleData &&
                    vehicleData.fuelBook?.currentBalance < vehicleData.fuelBook?.threshold && (
                        <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">
                            Warning: Fuel balance below threshold!
                        </div>
                    )}

                {/* Recent Transactions */}
                {transactions.length > 0 && (
                    <div className="mt-6">
                        <h3 className="font-semibold text-lg mb-2">Recent Transactions</h3>
                        <ul className="bg-white shadow rounded divide-y">
                            {transactions.slice(0, 5).map((t) => (
                                <li key={t._id} className="p-3 text-sm">
                                    {new Date(t.timestamp).toLocaleDateString()} — {t.litersDispensed}L
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default AttendantDashboard;
