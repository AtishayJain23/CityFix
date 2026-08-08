import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { useComplaint } from "../../context/ComplaintContext";
import Button from "../../components/ui/Button";

const EditComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getComplaintById, updateComplaint } = useComplaint();

  const [complaint, setComplaint] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const data = await getComplaintById(id);

        setComplaint(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateComplaint(id, {
        title,
        description,
      });

      alert("Complaint updated successfully");
      navigate("/citizen/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (!complaint) {
    return (
      <MainLayout>
        <h2>Loading...</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1>Edit Complaint</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        <br />

        <Button type="submit">Update Complaint</Button>
      </form>
    </MainLayout>
  );
};

export default EditComplaint;
