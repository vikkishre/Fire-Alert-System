import { useEffect, useState, useRef } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase/config";
import { safeBoolean } from "../utils/safeBoolean";
import { FireSafetyData } from "../types/fireSafety";

export const useFireSafety = (homeId: string = "home_1") => {
  const [data, setData] = useState<FireSafetyData>({
    smokeDetected: false,
    buzzerOn: false,
    callTriggered: false,
    lastAlert: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const previousSmoke = useRef<boolean>(false);

  useEffect(() => {
    const fireRef = ref(db, `devices/${homeId}/fireSafety`);

    const unsubscribe = onValue(
      fireRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setError("Fire safety data not initialized.");
          setLoading(false);
          return;
        }

        const val = snapshot.val();

        const smoke = safeBoolean(val.smokeDetected);

        setData({
          smokeDetected: smoke,
          buzzerOn: safeBoolean(val.buzzerOn),
          callTriggered: safeBoolean(val.callTriggered),
          lastAlert:
            typeof val.lastAlert === "number"
              ? val.lastAlert
              : null,
        });

        // 🛑 Prevent duplicate UI flashing
        if (smoke && !previousSmoke.current) {
          console.log("🚨 New Gas Detection Event");
        }

        previousSmoke.current = smoke;

        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => off(fireRef);
  }, [homeId]);

  return { data, loading, error };
};