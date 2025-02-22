import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, Colors, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";
import "../styles/ChartPage.css";

Chart.register(...registerables);

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b8f1240016a05629d0");

const database = new Databases(client);

const ChartsPage = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await database.listDocuments(
          "67b91fb0000465584981",
          "67b92278000437361100"
        );
        setLogs(response.documents);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const sortedLogs = logs.sort((a, b) => new Date(a.date) - new Date(b.date));

  const dates = sortedLogs.map((log) => formatDate(log.date));
  const moodData = sortedLogs.map((log) => log.mood);
  const anxietyData = sortedLogs.map((log) => log.anxiety);
  const sleepData = sortedLogs.map((log) => log.sleepDuration);

  return (
    <div className="charts-container">
      <h2>Mental Health Progress Charts</h2>
      <button className="back-btn" onClick={() => navigate("/")}>Go Back</button>

      <div className="charts-row">
        <div className="chart-box">
          <h3 style={{ color: "blue" }}>Mood (Sad - Very Happy)</h3>
          <Line 
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Mood",
                  data: moodData,
                  borderColor: "blue",
                  backgroundColor: "rgba(0,0,255,0.3)"
                }
              ]
            }}
          />
        </div>

        <div className="chart-box">
          <h3 style={{ color: "Red" }}>Anxiety Levels</h3>
          <Bar 
            data={{
              labels: dates,
              datasets: [
                {
                  label: "Anxiety",
                  data: anxietyData,
                  backgroundColor: "red"
                }
              ]
            }}
          />
        </div>
        
        <div className="chart-box">
          <h3 style={{ color: "Orange" }}>Sleep Duration (in hrs)</h3>
          <Pie 
  data={{
    labels: dates,
    datasets: [
      {
        label: "Sleep Hours",
        data: sleepData,
        backgroundColor: [
          "#FF5733", 
          "#33FF57",
          "#3357FF",
          "#FF33A6", 
          "gold",
        ]
      }
    ]
  }}
/>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
