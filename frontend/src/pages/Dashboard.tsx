import React from "react";
import { getDatabase, ref, update } from "firebase/database";
import { useDeviceData } from "../hooks/useDeviceData";

const Dashboard: React.FC = () => {
  const { data } = useDeviceData();
  const db = getDatabase();

  if (!data) return <div>Loading...</div>;

  const fire = data.fire_system?.live;
  const controls = data.fire_system?.controls;
  const twilio = data.fire_system?.alerting?.twilio;

  const toggleControl = (key: string, value: boolean) => {
    update(ref(db, "fire_system/controls"), {
      [key]: !value,
    });
  };

  return (
    <div className="dashboard">
      <h1>🔥 Fire Monitoring Dashboard</h1>

      <div className="dashboard-grid">

        {/* 🔥 Fire Safety Card */}
        <div className="card">
          <div className="section-title">🔥 Fire Safety</div>

          <div className="status">
            <span>
              <span className={`indicator ${fire?.fireStatus ? "red" : "green"}`} />
              System
            </span>
            <span>{fire?.systemState}</span>
          </div>

          <div className="status">
            <span>Flame</span>
            <span>{fire?.flameDetected ? "Detected" : "Safe"}</span>
          </div>

          <div className="status">
            <span>Gas Level</span>
            <span>{fire?.gasLevel}</span>
          </div>

          <div className="status">
            <span>Call Status</span>
            <span>{twilio?.callStatus || "IDLE"}</span>
          </div>
        </div>

        {/* 🎛 Manual Controls */}
        <div className="card">
          <div className="section-title">🎛 Manual Controls</div>

          <div className="status">
            <span>LED</span>
            <button
              onClick={() => toggleControl("led", controls?.led)}
              className={controls?.led ? "btn-on" : "btn-off"}
            >
              {controls?.led ? "Turn OFF" : "Turn ON"}
            </button>
          </div>

          <div className="status">
            <span>Buzzer</span>
            <button
              onClick={() => toggleControl("buzzer", controls?.buzzer)}
              className={controls?.buzzer ? "btn-on" : "btn-off"}
            >
              {controls?.buzzer ? "Turn OFF" : "Turn ON"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;