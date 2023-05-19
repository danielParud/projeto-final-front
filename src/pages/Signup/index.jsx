import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import TopNavigation from "../../components/TopNavigation";
import InputField from "../../components/InputField";
import { VIEWS } from "../../utils/routes";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function Signup() {

  // const [img, setImg] = useState("");

  // function handleImage(e) {
  //   setImg(e.target.files[0]);
  // }

  // async function handleUpload() {
  //   try {
  //     const uploadData = new FormData();
  //     uploadData.append("picture", img);

  //     const response = await api.post("/upload-image", uploadData);

  //     return response.data.url;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate(VIEWS.SIGNIN);
  }

  const signUpToPlatform = async () => {
    if (
      email === "" ||
      name === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast.error("Please enter all the fields..!!");
    } else if (!checkEmail.test(email)) {
      toast.error("Please enter valid email..!!");
    } else if (password !== confirmPassword) {
      toast.error("Confirm password is not match..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const response = await axios.post(
          `http://localhost:4000/api/user/signup`,
          {
            name,
            email,
            password,
            confirmPassword,
          }
        );
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoadingSpinner(false);
        navigate(VIEWS.SIGNIN);
      } catch (error) {
        setLoadingSpinner(false);
        toast.error(error.message);
      }
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <TopNavigation buttonName="Login" buttonAction={navigateToLogin} />
      <div className="mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign Up to the platform
        </h1>
        <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
          <InputField
            label="Name"
            type="text"
            placeholder="John Anderson"
            value={name}
            onChange={setName}
          />
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
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <button
            className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            type="submit"
            onClick={signUpToPlatform}
          >
            Sign Up
          </button>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
