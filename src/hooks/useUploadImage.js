import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
/* ====================================================== */

export default function useUploadImage() {
  const [photo, setPhoto] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "pictures/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("paused");
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        setPhoto("");
        setProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhoto(downloadURL);
          setProgress(0);
        });
      }
    );
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    handleUploadImage(file);
  };

  return {
    photo,
    setPhoto,
    progress,
    handleSelectImage,
  };
}
