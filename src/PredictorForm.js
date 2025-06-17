import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function PredictorForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    designation: "",
    companyType: "",
    wfh: "",
    allocation: "",
    fatigue: "",
  });

  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState("day");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleTheme = () => {
    setTheme(theme === "day" ? "night" : "day");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.name ||
      formData.gender === "" ||
      formData.designation === "" ||
      formData.companyType === "" ||
      formData.wfh === "" ||
      formData.allocation === "" ||
      formData.fatigue === ""
    ) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const data = {
      "Name": formData.name,
      "Gender": parseInt(formData.gender),
      "Company Type": parseInt(formData.companyType),
      "WFH Setup Available": parseInt(formData.wfh),
      "Designation": parseInt(formData.designation),
      "Resource Allocation": parseFloat(formData.allocation),
      "Mental Fatigue Score": parseFloat(formData.fatigue),
    };

    try {
      const response = await fetch("https://burnout-backend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Prediction failed");

      const res = await response.json();
      setResult(res);
      toast.success("Prediction successful!");
    } catch (err) {
      console.error(err);
      toast.error("Error predicting burnout");
    }

    setLoading(false);
  };

  const backgroundImageUrl =
    theme === "day"
      ? `${process.env.PUBLIC_URL}/grass-bg.png`
      : `${process.env.PUBLIC_URL}/end-bg.png`;

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-all"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer />
      <div className="absolute top-4 right-4">
        <button onClick={toggleTheme} className="minecraft-btn-small">
          {theme === "day" ? "🌙 Night" : "☀️ Day"}
        </button>
      </div>

      <div className="glass-container p-8 rounded-lg shadow-lg w-full max-w-lg border-4 border-green-700">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6 pixel-font">
          Burnout Predictor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="pixel-input"
          />
          <input
            type="number"
            name="gender"
            placeholder="Gender (0/1)"
            onChange={handleChange}
            className="pixel-input"
          />
          <input
            type="number"
            name="designation"
            placeholder="Designation"
            onChange={handleChange}
            className="pixel-input"
          />
          <input
            type="number"
            name="companyType"
            placeholder="Company Type (0/1)"
            onChange={handleChange}
            className="pixel-input"
          />
          <input
            type="number"
            name="wfh"
            placeholder="WFH Available (0/1)"
            onChange={handleChange}
            className="pixel-input"
          />
          <input
            type="number"
            step="0.1"
            name="allocation"
            placeholder="Resource Allocation"
            onChange={handleChange}
            className="pixel-input"
          />
          <input
            type="number"
            step="0.1"
            name="fatigue"
            placeholder="Mental Fatigue Score"
            onChange={handleChange}
            className="pixel-input"
          />

          <button type="submit" className="minecraft-btn w-full">
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {result && (
          <div className="mt-6">
            <h2 className="text-lg pixel-font text-center">
              {formData.name}, your Burnout Risk:{" "}
              <span
                className={
                  result.burnout_risk ? "text-red-600" : "text-green-600"
                }
              >
                {result.burnout_risk ? "High" : "Low"}
              </span>
            </h2>

            <div className="xp-bar mt-2">
              <div
                className={`xp-fill ${
                  result.burnout_risk ? "bg-red-600" : "bg-green-600"
                }`}
                style={{ width: result.burnout_risk ? "80%" : "30%" }}
              ></div>
            </div>

            <p className="text-center mt-2 pixel-font text-lg">
              {result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictorForm;
