import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to={
            user?.role === "admin"
              ? "/admin/dashboard"
              : user?.role === "employee"
                ? "/employee/dashboard"
                : "/citizen/dashboard"
          }
          className="text-2xl font-bold text-blue-600"
        >
          CityFix
        </Link>

        <div className="flex items-center gap-6">
          {user?.role === "citizen" && (
            <>
              <Link to="/citizen/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              <Link
                to="/citizen/create-complaint"
                className="hover:text-blue-600"
              >
                Create Complaint
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          )}

          {user?.role === "employee" && (
            <Link to="/employee/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          )}

          <span className="font-medium">{user?.name}</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
