import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/AuthLayout";
import Layout from "./Layout.jsx";
import { login } from "./store/slices/authSlice";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import ManageHabit from "./pages/ManageHabit";
import Settings from "./pages/Settings";
import axiosInstance from "./utils/AxiosInstance.js";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  // Add loading state to manage fetch status

  // Check for user profile on app load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await axiosInstance("/api/v1/user/profile");
        if (userProfile) {
          dispatch(login(userProfile.data.data)); // Dispatch login action with the user data
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      } finally {
        setLoading(false);  // Set loading to false after profile is fetched
      }
    };

    fetchUserProfile(); // Run the check on app load
  }, [dispatch]);

  if (loading) {
    return <Loader />;  // Show loading state while fetching profile
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AuthLayout authentication={false}><Home /></AuthLayout>} />
        <Route path="signup" element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
        <Route path="login" element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
        <Route path="dashboard" element={<AuthLayout><Dashboard /></AuthLayout>} />
        <Route path="add-habit" element={<AuthLayout><AddHabit /></AuthLayout>} />
        <Route path="manage-habits" element={<AuthLayout><ManageHabit /></AuthLayout>} />
        <Route path="settings" element={<AuthLayout><Settings /></AuthLayout>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >
  );
};

export default App;