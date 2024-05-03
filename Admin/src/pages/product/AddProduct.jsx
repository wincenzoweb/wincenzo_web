import React, { useEffect, useState } from "react";
import Select from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  addProducts,
  getProducts,
  toggleAddModal,
} from "../../store/features/product/productSlice";
import { getCategories } from "../../store/features/category/categorySlice";
import Fileinput from "../../components/ui/Fileinput";
import {
  AddImage,
  resetImageState,
} from "../../store/features/image/imageSlice";

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const AddProduct = () => {
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFiles2, setSelectedFiles2] = useState([]);

  const { openProductModal } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  let options = [];

  categories?.forEach((element) => {
    options.push({ value: element?._id, label: element.name });
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleFileChange2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };

  const handleFileChangeMultiple2 = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => file);
    setSelectedFiles2(filesArray);
  };

  const FormValidationSchema = yup
    .object({
      name: yup.string().required("Title is required"),
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log(data)
    const { name, description, category, quantity, price, offerPrice } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category?.value);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("quantity", quantity);
    formData.append("thumbnailImage", selectedFile2 ? selectedFile2 : "");

    selectedFiles2
      ? selectedFiles2.forEach((file) => {
        formData.append("galleryImages", file);
      })
      : "";
    console.log(formData)
    dispatch(addProducts(formData));

    setTimeout(() => {
      dispatch(resetImageState());
      dispatch(getProducts());
      reset();
      dispatch(toggleAddModal(false));
    }, 300);
  };

  return (
    <div>
      <Modal
        title="Create Project"
        labelclassName="btn-outline-dark"
        activeModal={openProductModal}
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="name"
            label="Product Name"
            placeholder="Product Name"
            register={register}
            error={errors.name}
          />

          <div className={errors.category ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Category
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  id="icon_s"
                />
              )}
            />
            {errors.category && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.category?.message || errors.category?.label.message}
              </div>
            )}
          </div>
          <Textinput
            type="number"
            name="price"
            label="Offer Price"
            placeholder="Product Price"
            register={register}
            error={errors.price}
          />
          <Textinput
            type="number"
            name="offerPrice"
            label="Price"
            placeholder="Product Offer Price"
            register={register}
            error={errors.offerPrice}
          />
          <Textarea
            name={"description"}
            label="Description"
            placeholder="Description"
            register={register}
            error={errors.description}
          />

          <Textinput
            type="number"
            name="quantity"
            label="Quantity"
            placeholder="Product Quantity"
            register={register}
            error={errors.quantity}
          />

          <div className={errors.thumbnailImage ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Thumbnail Image
            </label>
            <Controller
              name="thumbnailImage"
              control={control}
              render={({ field }) => (
                <Fileinput
                  selectedFile={selectedFile2}
                  onChange={handleFileChange2}
                  name={"thumbnailImage"}
                  preview
                />
              )}
            />
            {errors.thumbnailImage && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.thumbnailImage?.message ||
                  errors.thumbnailImage?.label.message}
              </div>
            )}
          </div>
          <div className={errors.thumbnailImage ? "has-error" : ""}>
            <label className="form-label" htmlFor="icon_s">
              Gallery Images
            </label>
            <Controller
              name="galleryImages"
              control={control}
              render={({ field }) => (
                <Fileinput
                  name="galleryImages"
                  selectedFiles={selectedFiles2}
                  onChange={handleFileChangeMultiple2}
                  multiple
                  preview
                />
              )}
            />
            {errors.galleryImages && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.galleryImages?.message ||
                  errors.galleryImages?.label.message}
              </div>
            )}
          </div>

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddProduct;
