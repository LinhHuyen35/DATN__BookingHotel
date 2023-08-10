import AddPhotoModal from 'module/modal/addPhotoModal';
import React, { useState } from 'react';

const ImageGallery = ({ setImageUrl, imageUrl }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      {isVisible && (
        <AddPhotoModal
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          setIsVisible={setIsVisible}
        />
      )}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 h-[300px] shadow-secondShadow">
        <div
          className="flex items-center justify-center col-span-2 row-span-2 cursor-pointer bg-red"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Add Photos
        </div>
        <div
          className="flex items-center justify-center bg-white cursor-pointer"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Add Photos
        </div>
        <div
          className="flex items-center justify-center bg-white cursor-pointer"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Add Photos
        </div>
        <div
          className="flex items-center justify-center bg-white cursor-pointer"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Add Photos
        </div>
        <div
          className="flex items-center justify-center bg-white cursor-pointer"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Add Photos
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
