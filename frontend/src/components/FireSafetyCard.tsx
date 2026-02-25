import React from "react";
import { useFireSafety } from "../hooks/useFireSafety";

const FireSafetyCard: React.FC = () => {
  const { data, loading, error } = useFireSafety();

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-2xl animate-pulse">
        Loading Fire Safety...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 p-6 rounded-2xl text-white">
        ⚠ Error: {error}
      </div>
    );
  }

  const emergency = data.smokeDetected;

  return (
    <div
      className={`p-6 rounded-2xl shadow-xl border transition-all duration-500 ${
        emergency
          ? "bg-red-950 border-red-500 animate-pulse"
          : "bg-gray-900 border-gray-700"
      }`}
    >
      <h2 className="text-2xl font-bold text-red-400 mb-6">
        🔥 Fire Safety System
      </h2>

      {emergency && (
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-red-500">
            🚨 GAS DETECTED 🚨
          </h1>
          <p className="text-gray-300 mt-2">
            Emergency protocol activated
          </p>
        </div>
      )}

      <StatusRow label="Gas Detected" value={data.smokeDetected} danger />
      <StatusRow label="Buzzer Active" value={data.buzzerOn} />
      <StatusRow label="Family Call Triggered" value={data.callTriggered} />

      {data.lastAlert && (
        <div className="mt-6 text-sm text-gray-400">
          Last Alert:{" "}
          {new Date(data.lastAlert).toLocaleString()}
        </div>
      )}
    </div>
  );
};

interface StatusRowProps {
  label: string;
  value: boolean;
  danger?: boolean;
}

const StatusRow: React.FC<StatusRowProps> = ({
  label,
  value,
  danger = false,
}) => {
  const color = value
    ? danger
      ? "text-red-500"
      : "text-green-400"
    : "text-gray-500";

  return (
    <div className="flex justify-between py-2">
      <span>{label}</span>
      <span className={`font-semibold ${color}`}>
        {value ? "ACTIVE" : "OFF"}
      </span>
    </div>
  );
};

export default FireSafetyCard;