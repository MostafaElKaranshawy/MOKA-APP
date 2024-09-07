import { useState } from "react";

function useUploadVideo() {
    const [videoPreviews, setPreviews] = useState([]);

    // Handle file selection and preview generation
    const uploadVideos = (event) => {
        const files = Array.from(event.target.files);
        const newPreviews = files.map((file) => {
            const id = URL.createObjectURL(file); // Generate a unique ID using object URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prevPreviews) => [...prevPreviews, { id, src: reader.result }]);
            };
            reader.readAsDataURL(file);
            return { id, file }; // Return the file and its ID
        });

        // Optionally: Handle video uploads here if needed
    };

    // Function to remove a video
    const removeVideo = (idToRemove) => {
        setPreviews((prevPreviews) => prevPreviews.filter(({ id }) => id !== idToRemove));
    };

    return { uploadVideos, videoPreviews, removeVideo };
}

export default useUploadVideo;
