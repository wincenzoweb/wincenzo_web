import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateReviewVideo, getReviewVideo, closeEditModal } from "../../store/features/Video/VideoSlice";

const FormValidationSchema = yup.object({

});

const EditReviewVideo = () => {
  const { editModal, editItem } = useSelector((state) => state.video);
  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;
  console.log(editItem);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
    defaultValues: {
      reviewVideoTitle: editItem?.reviewVideoTitle || "",
      reviewVideoDescription: editItem?.reviewVideoDescription || "",
      reviewVideoThumbnail: null,
      reviewVideoUrl: null
    }
  });

  useEffect(() => {
    reset({
      reviewVideoTitle: editItem?.reviewVideoTitle || "",
      reviewVideoDescription: editItem?.reviewVideoDescription || "",
      reviewVideoThumbnail: null,
      reviewVideoUrl: null
    });
  }, [editItem]);

  const onSubmit = (data) => {

    const formData = new FormData();

    formData.append(`reviewVideoDescription`, data.reviewVideoDescription);
    formData.append(`reviewVideoTitle`, data.reviewVideoTitle);
    if (data.reviewVideoThumbnail && data.reviewVideoThumbnail[0] instanceof File) {
      formData.append(`reviewVideoThumbnail`, data.reviewVideoThumbnail[0]);
    } else {
      console.error(`review video thumbnail is not a valid File object`);
    }
    if (data.reviewVideoUrl && data.reviewVideoUrl[0] instanceof File) {
      formData.append(`reviewVideoUrl`, data.reviewVideoUrl[0]);
    } else {
      console.error(`review video url is not a valid File object`);
    }


    let data2 = {
      id: editItem?._id,
      formData: formData,
    };
    console.log(formData);


    dispatch(updateReviewVideo(data2));

    setTimeout(() => {
      dispatch(closeEditModal(false));
      dispatch(getReviewVideo());
      reset();
    }, 500);
  };

  return (
    <Modal
      title="Edit Review Video"
      activeModal={editModal}
      onClose={() => dispatch(closeEditModal(false))}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 "
        encType="multipart/form-data"
      >
        <label className="form-label">Review Video</label>
        <div className="mx-4 p-4 ">
          <div className="mb-4 ">
            <Textinput
              name={`reviewVideoTitle`}
              label={`Review video Title (max 25 letters)`}
              placeholder={`Review video Title`}
              register={register}
              type="text"
              maxlength="25"
            />
            <Textarea
              name={`reviewVideoDescription`}
              label={`Review video Description (max 35 letters)`}
              placeholder={`Review video Description`}
              register={register}
              type="text"
              maxlength="35"
            />

            <Textinput
              name={`reviewVideoThumbnail`}
              label={`Review video thumbnail`}
              placeholder={`Review video thumbnail`}
              register={register}
              type="file"
            />

            <Textinput
              name={`reviewVideoUrl`}
              label={`Review video`}
              placeholder={`Review video`}
              register={register}
              type="file"
            />
          </div>
        </div>

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center" type="submit">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditReviewVideo;
