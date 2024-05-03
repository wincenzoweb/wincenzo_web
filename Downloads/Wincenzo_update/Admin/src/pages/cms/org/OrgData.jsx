import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";

const OrgData = ({ ORG }) => {
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Orgnization Page</h4>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              {ORG !== null && ORG !== undefined ? (
                <>
                  <div className="m-5 flex flex-col gap-4">
                    <p className="mx-2 text-lg">Basic Details</p>
                    <div className="m-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Email : <span className="px-1">{ORG?.email}</span>
                      </p>
                    </div>
                    <div className="m-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Phone Number :{" "}
                        <span className="px-1">{ORG?.phoneNumber}</span>
                      </p>
                    </div>
                    <div className="m-3">
                      <p className="text-sm mb-2 text-slate-600 dark:text-slate-300">
                        Map :
                      </p>
                      <div className="flex">
                        <iframe
                          src={ORG?.map}
                          width="1000"
                          height="400"
                          allowfullscreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                    <div className="border-b mt-20"></div>
                    <p className="mx-2 my-4 text-lg">Footer Details</p>
                    <div className="m-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Footer Discription :{" "}
                        <span className="px-1">{ORG?.footerDiscription}</span>
                      </p>
                    </div>
                    <div className="m-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Footer Facebook Logo :{" "}
                        <span className="px-1">{ORG?.footerFacebookLogo}</span>
                      </p>
                    </div>
                    <div className="m-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Footer Twitter Logo :{" "}
                        <span className="px-1">{ORG?.footerTwitterLogo}</span>
                      </p>
                    </div>
                    <div className="m-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Footer LinkedIn Logo :{" "}
                        <span className="px-1">{ORG?.footerLinkedInLogo}</span>
                      </p>
                    </div>
                    <div className="m-3">
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        footer Instagram Logo :{" "}
                        <span className="px-1">{ORG?.footerInstagramLogo}</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center my-10">
                    Orgnization Data Not Found
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default OrgData;
