import { Link } from "react-router-dom";
import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";

const ComplaintCard = ({ complaint, onDelete }) => {
  const navigate = useNavigate();
  return (
    <Card className="mb-4">
      {" "}
      <h2 className="text-xl font-semibold"> {complaint.title} </h2>{" "}
      <p className="mt-2 text-gray-600"> {complaint.description} </p>{" "}
      <p className="mt-3">
        {" "}
        <strong>Category:</strong> {complaint.category}{" "}
      </p>{" "}
      <p>
        {" "}
        <strong>Status:</strong> {complaint.status}{" "}
      </p>{" "}
      <div className="flex gap-4 mt-4">
        {" "}
        <Link
          to={`/complaints/${complaint._id}`}
          className="text-blue-600 hover:underline"
        >
          {" "}
          View Details{" "}
        </Link>{" "}
        {complaint.status === "Open" && (
          <>
            <button
              onClick={() => navigate(`/complaints/${complaint._id}/edit`)}
              className="text-green-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(complaint._id)}
              className="text-red-600 hover:underline"
            >
              {" "}
              Delete{" "}
            </button>{" "}
          </>
        )}{" "}
      </div>{" "}
    </Card>
  );
};
export default ComplaintCard;
