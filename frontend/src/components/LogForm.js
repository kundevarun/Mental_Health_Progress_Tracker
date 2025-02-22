import React, { useState } from "react";
import { Client, Databases, ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import "/Users/vk/Documents/Mental Health Progress Tracker/frontend/src/styles/LogForm.css";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b8f1240016a05629d0");

const database = new Databases(client);

const LogForm = ({ userId }) => {
  const navigate = useNavigate();
  
  const [mood, setMood] = useState("");
  const [anxiety, setAnxiety] = useState("");
  const [sleepDuration, setSleepDuration] = useState("");
  const [physicalActivity, setPhysicalActivity] = useState("");
  const [socialInteraction, setSocialInteraction] = useState("");
  const [stressLevel, setStressLevel] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logData = {
      userId,
      mood: parseInt(mood, 10) || 0,
      anxiety: parseInt(anxiety, 10) || 0,
      sleepDuration: parseInt(sleepDuration, 10) || 0,
      physicalActivity: parseInt(physicalActivity, 10) || 0,
      socialInteraction: parseInt(socialInteraction, 10) || 0,
      stressLevel: parseInt(stressLevel, 10) || 0,
      symptoms,
      date,
    };

    try {
      await database.createDocument(
        "67b91fb0000465584981", 
        "67b92278000437361100",
        ID.unique(),
        logData
      );
      alert("Log submitted successfully!");

      setMood("");
      setAnxiety("");
      setSleepDuration("");
      setPhysicalActivity("");
      setSocialInteraction("");
      setStressLevel("");
      setSymptoms("");
    } catch (error) {
      console.error("Error submitting log:", error);
      alert("Failed to submit the log.");
    }
  };

  return (
    <div className="log-form-container">
      <form onSubmit={handleSubmit} className="log-form">
        <h3>Submit Your Mental Health Log</h3>

        <div className="form-group">
          <label>Mood: </label>
          <input type="number" value={mood} placeholder="Mood Scale(0-10)" onChange={(e) => setMood(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Anxiety Level: </label>
          <input type="number" value={anxiety} placeholder="Anxiety Scale(0-10)" onChange={(e) => setAnxiety(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Sleep Duration: </label>
          <input type="number" value={sleepDuration} placeholder="in hours" onChange={(e) => setSleepDuration(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Physical Activity: </label>
          <input type="number" value={physicalActivity} placeholder="number of hrs" onChange={(e) => setPhysicalActivity(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Social Interaction: </label>
          <input type="number" value={socialInteraction} placeholder="how long(in hrs)" onChange={(e) => setSocialInteraction(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Stress Level: </label>
          <input type="number" value={stressLevel} placeholder="Stress Level (0-10)" onChange={(e) => setStressLevel(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Symptoms: </label>
          <input type="text" value={symptoms} placeholder="Symptoms" onChange={(e) => setSymptoms(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <button type="submit" className="submit-btn">Submit Log</button>
      </form>

      <button className="chart-btn" onClick={() => navigate("/charts")}>View Charts</button>
    </div>
  );
};

export default LogForm;
