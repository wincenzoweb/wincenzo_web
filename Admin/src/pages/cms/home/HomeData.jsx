import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";

const HomeData = ({ home }) => {
  console.log(home);
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Home Page</h4>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              {home !== null && home !== undefined ? (
                <>
                  <div className="m-5">
                    {/* <p className="m-2 text-base">
                      home Page Title <span>:</span> {home?.homePageTitle}
                    </p>
                    <p className="m-2 text-base">
                      Baner Title <span> : </span>
                      {home?.banerTitle}
                    </p>
                    <p className="m-2 text-base">
                      baner Description <span> : </span>
                      {home?.banerDescription}
                    </p> */}

                    <div className="mb-3 ">
                      <div className="mx-auto mt-6 rounded-md">
                        <p> baner Images</p>
                        <div className="flex gap-4">
                          {home?.banerImages.map((img, index) => {
                            return (
                              <div key={index}>
                                <img
                                  src={baseUrl + img}
                                  className=" object-contain h-28 w-64 block rounded-md"
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>{" "}
                    </div>

                    <div className="border-b mt-20"></div>
                    <p className="mx-2 my-4 text-lg">features</p>
                    <div className="flex gap-4 ">
                      {home?.feature?.map((el) => {
                        return (
                          <>
                            <div className="mb-3 ">
                              <div className="h-28 w-28 mx-auto mt-6 rounded-md">
                                <img
                                  src={baseUrl + el?.featureImage}
                                  className=" object-contain h-full w-full block rounded-md"
                                />
                              </div>

                              <div className="mt-8 text-center">
                                {el?.featureTitle}
                              </div>


                              <div className="my-3">
                                {el?.featureDescription}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="border-b mt-20"></div>
                    <p className="mx-2 my-4 text-lg">Why Use Arshit</p>
                    <div className="mb-3 ">
                      <div className="h-48 w-48 mt-6 rounded-md">
                        <img
                          src={baseUrl + home?.higlightProductImage}
                          className=" object-contain h-full w-full block rounded-md"
                        />
                      </div>
                      <div className="mt-8 text-center">
                        {home?.higlightProductTitle}
                      </div>
                      <div className="my-3">{home?.higlightProductfeature}</div>
                      <div className="my-3">
                        {home?.higlightProductDescription}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center my-10">
                    Home Page Data Not Found
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

export default HomeData;
