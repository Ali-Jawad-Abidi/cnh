import React, { useState } from "react";
import Compressor from "compressorjs";

const ImageGrid = (props) => {
  var images = props.images ? props.images : [];
  const [limit, setLimit] = useState(props.limit ? props.limit : 5);

  function handleImageUpload(e) {
    if (props.setImagesHaveChanged) props.setImagesHaveChanged(true);
    var imgs = Array.from(e.target.files);
    imgs = imgs.slice(0, props.limit ? props.limit : 5);

    imgs.map((file) => {
      new Compressor(file, {
        quality: 0.8,
        maxHeight: 720,
        maxWidth: 1280,
        mimeType: ["image/webp"], // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          var reader = new FileReader();
          reader.readAsDataURL(compressedResult);
          reader.onloadend = function () {
            var base64String = reader.result;
            props.setImages((oldArray) => [...oldArray, base64String]);
          };
        },
      });
    });

    if (props.setThumbnail) {
      new Compressor(imgs[0], {
        quality: 0.8,
        maxHeight: 200,
        maxWidth: 200,
        mimeType: ["image/webp"], // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult) => {
          var reader = new FileReader();
          reader.readAsDataURL(compressedResult);
          reader.onloadend = function () {
            var base64String = reader.result;
            props.setThumbnail(base64String);
          };
        },
      });
    }
  }

  const removeImage = (index) => {
    if (props.setImagesHaveChanged) props.setImagesHaveChanged(true);
    const updatedImages = images.filter((_, i) => i !== index);
    props.setImages(updatedImages);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute -top-1 -right-1 bg-white rounded-full"
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
        ))}
        {images.length < limit && (
          <div className="relative">
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="w-full h-auto bg-gray-200 flex justify-center items-center rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
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
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
