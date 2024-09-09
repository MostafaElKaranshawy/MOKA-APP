import React from "react";
import { useState, useRef, useEffect } from "react";

import "./newPost.css";
import useUploadPhoto from "./uploadPhoto";
import useUploadVideo from "./uploadVideo";
import { addPost } from "../../services/postRequests";

export default function NewPost(probs) {
    const [content, setContent] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const [profilePhotoURL, setProfilePhotoURL] = useState('/src/assets/profile-photo-holder.jpg');
    function handleChange(event) {
        setContent(event.target.value);
    }
    useEffect(() => {
        if(user){
            setProfilePhotoURL(user.profilePhotoUrl);
        }
    }, [])
    const { uploadPhotos, photoPreviews , photoFiles , removePhoto, submitFiles } = useUploadPhoto();
    const { uploadVideos, videoPreviews, removeVideo } = useUploadVideo();
    async function handleSubmit(event) {
        event.preventDefault();
        
        console.log(photoPreviews);
        if ((content.trim() === "" && photoPreviews.length === 0 && videoPreviews.length === 0)) return;
        try{
            await addPost(content, probs.userToken, photoFiles);
            await probs.getPosts();
            alert("Post Created successfully");
            setContent("");
            submitFiles();
        }
        catch(err){
            console.log(err);
            alert("Post Not Created");
        }
    }
    const textareaRef = useRef(null);
    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [content]);
    return (
        <div className="new-post">
            <form onSubmit={handleSubmit} className="new-post-form">
                <div className="new-post-content">
                    <div className="new-post-data">
                        <img src={profilePhotoURL} onError={()=>{setProfilePhotoURL("/src/assets/profile-photo-holder.jpg");}}/>
                        {/* <p>{user.name}</p> */}
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
                        <p>Photo</p>
                        <input type="file" multiple onChange={uploadPhotos} className="file-input"  accept="image/*"/>
                    </div>
                    <div className="add-video post-attachment">
                        <i className="fa-solid fa-video upload-icon" />
                        <p>Video</p>
                        <input
                            type="file"
                            multiple
                            onChange={uploadVideos}
                            className="file-input"
                            accept="video/*"
                        />
                    </div>
                <button type="submit" className="new-post-button">Post</button>
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
                            onError={()=>{setProfilePhotoURL("/src/assets/profile-photo-holder.jpg");}}
                        />
                        <button onClick={() => removeVideo(id)} style={{ display: 'block', marginTop: '5px' }}>
                            Remove
                        </button>
                    </div>
                ))}
                </div>  
            </form>
        </div>
    );
}