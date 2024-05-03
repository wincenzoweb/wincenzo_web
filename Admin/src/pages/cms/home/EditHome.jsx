import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Icon from "@/components/ui/Icon";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  editHome,
  getHome,
  toggleEditModal,
} from "../../../store/features/cms";

const FormValidationSchema = yup.object({

}).required();

const EditHome = () => {
  const [brandImageRemove, setBrandImageRemove] = useState([]);
  const [featureItemRemove, setFeatureItemRemove] = useState([]);
  const [advertisementItemRemove, setAdvertisementItemRemove] = useState([]);
  const [banerImagesRemove, setBanerImagesRemove] = useState([]);
  const [higlightProductFeatureRemove, setHiglightProductFeatureRemove] = useState([]);

  const { editModal, editItem } = useSelector((state) => state.page);
  // const [Brand, setBrand] = useState([]);

  console.log(editItem)

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
  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "feature",
  });
  const {
    fields: brandImageFields,
    append: appendBrandImage,
    remove: removeBrandImage,
  } = useFieldArray({
    control,
    name: "brandImage",
  });

  const {
    fields: higlightProductFeatureFields,
    append: appendHiglightProductFeature,
    remove: removeHiglightProductFeature,
  } = useFieldArray({
    control,
    name: "higlightProductFeature",
  });

  const {
    fields: advertisementFields,
    append: appendAdvertisement,
    remove: removeAdvertisement,
  } = useFieldArray({
    control,
    name: "advertisement",
  });

  const {
    fields: banerImageFields,
    append: appendBanerImage,
    remove: removeBanerImage,
  } = useFieldArray({
    control,
    name: "banerImages",
  });


  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    // Append products data

    formData.append("homePageTitle", data.homePageTitle);
    formData.append("banerTitle", data.banerTitle);
    formData.append("banerDescription", data.banerDescription);
    formData.append("higlightProductTitle", data.higlightProductTitle);
    formData.append(
      "higlightProductDescription",
      data.higlightProductDescription
    );
    formData.append(
      "higlightProductImage",
      (data.higlightProductImage && data.higlightProductImage[0] instanceof File)
        ? data.higlightProductImage[0]
        : editItem.higlightProductImage
    );
    formData.append("higlightProductImageOld", editItem?.higlightProductImage);

    // formData.append(
    //   "videoUrl",
    //   data.videoUrl && data.videoUrl[0] instanceof File
    //     ? data.videoUrl[0]
    //     : editItem.videoUrl
    // );
    // formData.append("videoUrlOld", editItem?.videoUrl);
    formData.append("videoTitle", data.videoTitle);
    formData.append("videosDiscription", data.videosDiscription);
    formData.append("experienceTitle", data.experienceTitle);
    formData.append("experienceDescription", data.experienceDescription);
    formData.append("packageDelivered", data.packageDelivered);
    formData.append("countriesCovered", data.countriesCovered);
    formData.append("happyCustomer", data.happyCustomer);
    formData.append("yearOfExperience", data.yearOfExperience);
    formData.append("topOfferLine", data.topOfferLine);

    // Append each certificate
    data?.feature.forEach((feature, index) => {
      formData.append(
        `featureDescription[${index}]`,
        feature.featureDescription
      );
      formData.append(`featureTitle[${index}]`, feature.featureTitle);

      // Check if certificateImage exists and is a File object
      if (feature.featureImage && feature.featureImage[0] instanceof File) {
        formData.append(`featureImage`, feature.featureImage[0]);
      } else {
        console.error(`feature image[${index}] is not a valid File object`);
      }
    });

    editItem?.banerImages
      ? formData.append(`banerImagesOld`, JSON.stringify(editItem.banerImages))
      : "";
    editItem?.brandImage
      ? formData.append(`brandImageOld`, JSON.stringify(editItem.brandImage))
      : "";
    editItem?.feature
      ? formData.append(`featureOld`, JSON.stringify(editItem.feature))
      : "";
    editItem?.advertisement
      ? formData.append(`advertisementOld`, JSON.stringify(editItem.advertisement))
      : "";
    editItem?.advertisement
      ? formData.append(`higlightProductFeatureOld`, JSON.stringify(editItem.higlightProductFeature))
      : "";

    formData.append(`banerImagesRemove`, JSON.stringify(banerImagesRemove));
    formData.append(`brandImageRemove`, JSON.stringify(brandImageRemove));
    formData.append(`featureItemRemove`, JSON.stringify(featureItemRemove));
    formData.append(`advertisementItemRemove`, JSON.stringify(advertisementItemRemove));
    formData.append(`higlightProductFeatureRemove`, JSON.stringify(higlightProductFeatureRemove));

    data?.banerImages.forEach((banerImages, index) => {
      // Check if certificateImage exists and is a File object

      if (banerImages && banerImages[0] instanceof File) {
        formData.append(`banerImages`, banerImages[0]);
      } else {
        console.error(`banerImages image[${index}] is not a valid File object`);
      }
    });

    data?.brandImage.forEach((brandImage, index) => {
      // Check if certificateImage exists and is a File object

      if (brandImage && brandImage[0] instanceof File) {
        formData.append(`brandImage`, brandImage[0]);
      } else {
        console.error(`brandImage image[${index}] is not a valid File object`);
      }
    });

    data?.advertisement.forEach((advertisement, index) => {
      formData.append(
        `advertisVideoDescription[${index}]`,
        advertisement.advertisVideoDescription
      );
      formData.append(`advertisVideoTitle[${index}]`, advertisement.advertisVideoTitle);

      if (advertisement.advertisVideoThumbnail && advertisement.advertisVideoThumbnail[0] instanceof File) {
        formData.append(`advertisVideoThumbnail`, advertisement.advertisVideoThumbnail[0]);
      } else {
        console.error(`advertisement videourl[${index}] is not a valid File object`);
      }

      if (advertisement.advertisVideoUrl && advertisement.advertisVideoUrl[0] instanceof File) {
        formData.append(`advertisVideoUrl`, advertisement.advertisVideoUrl[0]);
      } else {
        console.error(`advertisement videourl[${index}] is not a valid File object`);
      }
    });

    data?.higlightProductFeature.forEach((higlightProductFeature, index) => {

      formData.append(`productFeature[${index}]`, higlightProductFeature.productFeature);

      if (higlightProductFeature.productFeatureThumb && higlightProductFeature.productFeatureThumb[0] instanceof File) {
        formData.append(`productFeatureThumb`, higlightProductFeature.productFeatureThumb[0]);
      } else {
        console.error(`productFeatureThumb [${index}] is not a valid File object`);
      }
    });


    console.log(data);
    let data2 = {
      id: editItem?._id,
      formData: formData,
    };
    console.log(formData)
    console.log(data2)

    dispatch(editHome(data2));

    setTimeout(() => {
      dispatch(toggleEditModal(false));
      dispatch(getHome());
      reset();
    }, 500);
  };

  return (
    <Modal
      title="Edit Home"
      activeModal={editModal}
      onClose={() => dispatch(toggleEditModal(false))}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 "
        encType="multipart/form-data"
      >
        <Textinput
          name={`topOfferLine`}
          label={`top Offer Line (max 50 letter)`}
          placeholder={`top Offer Line`}
          register={register}
          type="text"
          maxlength="50"
        />
        {/* ############### Do not remove belowe field ################# */}
        {/* <Textinput
          name={`homePageTitle`}
          label={`home Page Title (max 12 letter)`}
          placeholder={`home Page Title`}
          register={register}
          type="text"
          maxlength="12"
        />
        <Textinput
          name={`banerTitle`}
          label={`Baner Title (max 35 letter)`}
          placeholder={`Baner Title`}
          register={register}
          type="text"
          maxlength="35"
        />

        <Textarea
          name={"banerDescription"}
          register={register}
          label="baner Description (max 180 letter)"
          placeholder="baner Description"
          maxlength="180"
        />
        <Textinput
          name={`banerImages`}
          label={`Baner Image (600x600 pixels)`}
          placeholder={`banerImages`}
          register={register}
          type="file"
        />
        {errors.banerImages && (
          <small className="text-red-500">{errors.banerImages.message}</small>
        )} */}

        <label className="form-label">Baner Images</label>
        <div className="mx-4 p-4 ">
          {banerImageFields.map((item, index) => (
            <div key={item.id} className="border-b mb-4 ">
              <Textinput
                name={`banerImages[${index}]`}
                label={`Baner Image ${index + 1}`}
                placeholder={`Baner Image ${index}`}
                register={register}
                onChange={(event) => {
                  formik.setFieldValue(
                    `banerImages[${index}]`,
                    event.currentTarget.files[0]
                  );
                }}
                type="file"
              />

              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-dark py-2 px-4 text-center"
                  onClick={() => {
                    const { id, ...cleanItem } = item;

                    setBanerImagesRemove((prevItems) => [
                      ...prevItems,
                      Object.values(cleanItem).join(""),
                    ]);
                    removeBanerImage(index);
                  }}
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
              onClick={() => appendBanerImage({})}
            >
              Add Baner Image
            </button>
          </div>
        </div>

        <label className="form-label">Advertisement</label>
        <div className="mx-4 p-4 ">
          {advertisementFields.map((item, index) => (
            <div key={item.id} className="border-b mb-4 ">
              <Textinput
                name={`advertisement[${index}].advertisVideoTitle`}
                label={`advertisement video Title ${index + 1} (max 25 letter)`}
                placeholder={`advertisement video Title ${index}`}
                register={register}
                type="text"
                maxlength="25"
              />
              <Textarea
                name={`advertisement[${index}].advertisVideoDescription`}
                label={`advertisement video Description ${index + 1} (max 35 letter)`}
                placeholder={`advertisement video Description ${index}`}
                register={register}
                type="text"
                maxlength="35"
              />

              <Textinput
                name={`advertisement[${index}].advertisVideoThumbnail`}
                label={`advertisement video thumbnail ${index + 1}`}
                placeholder={` advertisement video thumbnail ${index}`}
                register={register}
                type="file"
              />

              <Textinput
                name={`advertisement[${index}].advertisVideoUrl`}
                label={`advertisement video ${index + 1}`}
                placeholder={` advertisement video ${index}`}
                register={register}
                type="file"
              />

              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-dark py-2 px-4  text-center"
                  onClick={() => {
                    const { id, ...cleanItem } = item;

                    // console.log(item);
                    console.log(cleanItem);
                    // console.log(Object.values(item).join(""));
                    setAdvertisementItemRemove((prevItems) => [
                      ...prevItems,
                      cleanItem,
                    ]);

                    removeAdvertisement(index);
                  }}

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
              onClick={() => appendAdvertisement({})}
            >
              Add Advertisement
            </button>
          </div>
        </div>
        <label className="form-label">Features</label>
        <div className="mx-4 p-4 ">
          {featureFields.map((item, index) => (
            <div key={item.id} className="border-b mb-4 ">
              <Textinput
                name={`feature[${index}].featureTitle`}
                label={`feature Title ${index + 1} (max 25 letter)`}
                placeholder={` feature Title ${index}`}
                register={register}
                type="text"
                maxlength="25"
              />
              <Textarea
                name={`feature[${index}].featureDescription`}
                label={`feature Description ${index + 1} (max 35 letter)`}
                placeholder={` feature Description ${index}`}
                register={register}
                type="text"
                maxlength="35"
              />
              <Textinput
                name={`feature[${index}].featureImage`}
                label={`feature Image ${index + 1}`}
                placeholder={` feature Image ${index}`}
                register={register}
                type="file"
              />

              {/* Display error messages if needed */}
              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-dark py-2 px-4  text-center"
                  onClick={() => {
                    const { id, ...cleanItem } = item;

                    // console.log(item);
                    console.log(cleanItem);
                    // console.log(Object.values(item).join(""));
                    setFeatureItemRemove((prevItems) => [
                      ...prevItems,
                      cleanItem,
                    ]);

                    removeFeature(index);
                  }}
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
              onClick={() => appendFeature({})}
            >
              Add Feature
            </button>
          </div>
        </div>
        <label className="form-label">Brand Image</label>

        <div className="mx-4 p-4 ">
          {brandImageFields.map((item, index) => (
            <div key={item.id} className="border-b mb-4 ">
              <Textinput
                name={`brandImage[${index}]`}
                label={`brand Image ${index + 1}`}
                placeholder={` brand Image ${index}`}
                register={register}
                onChange={(event) => {
                  formik.setFieldValue(
                    `brandImage[${index}]`,
                    event.currentTarget.files[0]
                  );
                }}
                type="file"
              />

              {/* Display error messages if needed */}
              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-dark py-2 px-4  text-center"
                  onClick={() => {
                    const { id, ...cleanItem } = item;

                    setBrandImageRemove((prevItems) => [
                      ...prevItems,
                      Object.values(cleanItem).join(""),
                    ]);
                    removeBrandImage(index);
                  }}
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
              onClick={() => appendBrandImage({})}
            >
              Add Brand Image
            </button>
          </div>
        </div>
        <Textinput
          name={`higlightProductTitle`}
          label={`higlight Product Title (max 25 letter)`}
          placeholder={`higlight Product Title`}
          register={register}
          type="text"
          maxlength="25"
        />
        <Textarea
          name={`higlightProductDescription`}
          label={`higlight Product Description (max 128 letter)`}
          placeholder={`higlight Product Description`}
          register={register}
          type="text"
          maxlength="100"
        />
        <Textinput
          name={`higlightProductImage`}
          label={`higlight Product Image`}
          placeholder={`higlight Product Image`}
          register={register}
          type="file"
        />

        <label className="form-label">Highlight Product Feature</label>
        <div className="mx-4 p-4 ">
          {higlightProductFeatureFields.map((item, index) => (
            <div key={item.id} className="border-b mb-4 ">
              <Textinput
                name={`higlightProductFeature[${index}].productFeature`}
                label={`product Feature ${index + 1} (max 25 letter)`}
                placeholder={`product Feature ${index}`}
                register={register}
                type="text"
                maxlength="25"
              />

              <Textinput
                name={`higlightProductFeature[${index}].productFeatureThumb`}
                label={`Product Feature Thumb ${index + 1}`}
                placeholder={`Product Feature Thumb ${index}`}
                register={register}
                type="file"
              />

              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-dark py-2 px-4  text-center"
                  onClick={() => {
                    const { id, ...cleanItem } = item;

                    // console.log(item);
                    console.log(cleanItem);
                    // console.log(Object.values(item).join(""));
                    setHiglightProductFeatureRemove((prevItems) => [
                      ...prevItems,
                      cleanItem,
                    ]);

                    removeHiglightProductFeature(index);
                  }}

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
              onClick={() => appendHiglightProductFeature({})}
            >
              Add Product Feature
            </button>
          </div>
        </div>

        {/* <Textinput
          name={`videoUrl`}
          label={`video Url`}
          placeholder={`video Url`}
          register={register}
          type="file"
        /> */}
        <Textinput
          name={`videoTitle`}
          label={`video title (max 25 letter)`}
          placeholder={`video title`}
          register={register}
          type="text"
          maxlength="25"
        />

        <Textarea
          name={`videosDiscription`}
          label={`videos Discription (max 128 letter)`}
          placeholder={`videos Discription`}
          register={register}
          type="text"
          maxlength="128"
        />
        <Textinput
          name={`experienceTitle`}
          label={`experience Title (max 50 letter)`}
          placeholder={`experience Title`}
          register={register}
          type="text"
          maxlength="50"
        />

        <Textarea
          name={`experienceDescription`}
          label={`experience Description (max 128 letter)`}
          placeholder={`experience Description`}
          register={register}
          type="text"
          maxlength="128"
        />
        <label className="form-label">Experience</label>
        <Textinput
          name={`packageDelivered`}
          label={`package delivered (max 10 letter)`}
          placeholder={`package delivered`}
          register={register}
          type="text"
          maxlength="10"
        />
        <Textinput
          name={`countriesCovered`}
          label={`countries covered (max 10 letter)`}
          placeholder={`countries covered`}
          register={register}
          type="text"
          maxlength="10"
        />
        <Textinput
          name={`happyCustomer`}
          label={`happy customer (max 10 letter)`}
          placeholder={`happy customer`}
          register={register}
          type="text"
          maxlength="10"
        />
        <Textinput
          name={`yearOfExperience`}
          label={`years of experience (max 10 letter)`}
          placeholder={`years of experience`}
          register={register}
          type="text"
          maxlength="10"
        />
        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center" type="submit">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditHome;
