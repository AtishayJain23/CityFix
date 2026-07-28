import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import Navbar from "../../components/layout/Navbar";
import { useComplaint } from "../../context/ComplaintContext";
import MainLayout from "../../components/layout/MainLayout";

const ComplaintDetails = () => {
  const { id } = useParams();

  const { getComplaintById } = useComplaint();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      const data = await getComplaintById(id);

      setComplaint(data);
    };

    fetchComplaint();
  }, [id]);

  if (!complaint) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <MainLayout>
        <h1>{complaint.title}</h1>

        <p>{complaint.description}</p>

        <p>
          <strong>Category:</strong> {complaint.category}
        </p>

        <p>
          <strong>Status:</strong> {complaint.status}
        </p>
      </MainLayout>
    </>
  );
};

export default ComplaintDetails;
