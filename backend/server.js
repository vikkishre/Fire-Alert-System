require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const twilio = require("twilio");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Firebase Admin Setup
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://buildathon-home-automation-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const db = admin.database();

// 🔥 Twilio Setup
const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_PHONE = process.env.TWILIO_PHONE;

// 🚨 Listen to Fire Status
const fireStatusRef = db.ref("/fire_system/live/fireStatus");

fireStatusRef.on("value", async (snapshot) => {
  const fireDetected = snapshot.val();

  if (!fireDetected) return;

  console.log("🔥 FIRE DETECTED");

  const twilioRef = db.ref("/fire_system/alerting/twilio");
  const twilioSnapshot = await twilioRef.once("value");
  const twilioData = twilioSnapshot.val();

  if (!twilioData.enabled) {
    console.log("⚠ Twilio calling disabled");
    return;
  }

  // Prevent multiple calls if already calling
  if (twilioData.callStatus === "CALLING") {
    console.log("⚠ Already calling...");
    return;
  }

  // Cooldown logic (5 minutes)
  const cooldown = 5 * 60 * 1000;
  const now = Date.now();

  if (now - twilioData.lastCallTime < cooldown) {
    console.log("⏳ Cooldown active. Skipping call.");
    return;
  }

  try {
    await twilioRef.update({
      callStatus: "CALLING",
    });

    // Call all emergency contacts
    const contacts = twilioData.emergencyContacts;

    for (const key in contacts) {
      const phone = contacts[key];

      await client.calls.create({
        twiml:
          "<Response><Say>Emergency Alert. Fire detected at your home. Please respond immediately.</Say></Response>",
        to: phone,
        from: TWILIO_PHONE,
      });
    }

    await twilioRef.update({
      callStatus: "SUCCESS",
      lastCallTime: now,
      retryCount: 0,
    });

    // Log event
    await db.ref("/fire_system/logs").push({
      fireStatus: true,
      alertTime: now,
      callPlaced: true,
      callStatus: "SUCCESS",
    });

    console.log("✅ Calls completed successfully");
  } catch (error) {
    console.error("❌ Call failed:", error);

    await twilioRef.update({
      callStatus: "FAILED",
      retryCount: twilioData.retryCount + 1,
    });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("🔥 Fire Safety Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});