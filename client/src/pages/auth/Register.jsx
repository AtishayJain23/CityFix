
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);

      navigate("/citizen/dashboard");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Register
        </h1>

        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full">
          Register
        </Button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
