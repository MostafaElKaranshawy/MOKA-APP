import React from "react";
import { useState, useRef, useEffect } from "react";

import "./newPost.css";
import profilePhoto from "../assets/profile-photo-holder.jpg";
import useUploadPhoto from "./uploadPhoto";
import useUploadVideo from "./uploadVideo";

export default function NewPost() {
    const [content, setContent] = useState("");
    
    function handleChange(event) {
        setContent(event.target.value);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log(content);
    }
    const { uploadPhotos, photoPreviews, removePhoto } = useUploadPhoto();
    const { uploadVideos, videoPreviews, removeVideo } = useUploadVideo();
    const textareaRef = useRef(null);
    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
    }, [content]);
    return (
        <div className="post new-post">
            <form onSubmit={handleSubmit} className="new-post-form">
                <div className="new-post-content">
                    <div className="new-post-data">
                        <img src={profilePhoto} />
                        <p>Mostafa Elkaranshawy</p>
                    </div>
                    <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    ></textarea>
                </div>
                <div className="post-attachments">
                    <div className="add-image post-attachment">
                        <i className="fa-solid fa-image upload-icon" />
                        <input type="file" multiple onChange={uploadPhotos} className="file-input"  accept="image/*"/>
                    </div>
                    <div className="add-video post-attachment">
                        <i className="fa-solid fa-video upload-icon" />
                        <input
                            type="file"
                            multiple
                            onChange={uploadVideos}
                            className="file-input"
                            accept="video/*" // Only allows video files
                        />
                    </div>
                </div>
                <div className="previews">
                    {photoPreviews.map(({ id, src }, index) => (
                        <div key={id} className="photo-container">
                            <img
                                src={src}
                                alt={`Uploaded Preview ${index + 1}`}
                                style={{ width: "200px", height: "200px", objectFit: "cover", marginTop: "10px", marginRight: "10px" }}
                            />
                            <button onClick={() => removePhoto(id)} style={{ display: 'block', marginTop: '5px' }}>
                                Remove
                            </button>
                        </div>
                    ))}
                    {videoPreviews.map(({ id, src }, index) => (
                    <div key={id} className="video-container">
                        <video
                            src={src}
                            controls
                            style={{ width: "300px", height: "200px", objectFit: "cover", marginTop: "10px", marginRight: "10px" }}
                        />
                        <button onClick={() => removeVideo(id)} style={{ display: 'block', marginTop: '5px' }}>
                            Remove
                        </button>
                    </div>
                ))}
                </div>  
                <button type="submit">Post</button>
            </form>
        </div>
    );
}