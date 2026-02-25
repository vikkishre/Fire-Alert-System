export interface FireSafetyData {
    smokeDetected: boolean;
    buzzerOn: boolean;
    callTriggered: boolean;
    lastAlert: number | null;
  }
  
  export interface UseFireSafetyReturn {
    data: FireSafetyData;
    loading: boolean;
    error: string | null;
    togglePump: () => Promise<void>;
  }