import React, { useState, useRef, useCallback } from "react";
import { Button } from "react-bootstrap";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 250,
  height: 200,
  facingMode: { exact: "environment" },
};

const WebcamCapture = () => {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState("");
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  // const uploadVideo = async e => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append('file', files[0]);
  //   data.append('upload_preset', 'test_preset');
  //   setLoading(true);

  //   const response = fetch("https://api.cloudinary.com/v1_1/return-to-form-cloud", {
  //     method: "POST",
  //     body: data
  //   });

  //   const parseRes = await response();

  //   console.log(parseRes);
  // };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);
  
  return (
    <div className="webcamCapture">
      <Webcam 
        audio={false} 
        height={videoConstraints.height}
        ref={webcamRef} 
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <Button 
        className="webcamCapture-button"
        onClick={capture}
        size={28}
      >
        Screenshot
      </Button>
      <img src={image} alt="" />
    </div>
  );
};

export default WebcamCapture;