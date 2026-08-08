import { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { useEmployee } from "../../context/EmployeeContext";
import EmployeeComplaintCard from "../../components/complaint/EmployeeComplaintCard";

const Dashboard = () => {
  const { complaints, loading, getAssignedComplaints, updateComplaintStatus } =
    useEmployee();

  useEffect(() => {
    getAssignedComplaints();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const handleStatusUpdate = async (complaintId, status) => {
    try {
      await updateComplaintStatus(complaintId, status);

      await getAssignedComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <h1>Employee Dashboard</h1>

      <h3>
        Assigned Complaints:
        {complaints.length}
      </h3>

      {complaints.map((complaint) => (
        <EmployeeComplaintCard
          key={complaint._id}
          complaint={complaint}
          onStatusUpdate={handleStatusUpdate}
        />
      ))}
    </MainLayout>
  );
};

export default Dashboard;
