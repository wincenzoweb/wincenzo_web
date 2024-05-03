import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";

const settings = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <Card>
          <div className="space-y-6">
            <div className="flex space-x-3 items-center rtl:space-x-reverse">
              <div className="flex-none h-8 w-8 rounded-full bg-slate-800 dark:bg-slate-700 text-slate-300 flex flex-col items-center justify-center text-lg">
              <Icon icon="heroicons:credit-card" />
              {/* <Icon icon="heroicons:building-office-2" /> */}
              </div>
              <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                Razorpay Settings
              </div>
            </div>
            {/* <div className="text-slate-600 dark:text-slate-300 text-sm">
              Set up your company profile, add your company logo, and more
            </div> */}
            <Link
              to="#"
              className="inline-flex items-center space-x-3 rtl:space-x-reverse text-sm capitalize font-medium text-slate-600 dark:text-slate-300"
            >
              <span>Change Settings</span> <Icon icon="heroicons:arrow-right" />
            </Link>
          </div>
        </Card>
        <Card>
          <div className="space-y-6">
            <div className="flex space-x-3 items-center rtl:space-x-reverse">
              <div className="flex-none h-8 w-8 rounded-full bg-success-500 text-slate-300 flex flex-col items-center justify-center text-lg">
                <Icon icon="heroicons:chat-bubble-oval-left-ellipsis" />
              </div>
              <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                Twilio Settings
              </div>
            </div>
            {/* <div className="text-slate-600 dark:text-slate-300 text-sm">
              Connect your bank account to your company profile, and more
            </div> */}
            <Link
              to="#"
              className="inline-flex items-center space-x-3 rtl:space-x-reverse text-sm capitalize font-medium text-slate-600 dark:text-slate-300"
            >
              <span>Change Settings</span> <Icon icon="heroicons:arrow-right" />
            </Link>
          </div>
        </Card>
        <Card>
          <div className="space-y-6">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <div className="flex-none h-8 w-8 rounded-full bg-yellow-500 text-white flex flex-col items-center justify-center text-lg">
                <Icon icon="heroicons:chart-bar" />
              </div>
              <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                Google Analytics Settings
              </div>
            </div>
            {/* <div className="text-slate-600 dark:text-slate-300 text-sm">
              Set up your profile, add your profile photo, and more
            </div> */}
            <Link
              to="#"
              className="inline-flex items-center space-x-3 rtl:space-x-reverse text-sm capitalize font-medium text-slate-600 dark:text-slate-300"
            >
              <span>Change Settings</span> <Icon icon="heroicons:arrow-right" />
            </Link>
          </div>
        </Card>
        <Card>
          <div className="space-y-6">
            <div className="flex space-x-3 rtl:space-x-reverse items-center">
              <div className="flex-none h-8 w-8 rounded-full bg-primary-500 text-white flex flex-col items-center justify-center text-lg">
                <Icon icon="heroicons:globe-asia-australia" />
              </div>
              <div className="flex-1 text-base text-slate-900 dark:text-white font-medium">
                Database URL 
              </div>
            </div>
            {/* <div className="text-slate-600 dark:text-slate-300 text-sm">
              Set up your profile, add your profile photo, and more
            </div> */}
            <Link
              to="#"
              className="inline-flex items-center space-x-3 rtl:space-x-reverse text-sm capitalize font-medium text-slate-600 dark:text-slate-300"
            >
              <span>Change Settings</span> <Icon icon="heroicons:arrow-right" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default settings;
