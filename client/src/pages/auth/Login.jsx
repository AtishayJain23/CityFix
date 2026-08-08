import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();
  //console.log(user);

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "admin":
        navigate("/admin/dashboard");
        break;

      case "employee":
        navigate("/employee/dashboard");
        break;

      case "citizen":
        navigate("/citizen/dashboard");
        break;

      default:
        navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email,
        password,
      });
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          CityFix
        </h1>

        <p className="text-gray-500 mt-2">
          Smart Citizen Complaint Management System
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 border-t pt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?
        </p>

        <Link
          to="/register"
          className="text-blue-600 font-semibold hover:underline"
        >
          Create New Account
        </Link>
      </div>
    </div>
  </div>
);
}

export default Login;
