import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../styles/ImageUploader.module.css";

const ImageUploader = ({
  setImageURLs,
  shouldStartUploadingImages,
  setImagesAreSelected,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [fileSizes, setFileSizes] = useState([]);

  useEffect(() => {
    console.log("ddddd");
    if (shouldStartUploadingImages) handleUploadPics();
  }, [shouldStartUploadingImages]);

  const handleFileInput = (e) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const validSize = 8 * 1024 * 1024; // 8MB
    const files = Array.from(e.target.files).filter(
      (file) =>
        validTypes.includes(file.type) &&
        file.size < validSize &&
        selectedImages.length < 5 // max 5 files
    );
    setSelectedImages([...selectedImages, ...files]);
    const names = files.map((file) => file.name);
    const sizes = files.map((file) => file.size);
    setFileNames([...fileNames, ...names]);
    setFileSizes([...fileSizes, ...sizes]);
    if (files.length > 0) {
      setImagesAreSelected(true);
    } else {
      setImagesAreSelected(false);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = [...selectedImages];
    updatedFiles.splice(indexToRemove, 1);
    setSelectedImages(updatedFiles);
    const updatedNames = [...fileNames];
    updatedNames.splice(indexToRemove, 1);
    setFileNames(updatedNames);
    const updatedSizes = [...fileSizes];
    updatedSizes.splice(indexToRemove, 1);
    setFileSizes(updatedSizes);
  };

  const handleUploadPics = () => {
    console.log("uploading picsatm");
    let imageUrls: string[] = [];
    for (let i = 0; i < selectedImages.length; i++) {
      const imageRef = ref(storage, fileNames[i] + "@" + uuidv4());
      uploadBytes(imageRef, selectedImages[i])
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              imageUrls.push(url);
              if (i == selectedImages.length - 1) setImageURLs(imageUrls);
            })
            .catch((err) => console.log("error geting url", err));
        })
        .catch((err) => console.log("error geting url", err));
    }
  };

  return (
    <div>
      <div>
        <ul className={styles.fileMetadataWrapper}>
          {fileNames.map((name, index) => (
            <li className={styles.fileMetadata} key={uuidv4()}>
              {name} ({(fileSizes[index] / (1024 * 1024)).toFixed(2)} MB)
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveFile(index)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </div>
      {fileNames?.length > 0 && <hr />}
      <input type="file" multiple onChange={handleFileInput} accept="image/*" />
    </div>
  );
};

export default ImageUploader;
