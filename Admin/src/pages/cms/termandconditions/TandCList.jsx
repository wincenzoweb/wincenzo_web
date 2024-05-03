import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";

const TandCList = ({ TermsAndConditions }) => {
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Terms And Conditions List</h4>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden  px-10">
              {TermsAndConditions !== null ? (
                <>
                  <div className="my-5">{TermsAndConditions?.description}</div>
                </>
              ) : (
                <>
                  <div className="flex justify-center my-10">
                    Terms And Conditions Not Found
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

export default TandCList;
