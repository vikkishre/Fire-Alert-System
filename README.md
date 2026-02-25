🔥 Fire Alert System

IoT-Based Smart Fire Detection & Alert System using ESP8266 and Firebase

📌 Overview

The Fire Alert System is a real-time IoT solution designed to detect fire hazards using gas and flame sensors. When abnormal conditions are detected, the system activates alarms locally and updates the cloud database for remote monitoring.

This project combines embedded systems, cloud integration, and real-time monitoring to provide a scalable fire safety solution.

🚀 Key Features

🔥 Smoke Detection using MQ2 Gas Sensor

🔥 Flame Detection using IR Flame Sensor

🚨 Automatic Alarm (Buzzer + LED)

💧 Relay-Controlled Water Pump Activation

☁️ Real-time Firebase Database Updates

📱 Remote Monitoring Dashboard

🖥 OLED Live Status Display

📡 WiFi-Based IoT Communication

🛠 Tech Stack
Hardware

ESP8266 (NodeMCU)

MQ2 Gas Sensor

Flame Sensor

Relay Module

Buzzer

LED

0.96” OLED Display

Software

Arduino IDE

Firebase Realtime Database

HTML/CSS Dashboard

ESP8266 WiFi Library

FirebaseESP8266 Library

🧠 System Working

ESP8266 reads smoke level from MQ2 sensor.

Flame sensor checks for direct fire detection.

If threshold is exceeded:

Relay activates (Water Pump ON)

Buzzer turns ON

LED turns ON

System updates Firebase with:

Gas Level

Flame Status

Fire Status

System State

Dashboard reflects real-time updates.

Optional backend can trigger emergency phone alerts.

📂 Project Structure
Fire-Alert-System/
│
├── backend/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── index.html
│   └── .env
│
├── esp8266/
│   └── fire_alert_code.ino
│
└── README.md
🔐 Security Notice

Sensitive files such as:

serviceAccountKey.json

.env

API keys

are excluded using .gitignore.

Never upload private credentials to GitHub.

⚙️ Setup Instructions
1️⃣ Hardware Setup

Connect MQ2 sensor to A0

Connect Flame sensor to D3

Connect Relay to D5

Connect LED to D6

Connect Buzzer to D7

Connect OLED using I2C (D1, D2)

2️⃣ ESP8266 Configuration

Install required libraries in Arduino IDE

Add WiFi credentials

Add Firebase host & database secret

Upload code

3️⃣ Firebase Setup

Create Firebase project

Enable Realtime Database

Set read/write rules for testing

Copy database URL & secret

📊 Firebase Data Structure
fire_system
  └── live
        ├── gasLevel
        ├── flameDetected
        ├── fireStatus
        ├── systemState
        ├── ledState
        └── buzzerState
🎯 Future Improvements

📲 SMS Alert Integration

📞 Automatic Call Trigger

📈 Data Logging & Analytics

🧠 AI-based Fire Prediction

🌍 Mobile App Integration
