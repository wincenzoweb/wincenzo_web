import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icons from "@/components/ui/Icon";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import DonutChart from "@/components/partials/widget/chart/donut-chart";
import { meets, files } from "@/constant/data";
import SelectMonth from "@/components/partials/SelectMonth";
import TaskLists from "@/components/partials/widget/task-list";

import TrackingParcel from "@/components/partials/widget/activity";
import TeamTable from "@/components/partials/Table/team-table";
import CalendarView from "@/components/partials/widget/CalendarView";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { getProduct } from "../../store/features/product/productSlice";


import ProductReviewList from "./ProductReview/ProductReviewList";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  console.log(product)

  let Review = product?.ratings

  useEffect(() => {
    if (id) dispatch(getProduct(id));
  }, []);


  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-12 grid-cols-12 gap-5">
        <Card className="xl:col-span-6 col-span-12 lg:col-span-5 h-full">
          <span className="block dark:text-slate-400 text-sm text-slate-600">
            Product Image
          </span>
          <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 items-center justify-items-center bg-slate-50 dark:bg-slate-900 rounded-md p-4 mt-4">
            <div className="dark:bg-slate-700 rounded-md p-4">

              <img src={baseUrl + product?.thumbnailImage} alt="" className="w-44 h-44 object-contain aspect-auto	" />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-700 rounded-md p-4">

              {product?.galleryImages?.map((img) => {
                return (
                  <>
                    <img src={baseUrl + img} alt="" className="w-20 h-20 object-contain aspect-auto	" />
                  </>
                );
              })}
            </div>
          </div>
        </Card>
        {/* end single column*/}

        <Card
          title="Product Details"
          className="xl:col-span-6 col-span-12 lg:col-span-7 h-full"
        >
          <div>
            <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              {product?.name}{" "}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {product.description} .
            </p>
            <br />

            {/* end flex */}
            <div className="bg-slate-100 dark:bg-slate-700 rounded px-4 pt-4 pb-1 flex flex-wrap justify-between mt-6">
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Price
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  &#x20B9; {product?.price}
                </div>
              </div>
              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Category
                </div>
                <div className="flex text-xs text-slate-600 dark:text-slate-300 space-x-2 gap-2 items-center">
                  {product?.category?.name}
                </div>
              </div>
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Quantity
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {product?.quantity} PCS
                </div>
              </div>
              {/* end single */}

              {/* end single */}
              <div className="mr-3 mb-3 space-y-2">
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  Total Ratings
                </div>
                <div className="flex text-xs text-slate-600 dark:text-slate-300 space-x-2 gap-2 items-center">
                  <Icons icon={"fluent:star-16-regular"} />
                  {product?.ratings?.length}
                </div>
              </div>
              {/* end single */}
            </div>
          </div>
        </Card>
      </div>
      {Review && <ProductReviewList allReview={Review} productId={product?._id} />}
    </div>
  );
};

export default ProductDetails;
