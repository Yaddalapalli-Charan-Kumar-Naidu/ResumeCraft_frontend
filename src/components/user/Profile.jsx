import React, { useContext, useState } from 'react';
import { userContext } from '../context/UserContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import HashLoader from 'react-spinners/HashLoader'; // Import HashLoader

const Profile = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State for loader
    const { userData: profileData, setUserData, error } = useContext(userContext);

    // Construct the profile picture URL
    const profilePictureUrl = profileData?.profilePicture
        ? `http://localhost:8267/${profileData.profilePicture.replace(/\\/g, '/')}`
        : 'https://static.vecteezy.com/system/resources/previews/020/765/399/large_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'; // Fallback image

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleSave = async (updatedData) => {
        setIsLoading(true); // Show loader
        try {
            const formData = new FormData();
            formData.append('newName', updatedData.name);
            formData.append('newPhoneNumber', updatedData.phone);

            const config = {
                method: 'put',
                url: `${import.meta.env.VITE_BASEURL}/user/update-profile`,
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                },
                data: formData
            };

            const response = await axios.request(config);
            setUserData((prevData) => ({
                ...prevData,
                name: updatedData.name,
                phone: updatedData.phone,
            })); // Update the context with new data
            setIsEditModalOpen(false);
            toast.success("Profile updated successfully!", {
                position: "bottom-right",
                autoClose: 3000,
            }); // Success toast
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.", {
                position: "bottom-right",
                autoClose: 3000,
            }); // Error toast
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

    const handleClose = () => {
        setIsEditModalOpen(false);
    };

    if (error) {
        return <div className="flex justify-center items-center h-[90vh]">Error: {error.message}</div>;
    }

    return (
        <div 
            className="flex justify-center items-center h-[90vh] bg-cover bg-center mt-[10vh]"
            style={{ backgroundImage: `url('https://wallpapercave.com/wp/wp3274386.jpg')` }}
        >
            {/* ToastContainer must be included for toast messages to work */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Purple HashLoader */}
            {isLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <HashLoader color="#9333ea" size={60} /> {/* Purple color */}
                </div>
            )}

            {/* Glassmorphism Effect */}
            <div className="min-h-[60vh] min-w-[50vw] border border-2 border-white border-opacity-20 flex flex-col items-center p-8 rounded-lg backdrop-blur-sm bg-white bg-opacity-10 shadow-lg">
                <div className="relative">
                    <img 
                        src={profilePictureUrl} // Use the constructed URL
                        alt='profile' 
                        className="rounded-full h-24 w-24 border-4 border-white border-opacity-30 shadow-lg"
                    />
                    <button 
                        onClick={handleEditClick}
                        className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-300"
                    >
                        ✏️
                    </button>
                </div>
                <div className="mt-6 w-full">
                    <div className="grid grid-cols-2 gap-4 text-gray-800">
                        <div className="text-right font-semibold">Name:</div>
                        <div className="text-left">{profileData?.name || "N/A"}</div>
                        <div className="text-right font-semibold">Email:</div>
                        <div className="text-left">{profileData?.email || "N/A"}</div>
                        <div className="text-right font-semibold">Phone:</div>
                        <div className="text-left">{profileData?.phone || "N/A"}</div>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditModal 
                    profileData={profileData} 
                    onSave={handleSave} 
                    onClose={handleClose} 
                />
            )}
        </div>
    );
};

const EditModal = ({ profileData, onSave, onClose }) => {
    const [formData, setFormData] = useState(profileData);
    const [previewImage, setPreviewImage] = useState(
        profileData?.profilePicture
            ? `http://localhost:8267/${profileData.profilePicture.replace(/\\/g, '/')}`
            : 'default-profile.png'
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type and size
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload a valid image file.", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("File size must be less than 5MB.", {
                    position: "bottom-right",
                    autoClose: 3000,
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData({
                    ...formData,
                    image: file // Store the file object for upload
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg w-[40vw] max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData?.name || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData?.phone || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;