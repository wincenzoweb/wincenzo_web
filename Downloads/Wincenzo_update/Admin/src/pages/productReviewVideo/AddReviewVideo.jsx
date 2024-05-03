import React from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addReviewVideo, getReviewVideo, openAddModal } from "../../store/features/Video/VideoSlice";

const ReviewVideoFormSchema = yup.object().shape({
    reviewVideoTitle: yup.string().required("Video Title is required"),
    reviewVideoDescription: yup.string().required("Video Description is required"),
    reviewVideoThumbnail: yup.mixed().required("Video Thumbnail is required"),
    reviewVideoUrl: yup.mixed().required("Video URL is required"),
});

const AddReviewVideo = () => {
    const { addModal } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(ReviewVideoFormSchema),
        mode: "all",
    });

    const onSubmit = (data) => {

        const formData = new FormData();

        formData.append(`reviewVideoTitle`, data.reviewVideoTitle);
        formData.append(`reviewVideoDescription`, data.reviewVideoDescription);
        formData.append(`reviewVideoThumbnail`, data.reviewVideoThumbnail[0]);
        formData.append(`reviewVideoUrl`, data.reviewVideoUrl[0]);

      

        dispatch(addReviewVideo(formData));
        setTimeout(() => {
            dispatch(getReviewVideo());
            dispatch(openAddModal(false));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Add Review Video"
                labelclassName="btn-outline-dark"
                activeModal={addModal}
                className="max-w-5xl"
                onClose={() => dispatch(openAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 " encType="multipart/form-data">
                    <label className="form-label">Review Video</label>
                    <div className="mx-4 p-4 ">
                        <div className="border-b mb-4 ">
                            <Textinput
                                name={`reviewVideoTitle`}
                                label={`Video Title`}
                                placeholder={`Video Title`}
                                register={register}
                                type="text"
                            />
                            {errors.reviewVideoTitle && <p className="text-red-500">{errors.reviewVideoTitle.message}</p>}
                            <Textarea
                                name={`reviewVideoDescription`}
                                label={`Video Description`}
                                placeholder={`Video Description`}
                                register={register}
                                type="text"
                            />
                            {errors.reviewVideoDescription && <p className="text-red-500">{errors.reviewVideoDescription.message}</p>}
                            <Textinput
                                name={`reviewVideoThumbnail`}
                                label={`Video Thumbnail`}
                                placeholder={`Video Thumbnail`}
                                register={register}
                                type="file"
                            />
                            {errors.reviewVideoThumbnail && <p className="text-red-500">{errors.reviewVideoThumbnail.message}</p>}
                            <Textinput
                                name={`reviewVideoUrl`}
                                label={`Video URL`}
                                placeholder={`Video URL`}
                                register={register}
                                type="file"
                            />
                            {errors.reviewVideoUrl && <p className="text-red-500">{errors.reviewVideoUrl.message}</p>}
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

export default AddReviewVideo;
