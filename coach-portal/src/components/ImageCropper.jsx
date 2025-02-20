import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

const ImageCropper = ({ onCroppedImage, onClose }) => {
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const imgRef = useRef(null);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        
        // Calculate maximum dimensions while maintaining aspect ratio
        const maxWidth = Math.min(800, window.innerWidth - 64); // 32px padding on each side
        const maxHeight = window.innerHeight - 200; // Leave space for header and buttons
        
        let newWidth = width;
        let newHeight = height;
        
        if (width > maxWidth) {
            newWidth = maxWidth;
            newHeight = (height * maxWidth) / width;
        }
        
        if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = (width * maxHeight) / height;
        }
        
        // Set image dimensions
        e.currentTarget.style.width = `${newWidth}px`;
        e.currentTarget.style.height = `${newHeight}px`;
        
        // Set initial crop
        setCrop(centerAspectCrop(newWidth, newHeight, 1));
    };

    const handleSave = async () => {
        if (!completedCrop || !imgRef.current) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        ctx.drawImage(
            imgRef.current,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );

        // Convert the canvas to a Blob
        canvas.toBlob((blob) => {
            if (!blob) return;
            // Create a File object from the Blob
            const file = new File([blob], 'profile-picture.jpg', { type: 'image/jpeg' });
            onCroppedImage(file);
        }, 'image/jpeg');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-h-[90vh] max-w-[90vw] w-full overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Crop Profile Picture</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="flex-1 overflow-auto p-4">
                    {!imgSrc && (
                        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onSelectFile}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Choose an Image
                            </label>
                        </div>
                    )}

                    {imgSrc && (
                        <div className="flex justify-center">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={1}
                                circularCrop
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                    className="max-w-full object-contain"
                                />
                            </ReactCrop>
                        </div>
                    )}
                </div>

                {imgSrc && (
                    <div className="flex justify-end gap-2 p-4 border-t">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!completedCrop}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageCropper; 