import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import TopNavigation from "../../components/TopNavigation";
import InputField from "../../components/InputField";
import { VIEWS } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function Login() {
  const { setLoggedInUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const navigateToRegister = () => {
    navigate(VIEWS.SIGNUP);
  };

  const signInToPlatform = async () => {
    if (email === "") {
      toast.error("Please enter email..!!");
    } else if (!checkEmail.test(email)) {
      toast.error("Please enter valid email..!!");
    } else if (password === "") {
      toast.error("Please enter password..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const response = await axios.post(
          `http://localhost:4000/api/user/login`,
          {
            email,
            password,
          }
        );
        localStorage.setItem("loggedInUser", response.data.token);
        setLoggedInUser({ ...response.data });
        setEmail("");
        setPassword("");
        navigate(VIEWS.DASHBOARD);
      } catch (error) {
        setLoadingSpinner(false);
        toast.error(error.message);
      }
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <TopNavigation buttonName="Register" buttonAction={navigateToRegister} />
      <div className="mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign In to the platform
        </h1>
        <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <InputField
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={setEmail}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={setPassword}
          />
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
            onClick={signInToPlatform}
          >
            Sign In
          </button>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
