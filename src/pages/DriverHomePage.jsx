import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DriverHomePage() {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fuelBookData, setFuelBookData] = useState(null);

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/driver/me", {
                    withCredentials: true,
                });
                const fetchedDriver = res.data.driver;
                setDriver(fetchedDriver);

                const vehicleNo = fetchedDriver?.vehicle?.vehicleNumber || fetchedDriver?.vehicle;
                if (!vehicleNo) {
                    console.warn("Driver has no vehicle assigned.");
                    setLoading(false);
                    return;
                }

                const fuelRes = await axios.get(
                    `http://localhost:5000/api/vehicle/number/${vehicleNo}`,
                    { withCredentials: true }
                );

                console.log("Fetched Fuel Book:", fuelRes.data);
                setFuelBookData(fuelRes.data);

                setLoading(false);
            } catch (err) {
                console.error("Failed to load driver", err);
                setLoading(false);
            }
        };

        fetchDriver();
    }, []);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!driver) return <p className="p-4 text-red-600">Driver not authenticated.</p>;

    const fuelBook = fuelBookData?.fuelBook;
    const fuelBookType = fuelBookData?.fuelBookType;
    const company = fuelBookData?.company?.name;
    const fueltype = fuelBookData?.fueltype;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Welcome, {driver.name} 👋
            </h1>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Driver Info</h2>
                <p><strong>Email:</strong> {driver.email}</p>
            </div>

            {fuelBook && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Fuel Book Status</h2>
                    <p><strong>Fuel Book Type:</strong> {fuelBookType}</p>
                    <p><strong>Fuel Type:</strong> {fueltype}</p>
                    {company && <p><strong>Company:</strong> {company}</p>}
                    <p><strong>Current Balance:</strong> {fuelBook.currentBalance} Nu</p>
                    <p><strong>Threshold Limit:</strong> {fuelBook.threshold} Nu</p>

                    {fuelBook.currentBalance <= fuelBook.threshold && (
                        <p className="mt-2 text-red-600 font-medium">
                            ⚠️ Balance is below threshold. Please top up soon.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
