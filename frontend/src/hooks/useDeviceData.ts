import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

export const useDeviceData = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const db = getDatabase();
    const deviceRef = ref(db, "fire_system");

    onValue(deviceRef, (snapshot) => {
      setData({ fire_system: snapshot.val() });
    });
  }, []);

  return { data };
};