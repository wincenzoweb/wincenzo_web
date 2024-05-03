import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";

const AboutData = ({ about }) => {
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  console.log("about", about);
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">About Page</h4>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              {about !== null && about !== undefined ? (
                <>
                  <div className="m-5">
                    <p className="mx-2 text-lg">Title</p>
                    <div className="mb-3 ">
                      <p className="mx-3">{about?.title}</p>
                    </div>
                    <p className="mx-2 text-lg">Description</p>
                    <div className="mb-3 ">
                      <p className="mx-3">{about?.description}
                      </p>
                    </div>

                    <p className="mx-2 text-lg">Products</p>
                    <div className="flex gap-4 ">
                      {about?.products?.map((el) => {
                        return (
                          <>
                            <div className="mb-3 ">
                              <div className="h-[200px] w-[200px] mx-auto mt-6 rounded-md">
                                <p className="text-center"> {el?.name}</p>
                                <img
                                  src={baseUrl + el?.thumbnailImage}
                                  className=" object-contain h-full w-full block rounded-md"
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="border-b mt-20"></div>
                    <p className="mx-2 my-4 text-lg">Certificates</p>
                    <div className="flex gap-4 ">
                      {about?.certificate?.map((el) => {
                        return (
                          <>
                            <div className="mb-3 ">
                              <div className="h-[400px] w-[400px] mx-auto mt-6 rounded-md">
                                <p className="text-center">
                                  {" "}
                                  {el?.certificateSmallTitle}
                                </p>
                                <img
                                  src={baseUrl + el?.certificateImage}
                                  className=" object-contain h-full w-full block rounded-md"
                                />
                              </div>
                              <div className="mt-8 text-center">
                                {el?.certificateTitle}
                              </div>
                              <div className="my-3">
                                {el?.certificateDescription}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center my-10">
                    About Data Not Found
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

export default AboutData;
