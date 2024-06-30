import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImg from "../assets/addImage.png";
import "./RegisterPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../service/AllAPI";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImg: "",
  });

  useEffect(() => {
    if (formData.profileImg) {
      setPreview(URL.createObjectURL(formData.profileImg));
    } else {
      setPreview("");
    }
  }, [formData.profileImg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setError("");

    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.profileImg
    ) {
      try {
        const registerForm = new FormData();
        registerForm.append("firstName", formData.firstName);
        registerForm.append("lastName", formData.lastName);
        registerForm.append("email", formData.email);
        registerForm.append("password", formData.password);
        registerForm.append("confirmPassword", formData.confirmPassword);
        registerForm.append("profileImg", formData.profileImg);

        const result = await registerAPI(registerForm);
        if (result.status === 200) {
          toast.success(
            `Welcome ${formData.firstName}... Please login to explore our website`
          );
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            profileImg: "",
          });
          navigate("/login");
        } else {
          if (result.response.status === 406) {
            toast.error(result.response.data);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              profileImg: "",
            });
          }
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.info("Please fill the form completely");
    }
  };

  return (
    <div className="register">
      <div className="register_container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Id"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <input
            id="image"
            type="file"
            name="profileImg"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) =>
              setFormData({
                ...formData,
                profileImg: e.target.files[0],
              })
            }
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label htmlFor="image">
            <img src={uploadImg} alt="add Profile photo" />
            <p>Upload your Photo</p>
          </label>
          {preview && (
            <img
              src={preview}
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              alt="Profile img"
            />
          )}

          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to={"/login"}>Login Here</Link>
          </p>
        </form>
      </div>
      <ToastContainer position="bottom-left" autoClose={3000} theme="colored" />
    </div>
  );
};

export default RegisterPage;
