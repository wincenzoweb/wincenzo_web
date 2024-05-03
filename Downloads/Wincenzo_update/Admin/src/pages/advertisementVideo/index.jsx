import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/ui/Button";

import GridLoading from "@/components/skeleton/Grid";
import TableLoading from "@/components/skeleton/Table";
import { ToastContainer } from "react-toastify";
import Pagination from "../../components/ui/Pagination";

import { openAddModal, getAdvertisementVideo } from "../../store/features/Video/VideoSlice";


import { AdvertisementVideoGrid } from "./AdvertisementVideoGrid";
import AddAdvertisementVideo from "./addAdvertisementVideo";
import EditAdvertisementVideo from "./EditAdvertisementVideo";

const AdvertisementVideoPage = () => {
    const [filler, setfiller] = useState("grid");
    const { width, breakpoints } = useWidth();
    const [isLoaded, setIsLoaded] = useState(false);

    const { advertisementVideos } = useSelector((state) => state.video);

    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 9; // Number of products per page
    const totalPages = Math.ceil(advertisementVideos.length / videosPerPage);
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentAdvertisementVideos = advertisementVideos.slice(indexOfFirstVideo, indexOfLastVideo);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdvertisementVideo());
    }, [dispatch]);

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
                    Advertisement Video
                </h4>
                <div
                    className={`${width < breakpoints.md ? "space-x-rb" : ""
                        } md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                >
                    <Button
                        icon="heroicons-outline:plus"
                        text="Add Advertisement Video"
                        className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                        iconClass=" text-lg"
                        onClick={() => dispatch(openAddModal(true))}
                    />
                </div>
            </div>

            {isLoaded && filler === "grid" && <TableLoading count={advertisementVideos?.length} />}

            {filler === "grid" && !isLoaded && (
                <>
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                        {currentAdvertisementVideos.map((video, videoIndex) => (
                            <AdvertisementVideoGrid advertisementVideo={video} key={videoIndex} />
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
            <AddAdvertisementVideo />
            <EditAdvertisementVideo />
        </div>
    );
};

export default AdvertisementVideoPage;
