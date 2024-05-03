import React from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { addAdvertisementVideo, getAdvertisementVideo, openAddModal } from "../../store/features/Video/VideoSlice";

const AdvertisementVideoFormSchema = yup.object().shape({
    advertisementVideoTitle: yup.string().required("Video Title is required"),
    advertisementVideoDescription: yup.string().required("Video Description is required"),
    advertisementVideoThumbnail: yup.mixed().required("Video Thumbnail is required"),
    advertisementVideoUrl: yup.mixed().required("Video URL is required"),
});

const AddAdvertisementVideo = () => {
    const { addModal } = useSelector((state) => state.video);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(AdvertisementVideoFormSchema),
        mode: "all",
    });

    const onSubmit = (data) => {

        const formData = new FormData();

        formData.append(`advertisementVideoTitle`, data.advertisementVideoTitle);
        formData.append(`advertisementVideoDescription`, data.advertisementVideoDescription);
        formData.append(`advertisementVideoThumbnail`, data.advertisementVideoThumbnail[0]);
        formData.append(`advertisementVideoUrl`, data.advertisementVideoUrl[0]);

        dispatch(addAdvertisementVideo(formData));
        setTimeout(() => {
            dispatch(getAdvertisementVideo());
            dispatch(openAddModal(false));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Add Advertisement Video"
                labelclassName="btn-outline-dark"
                activeModal={addModal}
                className="max-w-5xl"
                onClose={() => dispatch(openAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 " encType="multipart/form-data">
                    <label className="form-label">Advertisement Video</label>
                    <div className="mx-4 p-4 ">
                        <div className="border-b mb-4 ">
                            <Textinput
                                name={`advertisementVideoTitle`}
                                label={`Video Title`}
                                placeholder={`Video Title`}
                                register={register}
                                type="text"
                            />
                            {errors.advertisementVideoTitle && <p className="text-red-500">{errors.advertisementVideoTitle.message}</p>}
                            <Textarea
                                name={`advertisementVideoDescription`}
                                label={`Video Description`}
                                placeholder={`Video Description`}
                                register={register}
                                type="text"
                            />
                            {errors.advertisementVideoDescription && <p className="text-red-500">{errors.advertisementVideoDescription.message}</p>}
                            <Textinput
                                name={`advertisementVideoThumbnail`}
                                label={`Video Thumbnail`}
                                placeholder={`Video Thumbnail`}
                                register={register}
                                type="file"
                            />
                            {errors.advertisementVideoThumbnail && <p className="text-red-500">{errors.advertisementVideoThumbnail.message}</p>}
                            <Textinput
                                name={`advertisementVideoUrl`}
                                label={`Video URL`}
                                placeholder={`Video URL`}
                                register={register}
                                type="file"
                            />
                            {errors.advertisementVideoUrl && <p className="text-red-500">{errors.advertisementVideoUrl.message}</p>}
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

export default AddAdvertisementVideo;
