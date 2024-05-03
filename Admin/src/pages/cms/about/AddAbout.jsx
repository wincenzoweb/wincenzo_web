import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addAbout, getAbout, openAddModal } from "../../../store/features/cms";
import Fileinput from "../../../components/ui/Fileinput";
import { getProducts } from "../../../store/features/product/productSlice";
import Select from "react-select";

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
const FormValidationSchema = yup
  .object({
    // description: yup.string().required("Description is required"),
  })
  .required();

const AddAbout = ({ options }) => {
  const { addModal } = useSelector((state) => state.page);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificate",
  });
  const onSubmit = (data) => {
    
    const formData = new FormData();

    // Append products data
    formData.append("products", JSON.stringify(data.products));
    formData.append("title", data.title);
    formData.append("description", data.description);

    // Append each certificate
    data?.certificate.forEach((certificate, index) => {
      formData.append(
        `certificateTitle[${index}]`,
        certificate.certificateTitle
      );
      formData.append(
        `certificateDescription[${index}]`,
        certificate.certificateDescription
      );
      formData.append(
        `certificateSmallTitle[${index}]`,
        certificate.certificateSmallTitle
      );

      // Check if certificateImage exists and is a File object
      if (
        certificate.certificateImage &&
        certificate.certificateImage[0] instanceof File
      ) {
        formData.append(`certificateImage`, certificate.certificateImage[0]);
      } else {
        console.error(`Certificate image[${index}] is not a valid File object`);
      }
    });

    dispatch(addAbout(formData));
    setTimeout(() => {
      dispatch(getAbout());
      dispatch(openAddModal(false));
      reset();
    }, 500);
  };
  return (
    <div>
      <Modal
        title="Add About"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        className="max-w-5xl"
        onClose={() => dispatch(openAddModal(false))}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 "
          enctype="multipart/form-data"
        >
          <Textinput
            name={`title`}
            label={`About Title `}
            placeholder={` About Title `}
            register={register}
            type="text"
          />
          <Textarea
            name={`description`}
            label={`About Description `}
            placeholder={` About Description `}
            register={register}
            type="text"
          />
          <div className={errors.products ? "has-error" : ""}>
            <label className="form-label" htmlFor="mul_1">
              Product
            </label>
            <Controller
              name="products"
              control={control}
              render={({ field }) => (
                <Select
                  isClearable={false}
                  // defaultValue={[fruits[2], fruits[3]]}
                  styles={styles}
                  isMulti
                  name="products"
                  options={options}
                  className="react-select"
                  classNamePrefix="select"
                  id="mul_1"
                  onChange={(selectedOptions) => {
                    setValue(
                      "products",
                      selectedOptions.map((option) => option.value)
                    ); // Set the value of "products" field
                  }}
                />
              )}
            />
            {errors.products && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {errors.products?.message || errors.products?.label.message}
              </div>
            )}
          </div>
          <label className="form-label">Certificates</label>
          <div className="mx-4 p-4 ">
            {fields.map((item, index) => (
              <div key={item.id} className="border-b mb-4 ">
                <Textinput
                  name={`certificate[${index}].certificateTitle`}
                  label={`Certificate Title ${index}`}
                  placeholder={` Certificate Title ${index}`}
                  register={register}
                  type="text"
                />
                <Textarea
                  name={`certificate[${index}].certificateDescription`}
                  label={`Certificate Description ${index}`}
                  placeholder={` Certificate Description ${index}`}
                  register={register}
                  type="text"
                />

                <Textinput
                  name={`certificate[${index}].certificateSmallTitle`}
                  label={`Certificate Small Title ${index}`}
                  placeholder={` Certificate Small Title ${index}`}
                  register={register}
                  type="text"
                />
                <Textinput
                  name={`certificate[${index}].certificateImage`}
                  label={`Certificate Image ${index}`}
                  placeholder={` Certificate Image ${index}`}
                  register={register}
                  type="file"
                />

                {/* Display error messages if needed */}
                <div className="my-3">
                  <button
                    type="button"
                    className="btn btn-dark py-2 px-4  text-center"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="my-3">
              <button
                type="button"
                className="btn btn-dark  py-2 px-4 text-center"
                onClick={() => append({})}
              >
                Add Certificate
              </button>
            </div>
          </div>

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddAbout;
