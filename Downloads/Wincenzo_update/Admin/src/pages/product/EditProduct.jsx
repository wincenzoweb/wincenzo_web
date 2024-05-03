import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import Flatpickr from "react-flatpickr";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import FormGroup from "@/components/ui/FormGroup";
import avatar1 from "@/assets/images/avatar/av-1.svg";
import avatar2 from "@/assets/images/avatar/av-2.svg";
import avatar3 from "@/assets/images/avatar/av-3.svg";
import avatar4 from "@/assets/images/avatar/av-4.svg";
import {
  editProducts,
  getProducts,
  toggleEditModal,
} from "../../store/features/product/productSlice";
import { getCategories } from "../../store/features/category/categorySlice";
import DropZone from "../forms/file-input/DropZone";
import { resetImageState } from "../../store/features/image/imageSlice";
import Fileinput from "../../components/ui/Fileinput";

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

const EditProduct = () => {
  const { editModal, editItem } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [selectedFiles2, setSelectedFiles2] = useState([]);

  const { categories } = useSelector((state) => state.category);
  const images = useSelector((state) => state.image?.images[0]);

  let options = [];

  categories?.forEach((element) => {
    options.push({ value: element?._id, label: element.name });
  });



  // useEffect(() => {
  //   reset(editItem);
  // }, [editItem]);

  useEffect(() => {
    reset(editItem);
    if (editItem?.category) {
      setValue("category", { label: editItem.category.name, value: editItem.category._id });
    }
  }, [editItem]);


  useEffect(() => {
    dispatch(getCategories());
  }, []);



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
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),

    mode: "all",
  });



  const onSubmit = (data) => {
    console.log(data)
    const {
      name,
      description,
      category,
      quantity,
      price,
      offerPrice,
      thumbnailImage,
      galleryImages,
    } = data;



    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category?.value);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("quantity", quantity);
    formData.append("thumbnailImage", images ? images : thumbnailImage);

    selectedFiles2
      ? selectedFiles2.forEach((file) => {
        formData.append("galleryImages", file);
      })
      : formData.append("galleryImages", JSON.stringify(galleryImages));

    let data2 = {
      id: editItem?._id,
      formData: formData,
    };


    dispatch(editProducts(data2));

    setTimeout(() => {
      dispatch(resetImageState());
      dispatch(getProducts());
      dispatch(toggleEditModal(false));
      reset();
    }, 300);
  };

  return (
    <Modal
      title="Edit Product"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <FormGroup error={errors.name}>
          <input
            type="text"
            defaultValue={editItem.name}
            className="form-control py-2"
            {...register("name")}
          />
        </FormGroup>
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
            )
            }
          />
          <div className="text-sm mt-2 mx-4">
            <span className="text-slate-500 dark:text-slate-300 inline-block mr-3">
              Previous category:
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-semibold">
              {editItem?.category?.name}
            </span>
          </div>
          {errors.category && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.category?.message || errors.category?.label.message}
            </div>
          )}
        </div>

        <FormGroup error={errors.price}>
          <label htmlFor="price">Offer Price</label>
          <input
            type="number"
            name="price"
            defaultValue={editItem.price}
            className="form-control py-2"
            {...register("price")}
          />
        </FormGroup>
        <FormGroup error={errors.offerPrice}>
          <label htmlFor="offerPrice">Price</label>
          <input
            type="number"
            name="offerPrice"
            defaultValue={editItem.offerPrice}
            className="form-control py-2"
            {...register("offerPrice")}
          />
        </FormGroup>

        <Textarea
          name={"description"}
          register={register}
          label="Description"
          defaultValue={editItem?.description}
          placeholder="Description"
        />
        <FormGroup error={errors.quantity}>
          <input
            type="number"
            defaultValue={editItem.quantity}
            className="form-control py-2"
            {...register("quantity")}
          />
        </FormGroup>

        <div className={errors.thumbnailImage ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Thumbnail Image
          </label>
          <Controller
            name="thumbnailImage"
            control={control}
            render={({ field }) => <DropZone img={editItem?.thumbnailImage} />}
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
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProduct;
