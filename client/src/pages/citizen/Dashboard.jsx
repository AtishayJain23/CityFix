import { useEffect } from "react";
//import Navbar from "../../components/layout/Navbar";
import { useComplaint } from "../../context/ComplaintContext";
import ComplaintCard from "../../components/complaint/ComplaintCard";
import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const Dashboard = () => {
  const { complaints, loading, getMyComplaints } = useComplaint();
  const navigate = useNavigate();

  useEffect(() => {
    getMyComplaints();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const total = complaints.length;

  const open = complaints.filter((c) => c.status === "Open").length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress",
  ).length;

  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <>
      <MainLayout>
        <h1>Citizen Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <h3 className="text-gray-500">Total Complaints</h3>

            <p className="text-3xl font-bold">{total}</p>
          </Card>

          <Card>
            <h3 className="text-gray-500">Open</h3>

            <p className="text-3xl font-bold">{open}</p>
          </Card>

          <Card>
            <h3 className="text-gray-500">In Progress</h3>

            <p className="text-3xl font-bold">{inProgress}</p>
          </Card>

          <Card>
            <h3 className="text-gray-500">Resolved</h3>

            <p className="text-3xl font-bold">{resolved}</p>
          </Card>
        </div>

        <div className="mb-6">
          <Button onClick={() => navigate("/citizen/create-complaint")}>
            + Create Complaint
          </Button>
        </div>

        <h3>Total Complaints: {complaints.length}</h3>

        {complaints.length === 0 ? (
          <h3>No complaints found.</h3>
        ) : (
          complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))
        )}
      </MainLayout>
    </>
  );
};

export default Dashboard;
