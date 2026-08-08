import Card from "../ui/Card";

const AdminComplaintCard = ({
  complaint,
  employees,
  selectedEmployee,
  setSelectedEmployee,
  onAssign,
}) => {
  return (
    <Card className="mb-4">
      <h2 className="text-xl font-semibold">{complaint.title}</h2>

      <p>{complaint.description}</p>

      <p>
        <strong>Status:</strong>
        {complaint.status}
      </p>

      <p>
        <strong>Citizen:</strong>
        {complaint.createdBy?.name}
      </p>

      <div className="mt-4 flex gap-2">
        <select
          value={selectedEmployee[complaint._id] || ""}
          onChange={(e) =>
            setSelectedEmployee({
              ...selectedEmployee,
              [complaint._id]: e.target.value,
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Employee</option>

          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => onAssign(complaint._id)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Assign
        </button>
      </div>
    </Card>
  );
};

export default AdminComplaintCard;
