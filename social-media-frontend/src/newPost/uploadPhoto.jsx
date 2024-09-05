import { useState, useEffect } from "react";

function useUploadPhoto() {
    const [photoPreviews, setPreviews] = useState([]);
    const [photoFiles, setFiles] = useState([]);

    // Handle file selection and preview generation
    const uploadPhotos = (event) => {
        const files = Array.from(event.target.files);
        const newPreviews = files.map((file) => {
            const id = URL.createObjectURL(file); // Generate a unique ID using object URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prevPreviews) => [...prevPreviews, { id, src: reader.result }]);
                setFiles((prevFiles) => [...prevFiles, file]);
            };
            reader.onerror = () => {
                console.error('Error reading file');
            };
            reader.readAsDataURL(file);
            return { id, src:reader.result }; // Return the file and its ID
        });

        // Optionally: Handle file uploads here if needed
    };

    // Function to remove a photo
    const removePhoto = (idToRemove) => {
        setPreviews((prevPreviews) => prevPreviews.filter(({ id }) => id !== idToRemove));
    };

    // Cleanup object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            photoPreviews.forEach(({ id }) => URL.revokeObjectURL(id));
        };
    }, [photoPreviews]);

    return { uploadPhotos, photoPreviews, photoFiles, removePhoto };
}

export default useUploadPhoto;
