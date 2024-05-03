import React from "react";

import Razorpay from "./Razorpay";
import GoogleAnalytics from "./GoogleAnalytics";
import TwilioSettings from "./Twilio";
import BaseUrl from "./BaseUrl";

const Settings = () => {

  return (
    <div>
      <div className="text-red-600 bg-red-100 p-1 rounded-md mb-4 text-center">
        <p>Warning: Do not modify without Permission.</p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <Razorpay />
        <GoogleAnalytics />
        <TwilioSettings />
        <BaseUrl />
      </div>
    </div>
  );
};

export default Settings;
