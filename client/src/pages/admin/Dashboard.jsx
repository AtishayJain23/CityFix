import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import AdminComplaintCard from "../../components/complaint/AdminComplaintCard";
import { useAdmin } from "../../context/AdminContext";

const Dashboard = () => {
  const {
    complaints,
    employees,
    loading,
    getAllComplaints,
    getAllEmployees,
    assignComplaint,
  } = useAdmin();

  const [selectedEmployee, setSelectedEmployee] = useState({});

  useEffect(() => {
    getAllComplaints();
    getAllEmployees();
  }, []);

  const handleAssign = async (complaintId) => {
    try {
      const employeeId = selectedEmployee[complaintId];

      if (!employeeId) {
        alert("Please select an employee");
        return;
      }

      await assignComplaint(complaintId, employeeId);

      await getAllComplaints();

      alert("Complaint assigned successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
     //onsole.log(employees);

  return (
    <MainLayout>
      <h1>Admin Dashboard</h1>
   
      <h3>Total Complaints: {complaints.length}</h3>
      {complaints.map((complaint) => (
        <AdminComplaintCard
          key={complaint._id}
          complaint={complaint}
          employees={employees}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          onAssign={handleAssign}
        />
      ))}
    </MainLayout>
  );
};

export default Dashboard;
