import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
    <div>
      <h1>CityFix Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
