
import axios from "axios";
import { baseUrl } from "../../configs/baseUrl";


const getReviewVideo = async () => {

    const res = await axios.get(`${baseUrl}reviewvideo`);
    return res.data;
};

const getAdvertisementVideo = async () => {

    const res = await axios.get(`${baseUrl}advertisementvideo`);
    return res.data;
  
  };



const VideoService = {
    getReviewVideo,
    getAdvertisementVideo,
};

export default VideoService;
