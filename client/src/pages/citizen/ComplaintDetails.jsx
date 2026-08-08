import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import Navbar from "../../components/layout/Navbar";
import { useComplaint } from "../../context/ComplaintContext";
import MainLayout from "../../components/layout/MainLayout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

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

  const [longitude, latitude] = complaint.location.coordinates;

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

        {complaint.photos?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Complaint Photos</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {complaint.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.url}
                  alt={`Complaint ${index + 1}`}
                  className="w-full h-56 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Complaint Location</h3>

          <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            style={{
              height: "400px",
              width: "100%",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={[latitude, longitude]}>
              <Popup>{complaint.title}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </MainLayout>
    </>
  );
};

export default ComplaintDetails;
