export interface FireSafety {
    smokeDetected: boolean;
    callTriggered: boolean | string;
    pumpStatus: boolean;
  }
  
  export interface SmartHome {
    temperature: number;
    motionDetected: boolean;
    fan: boolean;
    lights: {
      livingRoom: boolean;
      bedRoom: boolean;
    };
  }
  
  export interface DeviceData {
    fireSafety: FireSafety;
    smartHome: SmartHome;
  }