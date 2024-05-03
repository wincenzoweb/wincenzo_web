import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";
import ProductGrid from "./ProductGrid";
import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
// import { toggleAddModal } from "./store";
import { ToastContainer } from "react-toastify";
import {
  getProducts,
  toggleAddModal,
} from "../../store/features/product/productSlice";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductList from "./ProductList";
import Pagination from "../../components/ui/Pagination";

const ProductPostPage = () => {
  const [filler, setfiller] = useState("grid");
  const { width, breakpoints } = useWidth();
  const [isLoaded, setIsLoaded] = useState(false);

  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Number of products per page
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1500);
  }, [filler]);

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
          Product
        </h4>
        <div
          className={`${width < breakpoints.md ? "space-x-rb" : ""
            } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
        >
          <Button
            icon="heroicons:list-bullet"
            text="List view"
            disabled={isLoaded}
            className={`${filler === "list"
              ? "bg-slate-900 dark:bg-slate-700  text-white"
              : " bg-white dark:bg-slate-800 dark:text-slate-300"
              }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("list")}
          />
          <Button
            icon="heroicons-outline:view-grid"
            text="Grid view"
            disabled={isLoaded}
            className={`${filler === "grid"
              ? "bg-slate-900 dark:bg-slate-700 text-white"
              : " bg-white dark:bg-slate-800 dark:text-slate-300"
              }   h-min text-sm font-normal`}
            iconClass=" text-lg"
            onClick={() => setfiller("grid")}
          />
          {/* <Button
            icon="heroicons-outline:filter"
            text="On going"
            className="bg-white dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-900 hover:text-white btn-md  h-min text-sm font-normal"
            iconClass=" text-lg"
          /> */}
          <Button
            icon="heroicons-outline:plus"
            text="Add Product"
            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
            iconClass=" text-lg"
            onClick={() => dispatch(toggleAddModal(true))}
          />
        </div>
      </div>
      {isLoaded && filler === "grid" && (
        <GridLoading count={products?.length} />
      )}
      {isLoaded && filler === "list" && (
        <TableLoading count={products?.length} />
      )}

      {filler === "grid" && !isLoaded && (
        <>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {currentProducts.map((product, productIndex) => (
              <ProductGrid product={product} key={productIndex} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              text={false}
              className="inline-flex"
            />
          </div>
        </>
      )}


      {filler === "list" && !isLoaded && (
        <div>
          <ProductList products={products} />
        </div>
      )}
      <AddProduct />
      <EditProduct />
    </div>
  );
};

export default ProductPostPage;
