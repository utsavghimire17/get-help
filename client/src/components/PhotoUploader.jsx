import React, {useState} from "react";
import {ImageCapture} from "image-capture";

export default function PhotoUploader() {

    const [photo, setPhoto] = useState(null);

    const takePhoto = async () => {
        navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then( async (stream) => {
            const mediaStreamTrack = await stream.getVideoTracks()[0];
            const imageCapture = new imageCapture(mediaStreamTrack);
            console.log(imageCapture);
            return imageCapture.takePhoto();
        })
        .then(async (blob) => {
            const photoUrl = await URL.createObjectURL(blob);
            setPhoto(photoUrl);
            console.log(photo)
        })
        .catch(err => console.log("Error taking photo: ", console.err));
    };

    return (
        <>
            <button onClick={takePhoto}>Click Here</button>
            {photo && <img src={photo} />}
        </>
        
    );

};