import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateAdvertisementVideo, getAdvertisementVideo, closeEditModal } from "../../store/features/Video/VideoSlice";

const FormValidationSchema = yup.object({

});

const EditAdvertisementVideo = () => {
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
            advertisementVideoTitle: editItem?.advertisementVideoTitle || "",
            advertisementVideoDescription: editItem?.advertisementVideoDescription || "",
            advertisementVideoThumbnail: null,
            advertisementVideoUrl: null
        }
    });

    useEffect(() => {
        reset({
            advertisementVideoTitle: editItem?.advertisementVideoTitle || "",
            advertisementVideoDescription: editItem?.advertisementVideoDescription || "",
            advertisementVideoThumbnail: null,
            advertisementVideoUrl: null
        });
    }, [editItem]);

    const onSubmit = (data) => {

        const formData = new FormData();

        formData.append(`advertisementVideoDescription`, data.advertisementVideoDescription);
        formData.append(`advertisementVideoTitle`, data.advertisementVideoTitle);
        if (data.advertisementVideoThumbnail && data.advertisementVideoThumbnail[0] instanceof File) {
            formData.append(`advertisementVideoThumbnail`, data.advertisementVideoThumbnail[0]);
        } else {
            console.error(`advertisement video thumbnail is not a valid File object`);
        }
        if (data.advertisementVideoUrl && data.advertisementVideoUrl[0] instanceof File) {
            formData.append(`advertisementVideoUrl`, data.advertisementVideoUrl[0]);
        } else {
            console.error(`advertisement video url is not a valid File object`);
        }


        let data2 = {
            id: editItem?._id,
            formData: formData,
        };
        console.log(formData);


        dispatch(updateAdvertisementVideo(data2));

        setTimeout(() => {
            dispatch(closeEditModal(false));
            dispatch(getAdvertisementVideo());
            reset();
        }, 500);
    };

    return (
        <Modal
            title="Edit Advertisement Video"
            activeModal={editModal}
            onClose={() => dispatch(closeEditModal(false))}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 "
                encType="multipart/form-data"
            >
                <label className="form-label">Advertisement Video</label>
                <div className="mx-4 p-4 ">
                    <div className="mb-4 ">
                        <Textinput
                            name={`advertisementVideoTitle`}
                            label={`Advertisement video Title (max 25 letters)`}
                            placeholder={`Advertisement video Title`}
                            register={register}
                            type="text"
                            maxlength="25"
                        />
                        <Textarea
                            name={`advertisementVideoDescription`}
                            label={`Advertisement video Description (max 35 letters)`}
                            placeholder={`Advertisement video Description`}
                            register={register}
                            type="text"
                            maxlength="35"
                        />

                        <Textinput
                            name={`advertisementVideoThumbnail`}
                            label={`Advertisement video thumbnail`}
                            placeholder={`Advertisement video thumbnail`}
                            register={register}
                            type="file"
                        />

                        <Textinput
                            name={`advertisementVideoUrl`}
                            label={`Advertisement video`}
                            placeholder={`Advertisement video`}
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

export default EditAdvertisementVideo;
