import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
/* ====================================================== */

export default function useUploadVideo() {
  const [video, setVideo] = useState("");
  const [progress, setProgess] = useState(0);

  const handleUploadVideo = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "videos/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgess(progressPercent);
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
        setVideo("");
        setProgess(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideo(downloadURL);
          setProgess(0);
        });
      }
    );
  };

  const selectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUploadVideo(file);
  };

  return {
    video,
    setVideo,
    progress,
    selectFile,
  };
}
