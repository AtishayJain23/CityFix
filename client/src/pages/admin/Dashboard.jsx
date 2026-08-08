
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Card from "../../components/ui/Card";
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

  const total = complaints.length;

  const open = complaints.filter(
    (complaint) => complaint.status === "Open"
  ).length;

  const inProgress = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const rejected = complaints.filter(
    (complaint) => complaint.status === "Rejected"
  ).length;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <h3 className="text-gray-500">Total</h3>
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

        <Card>
          <h3 className="text-gray-500">Rejected</h3>
          <p className="text-3xl font-bold">{rejected}</p>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        All Complaints
      </h2>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((complaint) => (
          <AdminComplaintCard
            key={complaint._id}
            complaint={complaint}
            employees={employees}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            onAssign={handleAssign}
          />
        ))
      )}
    </MainLayout>
  );
};

export default Dashboard;

