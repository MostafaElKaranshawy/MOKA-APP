import React from "react";
import { useState, useRef, useEffect } from "react";

import "./newPost.css";
import useUploadFiles from "./uploadFiles"; // Combining photo and video hooks
import { addPost } from "../../services/postRequests";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewPost(probs) {
    const [content, setContent] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const [profilePhotoURL, setProfilePhotoURL] = useState('profile-photo-holder.jpg');
    
    function handleChange(event) {
        setContent(event.target.value);
    }

    useEffect(() => {
        if(user){
            setProfilePhotoURL(user.profilePhotoUrl);
        }
    }, []);

    const { uploadFiles, filePreviews, fileArray, removeFile, submitFiles } = useUploadFiles(); // Combining photos and videos

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (content.trim() === "" && filePreviews.length === 0) return;
        
        try{
            await addPost(content, probs.userToken, fileArray);
            await probs.getPosts();
            toast.success("Post Created", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
            });
            setContent("");
            submitFiles();
        } catch(err) {
            console.log(err);
            toast.error("Couldn't create post", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
            });
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
                        <img 
                            src={`${import.meta.env.VITE_PHOTO_URL}/${profilePhotoURL}`} 
                            onError={() => setProfilePhotoURL("profile-photo-holder.jpg")} 
                        />
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
                        <p>Photo/Video</p>
                        <input 
                            type="file" 
                            multiple 
                            onChange={uploadFiles} 
                            className="file-input" 
                            accept="image/*,video/*" // Accept both image and video files
                        />
                    </div>
                    <button type="submit" className="new-post-button">Post</button>
                </div>
                <div className="previews">
                    {filePreviews.map(({ id, src, type }, index) => (
                        <div key={id} className={`${type}-container`}>
                            {type === 'photo' ? (
                                <img
                                    src={src}
                                    alt={`Uploaded Preview ${index + 1}`}
                                    style={{ width: "200px", height: "200px", objectFit: "cover", marginTop: "10px", marginRight: "10px" }}
                                />
                            ) : (
                                <video
                                    src={src}
                                    controls
                                    style={{ width: "300px", height: "200px", objectFit: "cover", marginTop: "10px", marginRight: "10px" }}
                                />
                            )}
                            <button onClick={() => removeFile(id)} style={{ display: 'block', marginTop: '5px' }}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>  
            </form>
        </div>
    );
}
