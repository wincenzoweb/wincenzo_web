import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

// image import
import uploadSvgImage from "@/assets/images/svg/upload.svg";
import { useDispatch } from "react-redux";
import { AddImage } from "../../../store/features/image/imageSlice";
import { useEffect } from "react";

const DropZone = ({ img }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_IMG_URL;

  useEffect(() => {
    if (img) {
      setFiles([{ preview: img }]);
    }
  }, []);

  console.log(files);
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    accept: {
      "image/*": [],
    },

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      dispatch(AddImage(acceptedFiles));
      console.log(acceptedFiles);
    },
  });

  return (
    <div>
      <div className="w-full text-center border-dashed border border-secondary-500 rounded-md py-[52px] flex flex-col justify-center items-center">
        {files.length === 0 && (
          <div {...getRootProps({ className: "dropzone" })}>
            <input className="hidden" {...getInputProps()} />
            <img src={baseUrl + uploadSvgImage} alt="" className="mx-auto mb-4" />
            {isDragAccept ? (
              <p className="text-sm text-slate-500 dark:text-slate-300 ">
                Drop the files here ...
              </p>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-300 f">
                Drop files here or click to upload.
              </p>
            )}
          </div>
        )}
        <div className="flex space-x-4">
          <div {...getRootProps({ className: "dropzone" })}>
            <input className="hidden" {...getInputProps()} />
            {files?.map((file, i) => (
              <div key={i} className="mb-4 flex-none">
                <div className="h-[300px] w-[300px] mx-auto mt-6 rounded-md">
                  <img
                    src={baseUrl + file.preview}
                    className=" object-contain h-full w-full block rounded-md"
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
