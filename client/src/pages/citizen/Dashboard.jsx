import { useEffect } from "react";
//import Navbar from "../../components/layout/Navbar";
import { useComplaint } from "../../context/ComplaintContext";
import ComplaintCard from "../../components/complaint/ComplaintCard";
import MainLayout from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const Dashboard = () => {
  const { complaints, loading, getMyComplaints } = useComplaint();
  const navigate = useNavigate();

  useEffect(() => {
    getMyComplaints();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <MainLayout>
        <h1>Citizen Dashboard</h1>

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
