import { useState } from "react";

function useUploadPhoto() {
    const [photoPreviews, setPreviews] = useState([]);

    // Handle file selection and preview generation
    const uploadPhotos = (event) => {
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

        // Optionally: Handle file uploads here if needed
    };

    // Function to remove a photo
    const removePhoto = (idToRemove) => {
        setPreviews((prevPreviews) => prevPreviews.filter(({ id }) => id !== idToRemove));
    };

    return { uploadPhotos, photoPreviews, removePhoto };
}

export default useUploadPhoto;
