import { useState, useEffect } from "react";

function useUploadFiles() {
    const [filePreviews, setPreviews] = useState([]);
    const [fileArray, setFiles] = useState([]);

    // Handle file selection and preview generation
    const uploadFiles = (event) => {
        const files = Array.from(event.target.files);
        
        files.forEach((file) => {
            const id = URL.createObjectURL(file); // Generate a unique ID using object URL
            const type = file.type.startsWith('image/') ? 'photo' : 'video'; // Determine if it's a photo or video
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prevPreviews) => [
                    ...prevPreviews,
                    { id, src: reader.result, type } // Store the type along with the preview data
                ]);
                setFiles((prevFiles) => [...prevFiles, file]);
            };
            reader.onerror = () => {
                console.error('Error reading file');
            };
            
            if (type === 'photo') {
                reader.readAsDataURL(file); // Generate data URL for images
            } else {
                setPreviews((prevPreviews) => [
                    ...prevPreviews,
                    { id, src: id, type } // For videos, we can use the object URL directly
                ]);
                setFiles((prevFiles) => [...prevFiles, file]);
            }
        });
    };

    // Function to remove a file
    const removeFile = (idToRemove) => {
        setPreviews((prevPreviews) => prevPreviews.filter(({ id }) => id !== idToRemove));
        setFiles((prevFiles) => prevFiles.filter((_, index) => filePreviews[index].id !== idToRemove));
    };

    // Cleanup object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            filePreviews.forEach(({ id }) => URL.revokeObjectURL(id));
        };
    }, [filePreviews]);

    const submitFiles = async () => {
        setFiles([]);
        setPreviews([]);
    };

    return { uploadFiles, filePreviews, fileArray, removeFile, submitFiles };
}

export default useUploadFiles;
