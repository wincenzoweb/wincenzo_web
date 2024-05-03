
import React from 'react';
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import { useDispatch } from "react-redux";
import { deleteReviewVideo, getReviewVideo, updateVideo } from "../../store/features/Video/VideoSlice";

export const ReviewVideoGrid = ({ reviewVideo }) => {

    const { reviewVideoUrl, reviewVideoThumbnail, reviewVideoTitle, reviewVideoDescription } = reviewVideo;

    const dispatch = useDispatch();
    const baseUrl = import.meta.env.VITE_BASE_IMG_URL;

    return (
        <Card>

            <div className="mb-0.5 relative rounded-md overflow-hidden">
                <div className="aspect-video">
                    <video preload="none" controls controlsList="nofullscreen nodownload" poster={baseUrl + reviewVideoThumbnail} className="absolute inset-0 w-full h-full object-cover">
                        <source src={baseUrl + reviewVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <span className="block date-text">{reviewVideoTitle} </span>
                </div>
                <div>
                    <Dropdown
                        classMenuItems="w-[130px]"
                        label={
                            <span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400">
                                <Icon icon="heroicons-outline:dots-vertical" />
                            </span>
                        }
                    >
                        <div>
                            <Menu.Item onClick={() => dispatch(updateVideo(reviewVideo))}>
                                <div className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm dark:text-slate-300 last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center capitalize rtl:space-x-reverse">
                                    <span className="text-base">
                                        <Icon icon="heroicons-outline:pencil-alt" />
                                    </span>
                                    <span>Edit</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    dispatch(deleteReviewVideo(reviewVideo._id));

                                    setTimeout(() => {
                                        dispatch(getReviewVideo());
                                    }, 300);
                                }}
                            >
                                <div className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm dark:text-slate-300 last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center capitalize rtl:space-x-reverse">
                                    <span className="text-base">
                                        <Icon icon="heroicons-outline:trash" />
                                    </span>
                                    <span>Delete</span>
                                </div>
                            </Menu.Item>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <div>
                <span className="block date-text">{reviewVideoDescription}</span>
            </div>
        </Card>
    )
}

