import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import TextArea from "../components/ui/TextArea";
import { useComplaint } from "../context/ComplaintContext";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../components/complaint/LocationPicker";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const { createComplaint } = useComplaint();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please select complaint location");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      formData.append("latitude", location.lat);
      formData.append("longitude", location.lng);

      if (photo) {
        formData.append("photos", photo);
      }

      await createComplaint(formData);

      navigate("/citizen/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPhoto(file);

    setPreview(URL.createObjectURL(file));
  };

  const [location, setLocation] = useState(null);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextArea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="mb-4">
        <label className="block mb-2 font-medium">Category</label>

        <select
          className="w-full border rounded-lg p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>

          <option value="Road">Road</option>

          <option value="Water">Water</option>

          <option value="Electricity">Electricity</option>

          <option value="Garbage">Garbage</option>

          <option value="Street Light">Street Light</option>

          <option value="Drainage">Drainage</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Photo</label>

        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Select Complaint Location
        </label>

        <LocationPicker position={location} setPosition={setLocation} />

        {location && (
          <p className="mt-2 text-green-600">Location selected successfully</p>
        )}
      </div>

      {latitude && longitude && (
        <p className="mt-2 text-green-600">Location selected successfully</p>
      )}

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-56 rounded-lg border mb-4"
        />
      )}

      <Button type="submit">Submit Complaint</Button>
    </form>
  );
};

export default ComplaintForm;
