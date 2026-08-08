import Card from "../ui/Card";

const EmployeeComplaintCard = ({ complaint, onStatusUpdate }) => {
  return (
    <Card className="mb-4">
      <h2 className="text-xl font-semibold">{complaint.title}</h2>

      <p className="mt-2 text-gray-600">{complaint.description}</p>

      <p className="mt-2">
        <strong>Category:</strong> {complaint.category}
      </p>

      <p>
        <strong>Citizen:</strong> {complaint.createdBy?.name}
      </p>

      <p
        className={
          complaint.status === "Resolved"
            ? "text-green-600 font-semibold"
            : complaint.status === "Rejected"
              ? "text-red-600 font-semibold"
              : "text-yellow-600 font-semibold"
        }
      >
        Status: {complaint.status}
      </p>

      {complaint.status === "In Progress" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onStatusUpdate(complaint._id, "Resolved")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Resolve
          </button>

          <button
            onClick={() => onStatusUpdate(complaint._id, "Rejected")}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      )}
    </Card>
  );
};

export default EmployeeComplaintCard;
