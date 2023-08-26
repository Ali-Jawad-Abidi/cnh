import React, { useState, useRef } from "react";
import Compressor from "compressorjs";

const SingleImageUpload = (props) => {
  const [image, setImage] = useState(props.image);
  const imageRef = useRef(null);

  function handleImageUpload(e) {
    var img = e.target.files[0];

    new Compressor(img, {
      quality: 0.8,
      maxHeight: 720,
      maxWidth: 1280,
      mimeType: ["image/webp"],
      success: (compressedResult) => {
        var reader = new FileReader();
        reader.readAsDataURL(compressedResult);
        reader.onloadend = function () {
          var base64String = reader.result;
          setImage(base64String);
          if (props.onImageChange) props.onImageChange(base64String);
        };
      },
    });
  }

  const removeImage = () => {
    setImage(null);
    if (props.onImageChange) props.onImageChange(null);
  };

  return (
    <>
      {/* <div className="relative"> */}
      {image && (
        <div className="relative w-40 h-auto">
          <img
            src={image}
            alt={`Image of the brand/category`}
            className="w-full h-auto rounded"
          />
          <button
            onClick={() => removeImage()}
            className="absolute top-0 right-0 bg-white rounded-full -mt-2 -mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      {!image && (
        <div className="flex flex-col gap-2">
          <label htmlFor="image-upload" className="cursor-pointer w-32">
            <div className="w-12 p-2 h-auto bg-gray-200 flex flex-col justify-center items-center rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-32 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a9 9 0 100 18 9 9 0 000-18zM4 10a1 1 0 011-1h2V7a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H5a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>
          <p className="text-xs rounded-lg text-left text-white">Add Image</p>
        </div>
      )}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </>
    // </div>
  );
};

export default SingleImageUpload;
