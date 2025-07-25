import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import DashboardPage from "./DashboardPage";
import CompanyPage from "./CompanyPage";
import VehiclePage from "./VehiclePage";
import DriverPage from "./DriverPage";
import FuelBalancePage from "./FuelBalancePage";
import TransactionsPage from "./TransactionsPage";
import ThresholdAlertsPage from "./ThresholdAlertsPage";

axios.defaults.withCredentials = true; // ✅ allow cookie to be sent with request

export default function AdminDashboard() {
    const [currentSection, setCurrentSection] = useState("dashboard");
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/admin/me");
                setAdmin(res.data.admin);
            } catch (err) {
                console.error("Not authenticated", err);
                window.location.href = "/"; // redirect to login if not logged in
            }
        };

        fetchAdmin();
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar onNavClick={setCurrentSection} />
            <div className="flex-1 overflow-auto bg-gray-100">
                <TopNavbar
                    title={currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                    admin={admin}
                />
                <div className="p-6">
                    {currentSection === "dashboard" && <DashboardPage />}
                    {currentSection === "companies" && <CompanyPage />}
                    {currentSection === "vehicles" && <VehiclePage />}
                    {currentSection === "drivers" && <DriverPage />}
                    {currentSection === "fuel-balance" && <FuelBalancePage />}
                    {currentSection === "transactions" && <TransactionsPage />}
                    {currentSection === "threshold-alerts" && <ThresholdAlertsPage />}
                </div>
            </div>
        </div>
    );
}
