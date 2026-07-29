import ComplaintForm from "../../components/ComplaintForm";
import MainLayout from "../../components/layout/MainLayout";

const CreateComplaint = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Create Complaint
      </h1>
       <ComplaintForm />
    </MainLayout>
  );
};

export default CreateComplaint;