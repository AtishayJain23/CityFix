import { Link } from "react-router-dom";
import Card from "../ui/Card";

const ComplaintCard = ({ complaint }) => {
  return (
    <Card className="mb-4">
      <h2 className="text-xl font-semibold">{complaint.title}</h2>
      <p className="mt-2 text-gray-600">{complaint.description}</p>
      <p className="mt-3">
        <strong>Category:</strong> {complaint.category}
      </p>
      <p>
        <strong>Status:</strong> {complaint.status}
      </p>
      console.log(complaints);
      <Link
        to={`/complaints/${complaint._id}`}
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </Card>
  );
};

export default ComplaintCard;
