import React from "react";
import useFooterType from "@/hooks/useFooterType";
import dayjs from "dayjs";

const Footer = ({ className = "custom-class" }) => {
  const [footerType] = useFooterType();
  const footerclassName = () => {
    switch (footerType) {
      case "sticky":
        return "sticky bottom-0 z-[999]";
      case "static":
        return "static";
      case "hidden":
        return "hidden";
    }
  };
  return (
    <footer className={className + " " + footerclassName()}>
      <div className="site-footer px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 py-4">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
          <div className="text-center ltr:md:text-start rtl:md:text-right text-sm">
            COPYRIGHT &copy; {dayjs().format("YYYY")} Wincenzo, All rights Reserved
          </div>
          <div className="ltr:md:text-right rtl:md:text-end text-center text-sm">
            Hand-crafted & Made by{" "}
            <a
              href="https://vakratundsolutions.com/"
              target="_blank"
              className="text-primary-500 font-semibold"
            >
              Vakratund Solution
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
